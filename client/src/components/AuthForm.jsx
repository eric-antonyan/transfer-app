import React, { useState } from 'react'
import FloatingInput from './FloatingInput'
import { motion } from 'framer-motion'
import Checkbox from './Checkbox'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { api } from '../models/config.model'
import Cookies from 'js-cookie'

const AuthForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [data, setData] = useState({success: false, message: ""})
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post(api + '/auth', {
      email,
      password 
    })

    if (response.data.success) {
      Cookies.set("jwt", response.data.auth.token, {expires: rememberMe ? 31 : 1})
      navigate('/go')
    } else {
      setData(response.data)
    }
  }
  return (
    <motion.div initial={{opacity: 0, marginTop: "50px"}} animate={{opacity: 1, marginTop: "64px"}} exit={{opacity: 0, marginTop: "60px"}} className='flex flex-col items-center gap-[36px]'>
      <div className='flex flex-col justify-center items-center gap-[10px]'>
        <h1 className='text-[#3A3C4C] text-[28px] font-bold text-center'>Log in to your Swift Pay account</h1>
        <h2 className='text-[1.2rem] font-medium text-[#7D7C93]'>New to Swift Pay? <Link to="/register">Get started</Link></h2>
      </div>
      <form onSubmit={onSubmit} action="#" className='w-[505px] flex flex-col gap-[30px]'>
        <FloatingInput onChange={(e) => setEmail(e.target.value)} value={email} placeholder={'Email Address'} labelId={'emailAddress'} />
        <FloatingInput onChange={(e) => setPassword(e.target.value)} value={password} type={'password'} placeholder={'Password'} labelId={'password'} />
        <div className='relative'>
          <div className='flex justify-between items-center mb-[36px]'>
            <div className="ckbox inline-flex justify-center gap-3 items-center">
              <Checkbox isChecked={rememberMe} setCheck={setRememberMe} />
              <p className='font-medium text-[#7D7C93] leading-[19px] w-[90%] text-[14px]'>Remember me</p>
            </div>
            <a className='font-medium text-[14px]' href="">Forgot password?</a>
          </div>
          <p className={`text-center mb-[26px] ${data.success ? "text-green-500" : "text-red-500"} font-medium`}>{data.message}</p>
          <button disabled={isDisabled || !email || !password} className='h-[53px] disabled:bg-[#88A9C9] w-[100%] transition ease-in-out bg-[#114280] hover:bg-[#235697] text-[#fff] rounded-[8px]'>Log in</button>
        </div>  
      </form>
    </motion.div>
  )
}

export default AuthForm