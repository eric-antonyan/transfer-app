import React from 'react'

const HeaderRight = ({setShowed}) => {
  const onClose = () => {
    setShowed(true)
    sessionStorage.setItem('unshow', true)
  }
  return (
    <i onClick={onClose} className='fa fa-xmark text-[#3C3F49] cursor-pointer text-[1.5rem]'></i>
  )
}

export default HeaderRight
