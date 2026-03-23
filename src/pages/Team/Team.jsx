import React from 'react'
import './Team.css'

const members = [
  { name: 'Maya Rahman', role: 'Operations Lead', focus: 'Daily order flow and fulfillment rhythm' },
  { name: 'Arif Hasan', role: 'Kitchen Manager', focus: 'Food quality, prep timing, and station balance' },
  { name: 'Nabila Karim', role: 'Growth Manager', focus: 'Promotions, retention, and campaign planning' },
  { name: 'Tasin Ahmed', role: 'Support Specialist', focus: 'Customer issues and delivery coordination' },
]

const Team = () => {
  return (
    <div className='team-page'>
      <section className='team-hero'>
        <div>
          <p className='team-eyebrow'>People</p>
          <h1>Team directory</h1>
          <p className='team-subtitle'>
            Keep your restaurant team visible with a focused directory that highlights ownership and operational roles.
          </p>
        </div>
        <div className='team-hero-glow' />
      </section>

      <section className='team-grid'>
        {members.map((member, index) => (
          <article className='team-card' key={member.name} style={{ animationDelay: `${index * 80}ms` }}>
            <div className='team-avatar'>{member.name.split(' ').map((part) => part[0]).join('')}</div>
            <p className='team-role'>{member.role}</p>
            <h2>{member.name}</h2>
            <p className='team-focus'>{member.focus}</p>
          </article>
        ))}
      </section>
    </div>
  )
}

export default Team
