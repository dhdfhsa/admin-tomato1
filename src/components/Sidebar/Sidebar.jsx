import React from 'react'
import './Sidebar.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
const Sidebar = () => {
  const [go,setAddgo] = useState(false)
  const navigate = useNavigate()
    useEffect(() => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth > 768) return;
      const rafId = requestAnimationFrame(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight - 100,
          behavior: 'smooth',
        });
      });
      return () => cancelAnimationFrame(rafId);
    }, [go]);
  
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Control</span>
        <span className="sidebar-chip">v2.1</span>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">Main</p>
        <NavLink to='/' end className="sidebar-link">
          <span className="sidebar-dot" />
          Overview
        </NavLink>
        <NavLink to='/add' onClick={()=>setAddgo(true)} className="sidebar-link" href="#" id='add'>
          <span className="sidebar-dot" />
          Add
        </NavLink>
        <NavLink to='/order' className="sidebar-link" href="#">
          <span className="sidebar-dot" />
          Order
        </NavLink>
        <NavLink to='/list' className="sidebar-link" href="#">
          <span className="sidebar-dot" />
          List
        </NavLink>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">Management</p>
        <NavLink to='/promotions' className="sidebar-link">
          <span className="sidebar-dot" />
          Promotions
        </NavLink>
        <NavLink to='/team' className="sidebar-link">
          <span className="sidebar-dot" />
          Team
        </NavLink>
        <NavLink to='/settings' className="sidebar-link">
          <span className="sidebar-dot" />
          Settings
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-status">
          <span className="pulse" />
          Syncing live orders
        </div>
        <button className="sidebar-cta" onClick={() => navigate('/add')}>Add New Item</button>
      </div>
    </aside>
  )
}

export default Sidebar
