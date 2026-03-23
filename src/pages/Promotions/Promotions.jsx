import React from 'react'
import './Promotions.css'

const campaigns = [
  { title: 'Weekend Burst', status: 'Live', discount: '15% off', channel: 'Homepage banner' },
  { title: 'Lunch Sprint', status: 'Scheduled', discount: 'Free delivery', channel: 'Mobile push' },
  { title: 'Family Feast', status: 'Draft', discount: 'Combo bundle', channel: 'Email campaign' },
]

const Promotions = () => {
  return (
    <div className='promotions-page'>
      <section className='promotions-hero'>
        <div>
          <p className='promotions-eyebrow'>Marketing</p>
          <h1>Promotions studio</h1>
          <p className='promotions-subtitle'>
            Shape campaigns, spotlight offers, and keep your seasonal marketing ideas organized in one premium space.
          </p>
        </div>
        <div className='promotions-hero-glow' />
      </section>

      <section className='promotions-grid'>
        <article className='promotions-panel promotions-panel-large'>
          <div className='promotions-panel-header'>
            <div>
              <p className='promotions-section-label'>Campaigns</p>
              <h2>Active promotion board</h2>
            </div>
          </div>

          <div className='promotions-list'>
            {campaigns.map((campaign, index) => (
              <div className='promotions-card' key={campaign.title} style={{ animationDelay: `${index * 80}ms` }}>
                <div>
                  <span className='promotions-card-label'>{campaign.channel}</span>
                  <h3>{campaign.title}</h3>
                </div>
                <strong>{campaign.discount}</strong>
                <span className={`promotions-badge ${campaign.status.toLowerCase()}`}>{campaign.status}</span>
              </div>
            ))}
          </div>
        </article>

        <article className='promotions-panel'>
          <div className='promotions-panel-header'>
            <div>
              <p className='promotions-section-label'>Ideas</p>
              <h2>Quick playbook</h2>
            </div>
          </div>
          <div className='promotions-notes'>
            <div className='promotions-note'>
              <h3>Launch combo nights</h3>
              <p>Bundle your highest-converting dishes into one strong evening offer.</p>
            </div>
            <div className='promotions-note'>
              <h3>Use urgency well</h3>
              <p>Short countdown promotions help push first-time visitors to order faster.</p>
            </div>
            <div className='promotions-note'>
              <h3>Reward repeat buyers</h3>
              <p>Offer loyalty-style deals to customers who already completed successful orders.</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}

export default Promotions
