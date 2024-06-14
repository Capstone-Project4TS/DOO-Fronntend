import React from 'react'

const adminHead = () => {

  const user: any = localStorage.getItem("user");
  const userData = JSON.parse(user);
  return (
    <div className="header   flex justify-between">
    <div className="flex  flex-col">
      <h1 className="font-raleway font-bold text-purple-900 text-4xl leading-10">
        Hello, {userData.username}
      </h1>
     
    </div>

   
  </div>
  )
}

export default adminHead