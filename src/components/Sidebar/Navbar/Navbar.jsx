import React from 'react'
import './Navbar.css'
import { assets } from './../../../assets/assets';
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-left">
        <div className="navbar-brand">
          <img className='logo' src={assets.logo} alt="Tomato" />
          <span className="brand-text">Tomato Admin</span>
        </div>
        <div className="navbar-status">Live</div>
      </div>

      <div className="navbar-actions">
        <img className='profile' src={assets.profile_icon} alt="Profile" />
      </div>
    </div>
  )
}

export default Navbar
