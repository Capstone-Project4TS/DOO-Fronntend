import React from 'react'
import downArrow from '/asset/icons/down-arrow.svg'
const WorkflowInformation = () => {
  return (
    <div className="flex flex-col w-6/12 my-9  h-12 gap-9  border border-gray-500 border-opacity-10 pl-12">
     
    <div className="flex flex-row justify-between py-3 ">
        <h3 className=" text-teal-600">Workflow information</h3>
         <img src={downArrow}/> 
    </div>
      <div className='flex flex-col gap-8'>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-2'>
                <h5 className='font-urbanist font-semibold text-purple-800 text-sm leading-18'>Owner/initiator</h5>
                <p className='text-xs text-gray-600'>Someones Name</p>

            </div>
            <div className='flex flex-col gap-2'>
            <h5 className='font-urbanist font-semibold text-purple-800 text-sm leading-18'>Owner/initiator</h5>
                <p className='text-xs text-gray-600'>Someones Name</p>

            </div>
            </div>

            <div className='flex justify-between'>
            <div className='flex flex-col gap-2'>
                <h5 className='font-urbanist font-semibold text-purple-800 text-sm leading-18'>Owner/initiator</h5>
                <p className='text-xs text-gray-600'>Someones Name</p>

            </div>
            <div className='flex flex-col gap-2'>
            <h5 className='font-urbanist font-semibold text-purple-800 text-sm leading-18'>Owner/initiator</h5>
                <p className='text-xs text-gray-600'>Someones Name</p>

            </div>
            </div>

            <div className='flex justify-between'>
            <div className='flex flex-col gap-2'>
                <h5 className='font-urbanist font-semibold text-purple-800 text-sm leading-18'>Owner/initiator</h5>
                <p className='text-xs text-gray-600'>Someones Name</p>

            </div>
            <div className='flex flex-col gap-2'>
            <h5 className='font-urbanist font-semibold text-purple-800 text-sm leading-18'>Owner/initiator</h5>
                <p className='text-xs text-gray-600'>Someones Name</p>

            </div>
            </div>
            

            <div>

            </div>
          </div>
          </div>
  )
}

export default WorkflowInformation