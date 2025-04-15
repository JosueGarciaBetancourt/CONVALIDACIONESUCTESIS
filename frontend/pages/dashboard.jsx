import DashboardHeader from "../components/DashboardHeader"
import DashboardStats from "../components/DashboardStats"
import RecentValidations from "../components/RecentValidations"

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
