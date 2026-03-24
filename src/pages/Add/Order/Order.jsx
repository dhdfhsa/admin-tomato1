import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './Order.css'
import { assets } from '../../../assets/assets'

const Order = ({ url }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [openStatusId, setOpenStatusId] = useState(null)
  const statusMenuRef = useRef(null)

  const statusOptions = [
    'Food Processing',
    'Out for delivery',
    'Delivered',
  ]
 
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`)

      if (response.data.success) {
        setOrders(response.data.data || [])
      } else {
        toast.error('Unable to load orders')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server connection failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (statusMenuRef.current && !statusMenuRef.current.contains(event.target)) {
        setOpenStatusId(null)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const stats = useMemo(() => {
    const paidCount = orders.filter((order) => order.payment).length
    const pendingCount = orders.length - paidCount
    const revenue = orders
      .filter((order) => order.payment)
      .reduce((sum, order) => sum + Number(order.amount || 0), 0)

    return {
      total: orders.length,
      paid: paidCount,
      pending: pendingCount,
      revenue,
    }
  }, [orders])

  const getOrderSummary = (items) =>
    items.map((item) => `${item.name} x ${item.quantity}`).join(' | ')

  const updateOrderStatus = async (orderId, status) => {
    setUpdatingId(orderId)

    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status,
      })

      if (response.data.success) {
        setOrders((currentOrders) =>
          currentOrders.map((order) =>
            order._id === orderId ? { ...order, status } : order,
          ),
        )
        toast.success('Order status updated')
      } else {
        toast.error(response.data.message || 'Unable to update order status')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server connection failed')
    } finally {
      setUpdatingId(null)
      setOpenStatusId(null)
    }
  }

  return (
    <div className='order-page'>
      <section className='order-hero'>
        <div>
          <p className='order-eyebrow'>Operations</p>
          <h1>Order control center</h1>
          <p className='order-subtitle'>
            Monitor incoming food orders, payment state, and delivery details from one polished admin workspace.
          </p>
        </div>
        <div className='order-hero-glow' />
      </section>

      <section className='order-stats'>
        <article className='order-stat-card'>
          <span>Total orders</span>
          <strong>{stats.total}</strong>
          <p>All customer orders recorded in the system.</p>
        </article>
        <article className='order-stat-card'>
          <span>Paid orders</span>
          <strong>{stats.paid}</strong>
          <p>Orders with confirmed Stripe payment.</p>
        </article>
        <article className='order-stat-card'>
          <span>Pending orders</span>
          <strong>{stats.pending}</strong>
          <p>Orders still waiting for payment confirmation.</p>
        </article>
        <article className='order-stat-card'>
          <span>Revenue</span>
          <strong>BDT {stats.revenue}</strong>
          <p>Total value of all paid orders.</p>
        </article>
      </section>

      <section className='order-panel'>
        <div className='order-panel-header'>
          <div>
            <p className='order-section-label'>Live feed</p>
            <h2>Recent customer orders</h2>
          </div>
          <div className='order-panel-badge'>{orders.length} active records</div>
        </div>

        {loading ? (
          <div className='order-state'>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className='order-empty'>
            <div className='order-empty-orb' />
            <h3>No orders yet</h3>
            <p>Your incoming customer orders will show up here as soon as checkout starts happening.</p>
          </div>
        ) : (
          <div className='order-grid'>
            {orders.map((order, index) => (
              <article
                className='order-card'
                key={order._id}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className='order-card-top'>
                  <div className='order-card-icon'>
                    <img src={assets.parcel_icon} alt='parcel' />
                  </div>

                  <div className='order-card-heading'>
                    <p className='order-card-label'>Order ID</p>
                    <h3>{order._id.slice(-8).toUpperCase()}</h3>
                  </div>

                  <span className={`order-badge ${order.payment ? 'paid' : 'pending'}`}>
                    {order.payment ? 'Paid' : 'Pending'}
                  </span>
                </div>

                <div className='order-card-body'>
                  <div className='order-story'>
                    <div className='order-story-line' />
                    <div className='order-story-step active'>
                      <span className='order-story-dot' />
                      <div>
                        <h4>Items</h4>
                        <p>{getOrderSummary(order.items)}</p>
                      </div>
                    </div>
                    <div className={`order-story-step ${order.payment ? 'active' : ''}`}>
                      <span className='order-story-dot' />
                      <div>
                        <h4>Current status</h4>
                        <p>{order.status}</p>
                      </div>
                    </div>
                    <div className='order-story-step active'>
                      <span className='order-story-dot' />
                      <div>
                        <h4>Placed on</h4>
                        <p>{new Date(order.date).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className='order-meta-grid'>
                    <div className='order-meta-card'>
                      <span>Total</span>
                      <strong>BDT {order.amount}</strong>
                    </div>
                    <div className='order-meta-card'>
                      <span>Customer</span>
                      <strong>{order.address.firstName} {order.address.lastName}</strong>
                    </div>
                    <div className='order-meta-card'>
                      <span>Phone</span>
                      <strong>{order.address.phone}</strong>
                    </div>
                  </div>

                  <div className='order-status-panel'>
                    <div className='order-status-copy'>
                      <span className='order-card-label'>Order workflow</span>
                      <strong>Update delivery stage</strong>
                      <p>Move each order through preparation, dispatch, and completion.</p>
                    </div>

                    <div
                      className={`order-status-shell ${updatingId === order._id ? 'is-updating' : ''} ${openStatusId === order._id ? 'is-open' : ''}`}
                      ref={openStatusId === order._id ? statusMenuRef : null}
                    >
                      <button
                        type='button'
                        className='order-status-trigger'
                        onClick={() =>
                          setOpenStatusId((currentId) =>
                            currentId === order._id ? null : order._id,
                          )
                        }
                        disabled={updatingId === order._id}
                      >
                        <span className='order-status-current'>{order.status}</span>
                        <span className='order-status-arrow'>v</span>
                      </button>

                      <div className={`order-status-menu ${openStatusId === order._id ? 'visible' : ''}`}>
                        {statusOptions.map((status) => (
                          <button
                            type='button'
                            key={status}
                            className={`order-status-option ${order.status === status ? 'active' : ''}`}
                            onClick={() => updateOrderStatus(order._id, status)}
                            disabled={updatingId === order._id}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className='order-address'>
                    <p className='order-card-label'>Delivery address</p>
                    <p>
                      {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}, {order.address.country}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Order
