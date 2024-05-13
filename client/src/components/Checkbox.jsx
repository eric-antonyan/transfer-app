import React from 'react'

const Checkbox = ({ isChecked, setCheck }) => {
    const onCheck = () => {
        setCheck(!isChecked)
    }
    return (
        <>
            <input checked={isChecked} onChange={onCheck} hidden id='chkbox' type="checkbox" />
            <label htmlFor="chkbox">
                <div className='border-solid flex justify-center items-center border-[#E5E5E5] border-[1px] w-[20px] h-[20px] rounded-[4px]'>
                    <i className="fa fa-check fa-xs text-[#fff]"></i>
                </div>
            </label>
        </>
    )
}

export default Checkbox
