import { motion } from 'framer-motion'
import React from 'react'

const HeaderProgressBar = ({ step }) => {
  const progressBarWidth = ((step - 1) / 4) * 100;
  return (
    <div className='flex gap-[16px] registerProgressBar items-center w-[500px]'>
      <div style={{ maxWidth: "335px" }} className="w-[100%] h-[4px] bg-[#EFEFEF] overflow-hidden rounded-[50px]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressBarWidth}%` }}
          exit={{ width: 0 }}
          className='h-[100%] bg-gradient-to-r from-[#235697] to-[#114280]'
        ></motion.div>
      </div>
      <p className='text-[#7D7C93] font-medium'>Step {step}/5</p>
    </div>
  )
}

export default HeaderProgressBar
