import React, { useState } from 'react'
import style from './Notfound.module.css'
import errorImg from '../../assets/images/error.svg'

export default function Notfound() {



    
  return (
  <>

  <div className='py-7 flex justify-center'>
    <img src={errorImg} alt="error" />
  </div>
    
  
  </>
  )
}
