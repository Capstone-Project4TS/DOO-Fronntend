import React from 'react'
import { Link } from '@tanstack/react-router'
import pdf from '/asset/icons/pdf.svg'
import copy from  '/asset/icons/copy.svg'
import edit from  '/asset/icons/edit.svg'
import trash from  '/asset/icons/delete.svg'

const AssignedToMeCard = () => {
  return (
    <Link to='/assignedtomedetails' className='flex border-b border-gray-500 border-opacity-20 gap-10'>
          <div className='py-3 px-4 h-11 w-24 '><input type="checkbox" className="w-4 h-4 text-teal-600 bg-teal-100 border-teal-300 rounded focus:ring-teal-500 "/> </div>
          <div className='py-3 px-6 flex items-center gap-4 text-xs text-gray-600 w-96' > <img src={pdf} alt="" /> <p>Bold Text Column</p> </div>
          <div className='py-3 px-6 flex items-center gap-1 text-xs text-gray-600 w-96'> Regular text column</div>
          <div className='py-3 px-6 flex items-center gap-1 text-xs text-gray-600 w-96'> Regular text column</div>
          <div className='py-3 px-6 flex items-center gap-1 text-xs text-teal-400 w-96 '> Active</div>
          <div className='py-3 px-6 flex items-center  text-xs text-gray-600 w-96 gap-2'> <button><img src={copy} alt="" /></button> <button><img src={edit} alt="" /></button><img src={trash} alt="" /><button></button></div>
        </Link>
  )
}

export default AssignedToMeCard