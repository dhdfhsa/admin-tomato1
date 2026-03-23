import React from 'react'
import './Navbar.css'
// import { assets } from '../../../assets/assets.js'; 
// // OR if it's an image
// import assets from '../../../assets/logo.png';
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
        <img className='profile' src={assets.profile_image} alt="Profile" />
      </div>
    </div>
  )
}

export default Navbar
