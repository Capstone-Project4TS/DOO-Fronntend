import React from 'react'
import FourDOts from '../../public/asset/icons/FourDots.svg'

const AuditTrial = () => {
  return (
  
        <div className='flex justify-between w-full '>
            <div className='flex gap-4 items-center'>
            <img src={FourDOts} className='h-4'/>
            <div className=' flex flex-col '>
              <h3 className='text-md'>Workflow approved</h3> 
              <p className='text-xs text-gray-600'>By certain Someone</p> 

            </div>
            </div>

             
                <p className='text-xs'> 15 June 2021 ・ 3.00 pm</p>
            
            
           




    </div>
  )
}

export default AuditTrial