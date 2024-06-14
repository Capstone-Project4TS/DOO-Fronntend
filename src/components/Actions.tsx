import toast, { Toaster } from 'react-hot-toast';
import { cancel } from '../services/api/workflowApi';
import React from 'react'
import { useNavigate } from '@tanstack/react-router';

const Actions = (workflowId: any) => {
  const navigate = useNavigate();
  console.log(workflowId)
  
  function cancelWorkflow(){
    cancel(workflowId.workflowId).then((result) => {
      if (!result.isError) {
        toast.success('successfully cancelled')
        setTimeout(function () {
          navigate({ to: "/assignedbyme" });
        }, 2000);
      } else {
        console.log(result);
        toast.error('fail to cancel! please try again')
        setTimeout(function () {
          navigate({ to: "/assignedbyme" });
        }, 2000);
      }
    });
  }
  return (
    <div className="h-96 w-80 border border-gray-500 border-opacity-10 my-9 flex flex-col p-4 gap-4 items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <h5 className="text-purple-900 font-bold text-lg">Actions</h5>
      {workflowId.detailcurrentStageIndex == -1 ?
      ( <a
       href={`/EditDocument/${workflowId.workflowId}/0`}
             className="w-44 h-9 border flex justify-center items-center border-teal-500 rounded-md text-teal-500 text-sm px-5"
            
           >Edit </a>) : workflowId.detail.status != 'Cancelled' ? (
            
                <div className='text-teal-500 border border-teal-500 text-sm p-5 rounded-lg'> This work flow is in the next stage </div> 
           
           ) :(
            <div>

            </div>
           )
      }
     
{
    workflowId.detail.status != 'Cancelled' ?(
      <button
      className="w-44 h-9 border border-red-500 rounded-md text-red-500 text-sm px-5 "
      onClick={cancelWorkflow}
    > close workflow </button>
    ):(
      <div className='text-red-500 text-sm px-5'> This workflow is cancelled </div>
    )

}


     
    </div>
  )
}

export default Actions