import React from 'react'
import LoginForm from '@/components/auth/LoginForm'
import Header from '@/layouts/navigation/Header'
import Footer from '@/layouts/navigation/Footer'

const Login = () => {
  return (
    <div className='w-full h-full flex flex-col min-h-screen'>
      <Header />
      <LoginForm/>
      <Footer/>
    </div>

  )
}

export default Login