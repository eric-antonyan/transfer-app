import React from 'react'
import FixedHeader from '../components/FixedHeader'
import AuthForm from '../components/AuthForm'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Auth = () => {
  if (Cookies.get("jwt")) {
    return <Navigate to={'/go'} />
  }
  return (
    <>
      <FixedHeader page={"auth"} />
      <AuthForm />
    </>
  )
}

export default Auth
