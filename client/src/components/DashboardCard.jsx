import React from 'react'

const DashboardCard = ({title, value}) => {
  return (
    <div className="flex flex-col items-center w-[200px]" >
      <p className="font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rounded-t-[10px] text-center">{title}</p>
      <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-[#42424e] rounded-b-[10px]  w-full text-center truncate">{value}</h4>
    </div>
  )
}

export default DashboardCard