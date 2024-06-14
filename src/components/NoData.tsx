import React, { useState } from 'react'

const NoData = (prop: any) => {
    let opacity;
    const [showPopUp, setShowPopUp] = useState(false);
    showPopUp ? (opacity = "opacity-30") : (opacity = "opacity-100");

  
  return (
    <div>
                
            <div className={opacity}>
              <div className="flex justify-between opac ">
                <div className="flex flex-col gap-3 my-5">
                  <h2 className="text-[#4A176D] text-3xl font-bold">
                    {prop.title}
                  </h2>
                  
                </div>
                <div className="flex gap-4 justify-center items-center ">
                
                  <a
                    className="flex gap-2  px-4 py-2 rounded-lg text-[#00B0AD] items-center border-2 border-[#00B0AD]"
                     href="/workflowadd"
                  >
                    Add
                    <img
                      src="/asset/icons/arrowDown.svg"
                      className="w-5 text-white"
                    />
                  </a>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <img
                  src="/asset/nodocument.svg"
                  className=" max-w-80 max-h-80"
                />
                <h2 className="text-4xl text-[#6B7280] font-bold">
                  No  {prop.title} Yet!
                </h2>
                <p className="text-xl text-center text-[#6B7280]">
                  To create a  {prop.title} click on the button below.
                </p>
                <a
                  className="bg-[#00B0AD] flex gap-2 py-2 px-6 rounded-lg justify-center items-center text-white"
                  href="/workflowadd"
                >
                  <img src="/asset/icons/plus.svg" className="" />
                  Add New {prop.title}
                </a>
              </div>
            </div>
        
    </div>
  )
}

export default NoData
