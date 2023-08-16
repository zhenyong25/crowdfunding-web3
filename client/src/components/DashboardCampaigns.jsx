import React from 'react'

const DashboardCampaigns = ({title}) => {
  return (
    <div>
        <div className="">
            <div className="font-sans text-white font-semi-bold text-xl px-5 py-5">{title}</div>
        </div>
        <div className="">
            <div className="font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 text-center"></div>
        </div>
    </div>
  )
}

export default DashboardCampaigns