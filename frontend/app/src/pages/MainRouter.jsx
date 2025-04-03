import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import RequireAuth from './RequireAuth'
import BlogPage from './BlogPage'

const MainRouter = () => {
  return (
    <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/' element={<RequireAuth><Dashboard /></RequireAuth> }/>
        <Route path='/blog/:id' element={<RequireAuth><BlogPage /></RequireAuth>} />
    </Routes>
  )
}

export default MainRouter