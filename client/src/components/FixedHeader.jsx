import React, { useState } from 'react'
import Logo from './Logo'
import HeaderProgressBar from './HeaderProgressBar'
import HeaderRight from './HeaderRight'
import Login from './RegisterFormEP'
import { motion } from 'framer-motion'

const FixedHeader = ({page, step}) => {
    const [showed, setShowed] = useState(false)
    const showedFromLStorage = sessionStorage.getItem("unshow")
    return (
        <header className='border-solid border-[1px] border-[#F3F3F3] w-[100%]'>
            <motion.div initial={{height: 0}} animate={{height: showed || Boolean(showedFromLStorage) ? "0px" : "48px", transition: "0.5s"}} exit={{height: 0}} style={{ maxWidth: "calc(1440px - 180px)" }} className='overflow-hidden mx-auto flex justify-between items-center h-[100%] w-[100%] px-[20px]'>
                <Logo />
                {page !== "auth" ? <HeaderProgressBar step={step} /> : ""}
                <HeaderRight setShowed={setShowed} />
            </motion.div>
        </header>
    )
}

export default FixedHeader
