import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import './Overview.css'

const Overview = ({ url }) => {
  const [foods, setFoods] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [foodResponse, orderResponse] = await Promise.all([
          axios.get(`${url}/api/food/list`),
          axios.get(`${url}/api/order/list`),
        ])

        if (foodResponse.data.success) {
          setFoods(foodResponse.data.data || [])
        }

        if (orderResponse.data.success) {
          setOrders(orderResponse.data.data || [])
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [url])

  const metrics = useMemo(() => {
    const paidOrders = orders.filter((order) => order.payment)
    const revenue = paidOrders.reduce((sum, order) => sum + Number(order.amount || 0), 0)
    const categories = new Set(foods.map((item) => item.category)).size

    return {
      totalOrders: orders.length,
      paidOrders: paidOrders.length,
      menuItems: foods.length,
      categories,
      revenue,
    }
  }, [foods, orders])

  const recentOrders = orders.slice(0, 5)
  const topFoods = foods.slice(0, 4)

  return (
    <div className='overview-page'>
      <section className='overview-hero'>
        <div>
          <p className='overview-eyebrow'>Dashboard</p>
          <h1>Restaurant overview</h1>
          <p className='overview-subtitle'>
            Track menu scale, order flow, and revenue momentum from a single modern control surface.
          </p>
        </div>
        <div className='overview-hero-glow' />
      </section>

      <section className='overview-stats'>
        <article className='overview-stat-card'>
          <span>Total orders</span>
          <strong>{metrics.totalOrders}</strong>
          <p>All customer orders currently in the system.</p>
        </article>
        <article className='overview-stat-card'>
          <span>Paid orders</span>
          <strong>{metrics.paidOrders}</strong>
          <p>Confirmed payments that completed successfully.</p>
        </article>
        <article className='overview-stat-card'>
          <span>Menu items</span>
          <strong>{metrics.menuItems}</strong>
          <p>Published dishes available across the storefront.</p>
        </article>
        <article className='overview-stat-card'>
          <span>Revenue</span>
          <strong>BDT {metrics.revenue}</strong>
          <p>Total revenue from all paid orders.</p>
        </article>
      </section>

      <section className='overview-grid'>
        <article className='overview-panel overview-panel-large'>
          <div className='overview-panel-header'>
            <div>
              <p className='overview-section-label'>Recent activity</p>
              <h2>Latest orders</h2>
            </div>
            <span className='overview-pill'>{recentOrders.length} latest</span>
          </div>

          {loading ? (
            <div className='overview-state'>Loading dashboard...</div>
          ) : recentOrders.length ? (
            <div className='overview-order-list'>
              {recentOrders.map((order, index) => (
                <div className='overview-order-row' key={order._id} style={{ animationDelay: `${index * 70}ms` }}>
                  <div>
                    <strong>{order.address.firstName} {order.address.lastName}</strong>
                    <p>{new Date(order.date).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className='overview-mini-label'>Status</span>
                    <p>{order.status}</p>
                  </div>
                  <div>
                    <span className='overview-mini-label'>Amount</span>
                    <p>BDT {order.amount}</p>
                  </div>
                  <span className={`overview-badge ${order.payment ? 'paid' : 'pending'}`}>
                    {order.payment ? 'Paid' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className='overview-state'>No order activity yet.</div>
          )}
        </article>

        <article className='overview-panel'>
          <div className='overview-panel-header'>
            <div>
              <p className='overview-section-label'>Menu pulse</p>
              <h2>Catalog snapshot</h2>
            </div>
          </div>

          <div className='overview-side-metrics'>
            <div className='overview-side-card'>
              <span>Categories</span>
              <strong>{metrics.categories}</strong>
            </div>
            <div className='overview-side-card'>
              <span>Visible dishes</span>
              <strong>{metrics.menuItems}</strong>
            </div>
          </div>

          <div className='overview-top-foods'>
            {topFoods.length ? topFoods.map((food) => (
              <div className='overview-food-row' key={food._id}>
                <span>{food.name}</span>
                <strong>BDT {food.price}</strong>
              </div>
            )) : (
              <div className='overview-state compact'>No menu items yet.</div>
            )}
          </div>
        </article>
      </section>
    </div>
  )
}

export default Overview
