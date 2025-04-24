import React from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../routes";
import { LayoutDashboard, FilePlus, Book, School, Settings, HelpCircle, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  // Menú principal
  const navItems = [
    {
      title: "Inicio",
      to: routes.inicio,
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Convalidaciones",
      to: routes.convalidaciones,
      icon: <FilePlus className="h-5 w-5" />,
      // Submenú para convalidaciones
      /* subItems: [
        {
          title: "Nueva Convalidación",
          to: `${routes.convalidaciones}/nueva`,
        },
        {
          title: "Pendientes",
          to: `${routes.convalidaciones}/pendientes`,
          badge: "8",
        },
        {
          title: "Historial",
          to: `${routes.convalidaciones}/historial`,
        },
      ] */
    },
    {
      title: "Universidades",
      to: routes.universidades,
      icon: <School className="h-5 w-5" />,
    },
    {
      title: "Cursos",
      to: routes.cursos,
      icon: <Book className="h-5 w-5" />,  
    },
  ];

  // Menú secundario (parte inferior)
  const secondaryNavItems = [
    {
      title: "Configuración",
      to: "/configuracion",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Ayuda",
      to: "/ayuda",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  // Verificar si un elemento está activo o está dentro de sus subrutas
  const isActiveOrHasActiveChild = (path) => {
    if (location.pathname === path) return true;
    if (path !== routes.inicio && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Verificar si un subelemento está activo
  const isSubItemActive = (path) => {
    return location.pathname === path;
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
    <div className="flex h-full flex-col border-r bg-white dark:border-gray-800 dark:bg-gray-950">
      {/* Menú principal */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => {
            const isActive = isActiveOrHasActiveChild(item.to);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedItems[item.title] || isActive;
            
            return (
              <div key={index}>
                {/* Elemento principal */}
                <div className="flex flex-col">
                  <div 
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium cursor-pointer ${
                      isActive
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                        : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => hasSubItems ? toggleExpand(item.title) : null}
                  >
                    <Link
                      to={item.to}
                      className="flex items-center gap-3 flex-1"
                      onClick={(e) => hasSubItems && e.preventDefault()}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                    {hasSubItems && (
                      <ChevronRight 
                        className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                      />
                    )}
                  </div>
                  
                  {/* Submenú */}
                  {hasSubItems && isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.to}
                          className={`flex items-center justify-between rounded-md px-3 py-1.5 text-sm ${
                            isSubItemActive(subItem.to)
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
      <div className="mx-4 my-2 border-t dark:border-gray-800"></div>
      
      {/* Menú secundario */}
      {/* <nav className="grid gap-1 px-2 mb-6">
        {secondaryNavItems.map((item, index) => {
          const isActive = location.pathname === item.to;
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
              {item.title}
            </Link>
          );
        })}
      </nav> */}
    </div>
  );
};

export default Sidebar;