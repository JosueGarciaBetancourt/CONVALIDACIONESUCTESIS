import React, { useState } from "react";
import * as ReactRouterDOM from "react-router-dom";
import UserNav from "./UserNav";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react"; // Asegúrate de tener lucide-react instalado

// Componente de estructura del dashboard
const DashboardShell = () => {
  // Estado para controlar la visibilidad del sidebar en dispositivos móviles
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 dark:border-gray-800 dark:bg-gray-950 md:px-6">
        <div className="flex flex-1 items-center gap-4 md:gap-6">
          {/* Botón para mostrar/ocultar sidebar en dispositivos móviles */}
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
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
            <span className="ml-2 text-white text-lg font-semibold">CONVALINLP</span>
          </div>
          <div className="flex-1"></div>
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar móvil con overlay */}
        <div 
          className={`fixed inset-0 z-20 bg-gray-950/50 md:hidden ${
            sidebarOpen ? "block" : "hidden"
          }`} 
          onClick={toggleSidebar}
        ></div>
        
        {/* Sidebar para móviles (deslizable) */}
        <aside 
          className={`fixed inset-y-0 left-0 z-20 w-64 transform border-r bg-white transition-transform duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-950 md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </aside>
        
        {/* Sidebar fijo para escritorio (siempre visible) */}
        <aside className="fixed inset-y-0 left-0 z-20 w-64 border-r bg-white dark:border-gray-800 dark:bg-gray-950">
          <Sidebar />
        </aside>
        
        {/* Contenido principal */}
        <main className="flex-1 ml-64 overflow-auto"> {/* Agrega margen izquierdo para el sidebar fijo */}
          <ReactRouterDOM.Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;
