import React from 'react'
import Eye from './Eye'

const FloatingInput = ({ value, maxLength, onChange, placeholder, labelId, type, passwordIsShowed = false, setPasswordIsShowed, advancedType }) => {
    return (
        <div className='h-[48px] w-[100%] relative'>
            <input onChange={onChange} value={value} autoComplete='off' id={labelId} className='border-solid placeholder:hidden floating-input w-[100%] h-[100%] border-[#E5E5E5] border-b-[1.5px]' placeholder='' type={type} />
            <label className='text-[#7D7C93] floating-label absolute left-0 top-[50%] translate-y-[-50%]' htmlFor={labelId}>{placeholder}</label>
            {advancedType === 'password' ? <Eye passwordIsShowed={passwordIsShowed} setPasswordIsShowed={setPasswordIsShowed} /> : ""}
        </div>
    )
}

export default FloatingInput