import React from 'react'
import Home from './pages/Home'
import Admin from './pages/Admin'
import User from './pages/User'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/admin" element={<Admin/>}></Route>
          <Route path="/user" element={<User/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App