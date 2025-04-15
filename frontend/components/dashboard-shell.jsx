import * as ReactRouterDOM from "react-router-dom"
import UserNav from "@/components/user-nav"
import Sidebar from "@/components/sidebar"

// Componente de estructura del dashboard
const DashboardShell = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 dark:border-gray-800 dark:bg-gray-950 md:px-6">
        <div className="flex flex-1 items-center gap-4 md:gap-6">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M5 7 3 5"></path>
              <path d="M9 5 5 9"></path>
              <path d="m13 13-4 4"></path>
              <path d="m17 17-2 2"></path>
              <path d="M15 5h4v4"></path>
              <path d="M19 12v4h-4"></path>
              <path d="M12 19H8v-4"></path>
              <path d="M5 12V8h4"></path>
            </svg>
            <span className="ml-2 text-lg font-semibold">Convalidaciones</span>
          </div>
          <div className="flex-1"></div>
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <Sidebar />
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <ReactRouterDOM.Outlet />
        </main>
      </div>
    </div>
  )
}
