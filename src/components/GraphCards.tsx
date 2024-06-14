import React from 'react'

const graphCards = () => {
  return (
    <div className="flex  flex-col w-72  top-64 left-96 rounded-md border border-gray-200 bg-white p-6">
    <h3 className="w-38 h-7 font-urbanist font-bold text-gray-600 text-sm leading-6">
      Document Created
    </h3>
    <div className="flex flex-col">
       <div className="flex  w-44 h-9 top-[-0.25rem] gap-4 items-center">
        <button className="w-6 h-6 rounded-2 p-1 gap-1 bg-pink-50 items-center">
          <svg
            width="9"
            height="11"
            viewBox="0 0 9 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.13229 1.16885C0.871028 0.907585 0.447441 0.907585 0.18618 1.16885C-0.0750808 1.43011 -0.0750808 1.85369 0.18618 2.11495L3.53118 5.45995C3.79244 5.72122 4.21603 5.72122 4.47729 5.45995L7.82229 2.11495C8.08355 1.85369 8.08355 1.43011 7.82229 1.16885C7.56103 0.907585 7.13744 0.907585 6.87618 1.16885L4.00423 4.04079L1.13229 1.16885ZM1.13229 5.85185C0.871028 5.59059 0.447441 5.59059 0.18618 5.85185C-0.0750808 6.11311 -0.0750808 6.53669 0.18618 6.79796L3.53118 10.143C3.79244 10.4042 4.21603 10.4042 4.47729 10.143L7.82229 6.79796C8.08355 6.53669 8.08355 6.11311 7.82229 5.85185C7.56103 5.59059 7.13744 5.59059 6.87618 5.85185L4.00423 8.72379L1.13229 5.85185Z"
              fill="#912018"
            />
          </svg>
        </button>
        <p className="font-urbanist font-bold text-black text-xl leading-9">
          10.9k
        </p>
        <p className="font-urbanist font-normal text-red-700 text-xs leading-4">
          -7.3%
        </p>
      </div>
      <div className=" font-urbanist  text-xs ml-12 text-gray-600">
        Compared to last work
      </div>
    </div>
  </div>
  )
}

export default graphCards