import React from 'react'
import DashboardCard from '../components/DashboardCard'
import DashboardCampaigns from '../components/DashboardCampaigns'

const Dashboard = () => {
  return (
    <div className="bg-[#1c1c24] flex justify-center flex-col rounded-[10px] sm:p-10 p-4">
        <div className="font-sans text-white font-bold text-xl"> Dashboard </div>
        <div className="flex justify-center gap-x-20 p-4">
            <DashboardCard title={"Number of Campaigns"}/>
            <DashboardCard title={"Total Amount Collected"}/>
            <DashboardCard title={"Number of Campaigns Donated"}/>
            <DashboardCard title={"Total Amount Donated"}/>
        </div>
        <div className="flex justify-center gap-x-40 p-4">
            <DashboardCampaigns title={"Created Campaigns"}/>
            <DashboardCampaigns title={"Donated Campaigns"}/>
        </div>
    </div>
  )
}

export default Dashboard