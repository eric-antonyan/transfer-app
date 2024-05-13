import React, { useState } from 'react'
import FixedHeader from '../components/FixedHeader'
import RegisterForm from '../components/RegisterFormEP'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const Register = () => {
  const [page, setPage] = useState(1)
  if (Cookies.get('jwt')) {
    return <Navigate to={'/go'} />
  }
  return (
    <div>
      <FixedHeader step={page} />
      <RegisterForm page={page} setPage={setPage} />
    </div>
  )
}

export default Register
