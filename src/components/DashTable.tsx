import React from 'react'

export const DashTable = () => {
  return (
<div className=' flex  font-urbanist font-semibold leading-18 text-gray-500 justify-between ml-1 gap-10 '>
            <div className='w-56  h-10'>
                <h4 className='text-sm text-black'>Visa</h4>
                <p className='text-xs text-gray-600'>3220-8594-2323</p>
            </div>
            <div className='w-56 text-xs pt-2   '>16 June 2021 ・ 1.20 pm</div>
            <div className='w-56 text-xs  pt-2   '>$900</div>
            <div className='w-56 text-xs pt-2  '>Completed</div>
        </div>
  )
}
