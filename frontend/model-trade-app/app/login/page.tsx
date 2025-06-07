import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import Header from '../components/layout/navigation/Header'
import Footer from '../components/layout/navigation/Footer'

const page = () => {
  return (
    <div className='w-full h-full flex flex-col min-h-screen'>
      <Header  />
      <LoginForm/>
      <Footer/>
    </div>

  )
}

export default page