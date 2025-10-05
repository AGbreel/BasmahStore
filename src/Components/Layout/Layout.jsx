import React, { useContext, useEffect, useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../context/UserContext.jsx'

export default function Layout() {

  return <>
    <Navbar />
    <div className="new-bg">
      <div className='container pt-10'>
      <Outlet></Outlet>
      </div>
    </div>
    <Footer />
  </>
}
