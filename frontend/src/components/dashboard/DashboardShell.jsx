import React, { useState } from "react";
import * as ReactRouterDOM from "react-router-dom";
import UserNav from "./UserNav";
import Sidebar from "./Sidebar";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

const DashboardShell = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false); // 👉 nuevo estado

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const toggleSidebarDesktop = () => {
    setSidebarHidden((prevState) => !prevState);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 dark:border-gray-800 dark:bg-gray-950 md:px-6">
        <div className="flex flex-1 items-center gap-4 md:gap-6">
          {/* Botón para móviles */}
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center">
            <span className="ml-2 text-white text-lg font-semibold">CONVALINLP</span>
          </div>
        
          {/* Botón para escritorio */}
          <button
            onClick={toggleSidebarDesktop}
            className="hidden md:inline-flex items-center justify-center rounded-md p-1.5 ml-5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"
            aria-label="Toggle sidebar desktop"
          >
            {sidebarHidden ? (
              <ChevronRight className="h-7 w-7" />
            ) : (
              <ChevronLeft className="h-7 w-7" />
            )}
          </button>

          <div className="flex-1"></div>
          
          <UserNav />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Overlay para móvil */}
        <div
          className={`fixed inset-0 z-20 bg-gray-950/50 md:hidden ${
            sidebarOpen ? "block" : "hidden"
          }`}
          onClick={toggleSidebar}
        ></div>

        {/* Sidebar móvil */}
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-64 transform border-r bg-white transition-transform duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-950 md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </aside>

        {/* Sidebar escritorio */}
        <aside
          className={`fixed inset-y-0 left-0 z-20 border-r bg-white dark:border-gray-800 dark:bg-gray-950 transition-all duration-300 ease-in-out hidden md:block ${
            sidebarHidden ? "w-15 overflow-hidden" : "w-64"
          }`}
        >
          <Sidebar sidebarHidden={sidebarHidden} />
        </aside>

        {/* Contenido principal */}
        <main
          className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
            sidebarHidden ? "ml-0" : "ml-64"
          }`}
        >
          <ReactRouterDOM.Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;
