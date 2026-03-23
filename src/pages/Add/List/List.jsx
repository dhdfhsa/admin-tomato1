import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {
  const [list, setList] = useState([])
  const [removingId, setRemovingId] = useState(null)
  const [foodToRemove, setFoodToRemove] = useState(null)

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error('Unable to load menu items')
      }
    } catch (error) {
      toast.error('Server connection failed')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const removeFood = async (food) => {
    const foodId = food._id
    setRemovingId(foodId)

    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId })

      if (response.data.success) {
        setList((currentList) => currentList.filter((item) => item._id !== foodId))
        toast.success('Food item removed')
      } else {
        toast.error(response.data.message || 'Unable to remove food item')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server connection failed')
    } finally {
      setRemovingId(null)
      setFoodToRemove(null)
    }
  }

  const totalItems = list.length
  const categories = new Set(list.map((item) => item.category)).size
  const averagePrice =
    totalItems > 0
      ? Math.round(
          list.reduce((sum, item) => sum + Number(item.price || 0), 0) / totalItems
        )
      : 0

  return (
    <div className='list-page'>
      <section className='list-hero'>
        <div>
          <p className='list-eyebrow'>Menu inventory</p>
          <h1>Food list overview</h1>
          <p className='list-subtitle'>
            Review every published item in one clean space with quick stats and a
            polished catalog layout.
          </p>
        </div>
        <div className='list-hero-glow' />
      </section>

      <section className='list-stats'>
        <article className='list-stat-card'>
          <span>Total items</span>
          <strong>{totalItems}</strong>
          <p>Currently available across the menu.</p>
        </article>
        <article className='list-stat-card'>
          <span>Categories</span>
          <strong>{categories}</strong>
          <p>Distinct sections represented in the catalog.</p>
        </article>
        <article className='list-stat-card'>
          <span>Average price</span>
          <strong>${averagePrice}</strong>
          <p>Estimated average price based on listed items.</p>
        </article>
      </section>

      <section className='list-panel'>
        <div className='list-panel-header'>
          <div>
            <p className='list-section-label'>Live collection</p>
            <h2>All food items</h2>
          </div>
          <div className='list-panel-badge'>{totalItems} entries</div>
        </div>

        <div className='list-table-head'>
          <span>Item</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        <div className='list-rows'>
          {list.length > 0 ? (
            list.map((item, index) => (
              <article
                className='list-row'
                key={item._id || `${item.name}-${index}`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className='list-item-main'>
                  <div className='list-image-wrap'>
                    <img src={`${url}/images/${item.image}`} alt={item.name} />
                  </div>
                  <div className='list-item-copy'>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>

                <div className='list-item-meta'>
                  <span className='list-category-pill'>{item.category}</span>
                  <strong className='list-price'>${item.price}</strong>
                  <button
                    type='button'
                    className='list-remove-button'
                    disabled={removingId === item._id}
                    onClick={() => setFoodToRemove(item)}
                  >
                    {removingId === item._id ? (
                      <span className='loader'></span>
                    ) : (
                      <span className='list-remove-button-icon'>x</span>
                    )}
                    {removingId === item._id ? 'Removing...' : 'Remove'}
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className='list-empty'>
              <div className='list-empty-orb' />
              <h3>No food items yet</h3>
              <p>Add your first menu item and it will appear here automatically.</p>
            </div>
          )}
        </div>
      </section>

      {foodToRemove && (
        <div className='list-modal-backdrop' onClick={() => setFoodToRemove(null)}>
          <div className='list-modal' onClick={(event) => event.stopPropagation()}>
            <div className='list-modal-badge'>Delete item</div>
            <h3>Remove {foodToRemove.name}?</h3>
            <p>
              This will delete the food item from your menu and remove its image
              from storage.
            </p>
            <div className='list-modal-actions'>
              <button
                type='button'
                className='list-modal-button list-modal-button-secondary'
                onClick={() => setFoodToRemove(null)}
                disabled={removingId === foodToRemove._id}
              >
                Cancel
              </button>
              <button
                type='button'
                className='list-modal-button list-modal-button-danger'
                onClick={() => removeFood(foodToRemove)}
                disabled={removingId === foodToRemove._id}
              >
                {removingId === foodToRemove._id ? 'Removing...' : 'Yes, remove it'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default List
