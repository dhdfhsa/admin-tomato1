import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'

const Login = ({ url, onLoginSuccess }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(`${url}/api/user/login`, data)

      if (response.data.success && response.data.isAdmin) {
        localStorage.setItem('adminToken', response.data.token)
        onLoginSuccess(response.data.token)
        return
      }

      alert(response.data.massage || 'Admin login failed')
    } catch (error) {
      alert(error.response?.data?.massage || 'Admin login failed')
    }
  }

  return (
    <div className='admin-login-page'>
      <form className='admin-login-card' onSubmit={handleSubmit}>
        <p className='admin-login-eyebrow'>Admin Access</p>
        <h1>Sign in to admin</h1>
        <p className='admin-login-subtitle'>
          Use the admin email and password to open the dashboard.
        </p>

        <div className='admin-login-fields'>
          <input
            type='email'
            name='email'
            value={data.email}
            onChange={handleChange}
            placeholder='Admin email'
            required
          />
          <input
            type='password'
            name='password'
            value={data.password}
            onChange={handleChange}
            placeholder='Admin password'
            required
          />
        </div>

        <button type='submit'>Enter Admin</button>
      </form>
    </div>
  )
}

export default Login
