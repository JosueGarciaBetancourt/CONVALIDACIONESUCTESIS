import DashboardHeader from "../components/dashboard/DashboardHeader"
import DashboardShell from "../components/dashboard/DashboardShell"
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardShell />
    </div>
  )
}

export default Dashboard
