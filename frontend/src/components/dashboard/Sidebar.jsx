import React from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../routes";
import { LayoutDashboard, FilePlus, Book, School, Settings, HelpCircle, ChevronRight } from "lucide-react";

const Sidebar = ({ sidebarHidden }) => {  // Recibiendo el prop 'sidebarHidden'
  const location = useLocation();

  // Construir rutas completas para las rutas hijas del dashboard
  const getFullPath = (childRoute) => {
    return `${routes.dashboard}${childRoute}`;
  };

  // Menú principal
  const navItems = [
    {
      title: "Inicio",
      to: getFullPath(routes.inicio),
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Convalidaciones",
      to: getFullPath(routes.convalidaciones),
      icon: <FilePlus className="h-5 w-5" />,
    },
    {
      title: "Universidades",
      to: getFullPath(routes.universidades),
      icon: <School className="h-5 w-5" />,
    },
    {
      title: "Cursos",
      to: getFullPath(routes.cursos),
      icon: <Book className="h-5 w-5" />,  
    },
  ];

  // Menú secundario (parte inferior)
  const secondaryNavItems = [
    {
      title: "Configuración",
      to: getFullPath(routes.configuracion),
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Ayuda",
      to: getFullPath(routes.ayuda),
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  // Verificar si un elemento está activo o está dentro de sus subrutas
  const isActiveOrHasActiveChild = (path) => {
    if (location.pathname === path) return true;
    if (path === getFullPath(routes.inicio)) return location.pathname === path;
    const normPath = path.endsWith('/') ? path.slice(0, -1) : path;
    const normCurrentPath = location.pathname.endsWith('/') 
      ? location.pathname.slice(0, -1) 
      : location.pathname;
    return normCurrentPath === normPath || normCurrentPath.startsWith(normPath + '/');
  };

  // Estado para submenús expandidos
  const [expandedItems, setExpandedItems] = React.useState({});

  // Alternar la expansión de submenús
  const toggleExpand = (title) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div className="flex flex-col justify-between h-screen border-r bg-white dark:border-gray-800 dark:bg-gray-950">
      {/* Menú principal */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-20">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => {
            const isActive = isActiveOrHasActiveChild(item.to);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedItems[item.title] || isActive;
            
            return (
              <div key={index}>
                {/* Elemento principal */}
                <div className="flex flex-col">
                  {hasSubItems ? (
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.title)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-left w-full
                                ${isActive 
                                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                                  : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                }`}
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        {!sidebarHidden && item.title} {/* Solo mostrar texto si sidebarHidden es false */}
                      </span>
                      <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      to={item.to}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                      ${isActive
                          ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                          : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.icon}
                      {!sidebarHidden && item.title} {/* Solo mostrar texto si sidebarHidden es false */}
                    </Link>
                  )}
                  
                  {/* Submenú */}
                  {hasSubItems && isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.to}
                          className={`flex items-center justify-between rounded-md px-3 py-1.5 text-sm ${
                            location.pathname === subItem.to
                              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-purple-400 font-medium"
                              : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                          }`}
                        >
                          <span>{subItem.title}</span>
                          {subItem.badge && (
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium dark:bg-gray-800 dark:text-purple-400">
                              {subItem.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
      
      {/* Separador */}
      <div className="border-t mx-4 my-2 dark:border-gray-800"></div>
      
      {/* Menú secundario */}
      <nav className="grid gap-1 px-2 mb-6">
        {secondaryNavItems.map((item, index) => {
          const isActive = isActiveOrHasActiveChild(item.to);
          return (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              {item.icon}
              {!sidebarHidden && item.title} {/* Solo mostrar texto si sidebarHidden es false */}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
