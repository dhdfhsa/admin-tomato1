import React, { useState } from 'react'
import './Settings.css'

const Settings = () => {
  const [settings, setSettings] = useState({
    restaurantName: 'GreatStack Restaurant',
    supportEmail: 'support@greatstack.com',
    phone: '+880 1700 000000',
    deliveryFee: '2',
    autoAcceptOrders: true,
    marketingEmails: true,
  })

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <div className='settings-page'>
      <section className='settings-hero'>
        <div>
          <p className='settings-eyebrow'>Configuration</p>
          <h1>Admin settings</h1>
          <p className='settings-subtitle'>
            Manage the core experience of your restaurant dashboard, from business identity to order handling preferences.
          </p>
        </div>
        <div className='settings-hero-glow' />
      </section>

      <section className='settings-grid'>
        <article className='settings-panel settings-panel-large'>
          <div className='settings-panel-header'>
            <div>
              <p className='settings-section-label'>Business profile</p>
              <h2>Restaurant details</h2>
            </div>
            <span className='settings-badge'>Live config</span>
          </div>

          <div className='settings-form-grid'>
            <label className='settings-field'>
              <span>Restaurant name</span>
              <input
                className='settings-input'
                name='restaurantName'
                value={settings.restaurantName}
                onChange={handleChange}
                type='text'
              />
            </label>

            <label className='settings-field'>
              <span>Support email</span>
              <input
                className='settings-input'
                name='supportEmail'
                value={settings.supportEmail}
                onChange={handleChange}
                type='email'
              />
            </label>

            <label className='settings-field'>
              <span>Phone number</span>
              <input
                className='settings-input'
                name='phone'
                value={settings.phone}
                onChange={handleChange}
                type='text'
              />
            </label>

            <label className='settings-field'>
              <span>Default delivery fee</span>
              <input
                className='settings-input'
                name='deliveryFee'
                value={settings.deliveryFee}
                onChange={handleChange}
                type='number'
              />
            </label>
          </div>
        </article>

        <article className='settings-panel'>
          <div className='settings-panel-header'>
            <div>
              <p className='settings-section-label'>Preferences</p>
              <h2>Automation</h2>
            </div>
          </div>

          <div className='settings-toggle-list'>
            <label className='settings-toggle-card'>
              <div>
                <strong>Auto accept orders</strong>
                <p>Immediately move new paid orders into the active queue.</p>
              </div>
              <input
                name='autoAcceptOrders'
                checked={settings.autoAcceptOrders}
                onChange={handleChange}
                type='checkbox'
              />
            </label>

            <label className='settings-toggle-card'>
              <div>
                <strong>Marketing email updates</strong>
                <p>Allow the team to receive campaign and promotion reminders.</p>
              </div>
              <input
                name='marketingEmails'
                checked={settings.marketingEmails}
                onChange={handleChange}
                type='checkbox'
              />
            </label>
          </div>
        </article>
      </section>

      <section className='settings-panel'>
        <div className='settings-panel-header'>
          <div>
            <p className='settings-section-label'>Preview</p>
            <h2>Current admin profile</h2>
          </div>
        </div>

        <div className='settings-preview-grid'>
          <div className='settings-preview-card'>
            <span>Name</span>
            <strong>{settings.restaurantName}</strong>
          </div>
          <div className='settings-preview-card'>
            <span>Email</span>
            <strong>{settings.supportEmail}</strong>
          </div>
          <div className='settings-preview-card'>
            <span>Phone</span>
            <strong>{settings.phone}</strong>
          </div>
          <div className='settings-preview-card'>
            <span>Delivery Fee</span>
            <strong>BDT {settings.deliveryFee}</strong>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Settings
