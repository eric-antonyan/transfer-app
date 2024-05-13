import React, { useEffect } from 'react'
import HomePage from '../components/HomePage'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Home = () => {
    if (!Cookies.get('jwt')) {
        return <Navigate to={'/auth'} />
    }
    return (
        <HomePage />
    )
}

export default Home
