import React from 'react'
import './Navbar.css'
import logo from '../../../assets/logo.png';
import icon from '../../../assets/icon.svg';
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-left">
        <div className="navbar-brand">
          <img className='logo' src={logo} alt="Tomato" />
          <span className="brand-text">Tomato Admin</span>
        </div>
        <div className="navbar-status">Live</div>
      </div>

      <div className="navbar-actions">
        <img className='profile' src={profile_image} alt="Profile" />
      </div>
    </div>
  )
}

export default Navbar
