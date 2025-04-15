import { UserNav } from "../user-nav"

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido al sistema de convalidación de cursos</p>
      </div>
      <div className="flex items-center gap-2">
        <UserNav />
      </div>
    </div>
  )
}
export default DashboardHeader
