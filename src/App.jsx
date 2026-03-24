import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Sidebar/Navbar/Navbar'
import{ Routes,  Route } from 'react-router-dom'
import Add from './pages/Add/Add';
import List from './pages/Add/List/List';
import Order from './pages/Add/Order/Order'
import Overview from './pages/Overview/Overview';
import Promotions from './pages/Promotions/Promotions';
import Team from './pages/Team/Team';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import "toastify-js/src/toastify.css"
 
const App = () => {
  const url  = import.meta.env.VITE_API_URL || "http://localhost:4000"
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tokenFromUrl = params.get('adminToken')

    if (tokenFromUrl) {
      localStorage.setItem('adminToken', tokenFromUrl)
      setAdminToken(tokenFromUrl)
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  if (!adminToken) {
    return (
      <>
        <ToastContainer/>
        <Login url={url} onLoginSuccess={setAdminToken} />
      </>
    )
  }

  return (
    
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
            <Route path='/' element={<Overview url = {url} />}/>
            <Route path='/add' element= {<Add url = {url}/>}/>
            <Route path='/list' element={<List url = {url} />}/>
            <Route path='/order' element={<Order url = {url}/>}/>
            <Route path='/promotions' element={<Promotions />}/>
            <Route path='/team' element={<Team />}/>
            <Route path='/settings' element={<Settings />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
