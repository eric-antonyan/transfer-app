import React from 'react'
import Check from './Check'
import { Link, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Success = () => {
    if (Cookies.get('jwt')) {
        return <Navigate to={'/go'} />
    }
    return (
        <div style={{ height: "calc(100vh - 50px)" }} className='w-[100%] flex flex-col justify-center items-center gap-[8px]'>
            <Check />
            <h1 className='font-bold'>You successfully registered!</h1>
            <h2 className='font-medium text-center'><Link to={'/go'}>Log in System</Link></h2>
        </div>
    )
}

export default Success
