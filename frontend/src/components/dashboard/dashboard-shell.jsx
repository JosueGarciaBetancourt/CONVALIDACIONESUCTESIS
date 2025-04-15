import { Outlet } from "react-router-dom"
import { Sidebar } from "./sidebar"

export function DashboardShell() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
export default DashboardShell
