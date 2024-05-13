import React, { useEffect, useState } from 'react'
import FloatingInput from './FloatingInput'
import { motion } from 'framer-motion'
import Checkbox from './Checkbox'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css';
import validator from 'validator'
import Code from './Code'
import Block from './Block'
import { api } from '../models/config.model'
import axios from 'axios'
import Cookies from 'js-cookie'

const RegisterFormEP = ({ page, setPage }) => {
  const [isChecked, setCheck] = useState(false)
  const [passwordIsShowed, setPasswordIsShowed] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [passcodeCard, setPasscodeCard] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [authCode, setAuthCode] = useState(0)
  const [isDisabled, setIsDisabled] = useState(false)
  const [msg, setMsg] = useState({ success: false, message: "" })

  const back = () => setPage(prevPage => prevPage - 1)

  const navigate = useNavigate()

  const generateRandomAuthCode = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  if (page === 1) {
    const onCheckEmail = async (e) => {
      setMsg({ success: false, message: "" })
      e.preventDefault()
      const config = {
        Authorization: process.env.REACT_APP_SERVER_PASSCODE,
      }
      const response = await axios.post(api + "/check/email", {
        email
      }, { headers: config })

      if (response.data.success) {
        setPage(prevPage => prevPage + 1)
      } else {
        setMsg(response.data)
      }
    }
    return (
      <motion.div initial={{ opacity: 0, marginTop: "50px" }} animate={{ opacity: 1, marginTop: "64px" }} exit={{ opacity: 0, marginTop: "60px" }} className='flex flex-col items-center gap-[36px]'>
        <div className='flex flex-col justify-center items-center gap-[10px]'>
          <h1 className='text-[#3A3C4C] text-[28px] font-bold text-center'>Get started with your account!</h1>
          <h2 className='text-[1.2rem] font-medium text-[#7D7C93]'>Already have an accout? <Link to="/auth">Login</Link></h2>
        </div>
        <form onSubmit={onCheckEmail} action="#" style={{maxWidth: "505px"}} className='w-[100%] px-[30px] flex flex-col gap-[30px]'>
          <FloatingInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email Address'} labelId={'emailAddress'} />
          <FloatingInput value={password} onChange={(e) => setPassword(e.target.value)} type={passwordIsShowed ? "text" : "password"} advancedType={"password"} passwordIsShowed={passwordIsShowed} setPasswordIsShowed={setPasswordIsShowed} placeholder={'Password'} labelId={'password'} />
          <div className='relative'>
            <div>
              <div className="ckbox mb-[36px] flex gap-3 items-center">
                <Checkbox isChecked={isChecked} setCheck={setCheck} />
                <p className='font-medium text-[#7D7C93] leading-[19px] w-[90%] text-[14px]'>I have read i understand Swift Pay Bank's <a href="">Terms and conditions</a> and <a href="">Privacy Policy</a></p>
              </div>
            </div>
            <p className={`text-center mb-[26px] ${msg.success ? "text-green-500" : "text-red-500"} font-medium`}>{msg.message}</p>
            <button disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || !isChecked} className='h-[53px] disabled:bg-[#88A9C9] w-[100%] transition ease-in-out bg-[#114280] hover:bg-[#235697] text-[#fff] rounded-[8px]'>Get started</button>
          </div>
        </form>
      </motion.div>
    )
  } else if (page === 2) {
    const isPhonenNumber = (phone) => validator.isMobilePhone(phone.replace("-", ""))
    const onSend = async (e) => {
      setMsg({ success: false, message: "" })
      setIsDisabled(true)
      e.preventDefault()

      setIsDisabled(false)

      const check = await axios.post(api + "/check/phone", {
        phoneNumber: phone
      }, { headers: { Authorization: process.env.REACT_APP_SERVER_PASSCODE } })
      if (check.data.success) {
        setAuthCode()
        const randomAuthCode = generateRandomAuthCode(999999, 111111);
        setAuthCode(randomAuthCode)
        const response = await axios.post(api + "/send-code", {
          verifyCode: randomAuthCode,
          firstName,
          email
        })
        setPage(prevPage => prevPage + 1)
        setIsDisabled(false)
        setMsg({ success: response.data.success, message: "Verification code is sent to your email" })
      } else {
        setMsg(check.data)
        setIsDisabled(false)
      }
    }
    return (
      <motion.div initial={{ opacity: 0, marginTop: "50px" }} animate={{ opacity: 1, marginTop: "64px" }} exit={{ opacity: 0, marginTop: "60px" }} className='flex flex-col items-center gap-[36px]'>
        <p onClick={back} className='cursor-pointer text-start w-[90%]'><i className="fa fa-chevron-left"></i> Back</p>
        <div className='flex flex-col justify-center items-center gap-[10px]'>
          <h1 className='text-[#3A3C4C] text-[28px] font-bold text-center'>What's your mobile phone?</h1>
          <h2 className='text-[1.2rem] font-medium text-[#7D7C93]'>Well use this as your Swift Pay account number.</h2>
        </div>
        <form onSubmit={onSend} action="#" style={{maxWidth: "505px"}} className='w-[100%] px-[30px] flex flex-col gap-[30px]'>
          <PhoneInput
            className='border-none h-[48px]'
            defaultCountry="am"
            value={phone}
            onChange={(phone) => setPhone(phone)}
            autoFocus
          />
          <div className='relative'>
            <div>
              <div className="ckbox mb-[36px] flex gap-3 items-center">
                <p className='font-medium text-[#7D7C93] leading-[19px] w-[100%] text-[14px]'>By providing your email, you agree that we may contact you by email  messaging. Carrier messaging and data rates may apply</p>
              </div>
            </div>
            <p className={`text-center mb-[26px] ${msg.success ? "text-green-500" : "text-red-500"} font-medium`}>{msg.message}</p>
            <button disabled={!isPhonenNumber(phone) || isDisabled} className='h-[53px] disabled:bg-[#88A9C9] w-[100%] transition ease-in-out bg-[#114280] hover:bg-[#235697] text-[#fff] rounded-[8px]'>Submit</button>
          </div>
        </form>
      </motion.div>
    )
  } else if (page === 3) {

    const onVerify = (e) => {
      e.preventDefault()
      if (authCode === parseInt(verifyCode)) {
        setMsg({ success: true, message: "Correct verification code" })
        setIsDisabled(true)
        setTimeout(() => {
          setIsDisabled(false)
          setPage(prevPage => prevPage + 1)
        }, 2000)
      } else {
        setMsg({ success: false, message: "Incorrect verification code" })
      }
    }

    return (
      <motion.div initial={{ opacity: 0, marginTop: "50px" }} animate={{ opacity: 1, marginTop: "64px" }} exit={{ opacity: 0, marginTop: "60px" }} className='flex flex-col items-center gap-[36px]'>
        <p onClick={back} className='cursor-pointer text-start w-[90%]'><i className="fa fa-chevron-left"></i> Back</p>
        <div className='flex flex-col justify-center items-center gap-[10px]'>
          <h1 className='text-[#3A3C4C] text-[28px] font-bold text-center'>Verify your phone number with you email</h1>
          <h2 className='text-[1.2rem] font-medium text-[#7D7C93]'>Enter the 6-digit code we texted to you at {email} <p className='text-center cursor-pointer text-[#114280]' onClick={() => setPage(1)}>Edit number</p></h2>
        </div>
        <form onSubmit={onVerify} action="#" style={{maxWidth: "505px"}} className='w-[100%] px-[30px] flex flex-col gap-[30px]'>
          <FloatingInput value={verifyCode} onChange={(e) => setVerifyCode(e.target.value)} maxLength={6} type={'number'} placeholder={'6-digit code'} labelId={'verifyCode'} />
          <div className='relative'>
            <p className={`text-center mb-[26px] ${msg.success ? "text-green-500" : "text-red-500"} font-medium`}>{msg.message}</p>
            <button disabled={verifyCode.length !== 6 || isDisabled} className='h-[53px] disabled:bg-[#88A9C9] w-[100%] transition ease-in-out bg-[#114280] hover:bg-[#235697] text-[#fff] rounded-[8px]'>Verify</button>
          </div>
        </form>
      </motion.div>
    )
  } else if (page === 4) {
    const setCode = () => {
      setPasscodeCard(true)
    }

    const passcodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '<'];
    return (
      !passcodeCard ? <motion.div initial={{ opacity: 0, marginTop: "50px" }} animate={{ opacity: 1, marginTop: "64px" }} exit={{ opacity: 0, marginTop: "60px" }} className='flex flex-col items-center gap-[36px]'>
        <p onClick={back} className='cursor-pointer text-start w-[90%]'><i className="fa fa-chevron-left"></i> Back</p>
        <div className='flex flex-col justify-center items-center gap-[10px]'>
          <h1 className='text-[#3A3C4C] text-[28px] font-bold text-center'>Secure your access</h1>
          <h2 className='text-[1.2rem] w-[540px] text-center font-medium text-[#7D7C93]'>Choose how to you want to unlock and enter your Swift Pay Bank app.</h2>
        </div>
        <div onClick={setCode} className='cursor-pointer w-[100%] px-[30px] h-[48px] border-solid border-[#E5E5E5] border-b-[1px] flex items-center gap-[12px]'>
          <Code />
          <span>Passcode only</span>
        </div>
      </motion.div> :
        <motion.div initial={{ opacity: 0, marginTop: "50px" }} animate={{ opacity: 1, marginTop: "64px" }} exit={{ opacity: 0, marginTop: "60px" }} className='flex flex-col items-center gap-[36px]'>
          <div className='flex w-[90%] flex-col justify-center items-center gap-[10px]'>
            <h1 className='text-[#3A3C4C] text-[28px] font-bold text-center'>Create your passcode</h1>
            <h2 className='text-[1.2rem] w-[540px] text-center font-medium text-[#7D7C93]'>This will be used for logging in and access your app, so please don't share it with anyone.</h2>
          </div>
          <div className='flex gap-[15px]'>
            <div className={`border-solid border-[1.5px] border-[#235697] w-[14.5px] h-[14.5px] rounded-[50px] ${passcode.length >= 1 ? "bg-[#235697]" : ""} transition transition-delay-150`}></div>
            <div className={`border-solid border-[1.5px] border-[#235697] w-[14.5px] h-[14.5px] rounded-[50px] ${passcode.length >= 2 ? "bg-[#235697]" : ""} transition transition-delay-150`}></div>
            <div className={`border-solid border-[1.5px] border-[#235697] w-[14.5px] h-[14.5px] rounded-[50px] ${passcode.length >= 3 ? "bg-[#235697]" : ""} transition transition-delay-150`}></div>
            <div className={`border-solid border-[1.5px] border-[#235697] w-[14.5px] h-[14.5px] rounded-[50px] ${passcode.length >= 4 ? "bg-[#235697]" : ""} transition transition-delay-150`}></div>
          </div>
          <div className='w-[296px] flex gap-[34px] flex-wrap justify-end'>
            {
              passcodes.map((item, i) => {
                const onPasscode = (item) => {
                  if (passcode.length < 3) {
                    setPasscode(prevPasscode => prevPasscode + item);
                  } else if (item === "<") {
                    setPasscode(''); // Reset passcode if the user presses "<"
                  } else if (passcode.length >= 3) {
                    setPasscode(prevPasscode => prevPasscode + item);
                    setPage(prevPage => prevPage + 1); // Move to the next page if passcode length is 4 or more
                  }
                }
                return (
                  <button key={i} onClick={() => onPasscode(item)} className='w-[76px] text-[#373F46] text-[28px] font-medium transition transition-delay-150 active:bg-[#235697] active:text-[#fff] rounded-[76px] h-[76px] bg-[#F1F5F9]'>{item}</button>
                )
              })
            }
          </div>

        </motion.div>
    )
  } else if (page === 5) {
    const onSubmit = async (e) => {
      setIsDisabled(true)
      e.preventDefault()
      const response = await axios.post(api + "/user", {
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "passcode": passcode,
        "password": password,
        "phone": phone
      }, {
        headers: {
          Authorization: process.env.REACT_APP_SERVER_PASSCODE
        }
      })

      if (response.data.success) {
        setMsg(response.data)
        Cookies.set("jwt", response.data.data.token, { secure: true, expires: 31 })
        sessionStorage.setItem('register', true)
        setMsg(response.data)
        navigate('/success')
      } else {
        setMsg(response.data)
      }
    }
    return (
      <motion.div initial={{ opacity: 0, marginTop: "50px" }} animate={{ opacity: 1, marginTop: "64px" }} exit={{ opacity: 0, marginTop: "60px" }} className='flex flex-col items-center gap-[36px]'>
        <p onClick={back} className='cursor-pointer text-start w-[90%]'><i className="fa fa-chevron-left"></i> Back</p>
        <div className='flex flex-col justify-center items-center gap-[10px]'>
          <h1 className='text-[#3A3C4C] text-[28px] font-bold text-center'>Just a little bit more about yourself</h1>
          <h2 className='w-[540px] text-center text-[1.2rem] font-medium text-[#7D7C93]'>We need some additional information from you to secure your account.</h2>
        </div>
        <form onSubmit={onSubmit} action="#" className='w-[505px] flex flex-col gap-[30px]'>
          <FloatingInput value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={'First Name'} labelId={'emailAddress'} />
          <FloatingInput value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={'Last Name'} labelId={'password'} />
          <div className='flex flex-col items-center gap-[8px]'>
            <Block />
            <p className='text-[13px] text-[#7D7C93]'>Your information is secured with encryption.</p>
          </div>
          <div className='relative'>
            <p className={`text-center mb-[26px] ${msg.success ? "text-green-500" : "text-red-500"} font-medium`}>{msg.message}</p>
            <button disabled={!firstName || !lastName} className='h-[53px] disabled:bg-[#88A9C9] w-[100%] transition ease-in-out bg-[#114280] hover:bg-[#235697] text-[#fff] rounded-[8px]'>Submit</button>
          </div>
        </form>
      </motion.div>
    )
  }
}

export default RegisterFormEP
