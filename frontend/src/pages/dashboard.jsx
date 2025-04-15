import DashboardHeader from "../components/dashboard/dashboard-header"
import DashboardStats from "../components/dashboard/dashboard-stats"
import RecentValidations from "../components/dashboard/recent-validations"

// Página de dashboard
const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardStats />
      <RecentValidations />
    </div>
  )
}

export default DashboardPage
