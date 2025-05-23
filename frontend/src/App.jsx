import React, { useEffect } from "react";  
import { Routes, Route, Navigate } from "react-router-dom";

import ApiTester from "./pages/ApiTester";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inicio from "./pages/Inicio";
import Convalidaciones from "./pages/Convalidaciones";
import NuevaConvalidacion from "./pages/NuevaConvalidacion";
import Universidades from "./pages/Universidades";
import Cursos from "./pages/Cursos";
import Configuracion from "./pages/Configuracion";
import Ayuda from "./pages/Ayuda";

import routes from "./routes";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  // Función para imprimir las rutas en consola
  const printRoutes = () => {
    const flatRoutes = [];
  
    // Función recursiva para aplanar la estructura de rutas
    const flattenRoutes = (route, parentPath = '') => {
      const fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, '/');
      
      flatRoutes.push({
        'Ruta': fullPath,
        'Tipo': route.isPrivate ? 'Privada' : 'Pública',
        'Componente': route.component || '-',
        'Redirección': route.redirectsTo || '-',
        'Anidamiento': parentPath ? 'Subruta' : 'Ruta principal'
      });
  
      if (route.children) {
        route.children.forEach(child => flattenRoutes(child, fullPath));
      }
    };
  
    // Rutas públicas
    const publicRoutes = [
      { 
        path: routes.apiTester, 
        isPrivate: false,
        component: 'ApiTester'
      },
      { 
        path: routes.login, 
        isPrivate: false,
        component: 'Login'
      },
      { 
        path: "/", 
        isPrivate: false,
        redirectsTo: routes.login
      }
    ];
  
    // Rutas privadas
    const privateRoutes = {
      path: routes.dashboard,
      isPrivate: true,
      component: 'Dashboard',
      children: [
        { 
          path: "", 
          component: "Inicio",
          isPrivate: true
        },
        { 
          path: "inicio", 
          component: "Inicio",
          isPrivate: true
        },
        { 
          path: "convalidaciones", 
          component: "Convalidaciones",
          isPrivate: true,
          children: [
            { 
              path: "nuevo", 
              component: "NuevaConvalidacion",
              isPrivate: true
            }
          ]
        },
        { 
          path: "universidades", 
          component: "Universidades",
          isPrivate: true
        },
        { 
          path: "cursos", 
          component: "Cursos",
          isPrivate: true
        },
        { 
          path: "configuracion", 
          component: "Configuracion",
          isPrivate: true
        },
        { 
          path: "Ayuda", 
          component: "Ayuda",
          isPrivate: true
        }
      ]
    };
  
    // Aplanar todas las rutas
    publicRoutes.forEach(route => flattenRoutes(route));
    flattenRoutes(privateRoutes);
  
    console.log("=== TABLA DE RUTAS ===");
    console.table(flatRoutes);
  };

  React.useEffect(() => {
    //printRoutes();
  }, []);

  return (
    <Routes>
      <Route path={routes.apiTester} element={<ApiTester />} />
      <Route path={routes.login} element={<Login />} />
      <Route path="/" element={<Navigate to={routes.login} />} />

      {/* Rutas privadas */}
      <Route path={routes.dashboard} element={<PrivateRoute />}>
        <Route element={<Dashboard />}>
          <Route path="" element={<Inicio />} />
          <Route path="inicio" element={<Inicio />} />
          <Route path="convalidaciones" element={<Convalidaciones />} />
          <Route path="convalidaciones/nuevo" element={<NuevaConvalidacion />} />
          <Route path="universidades" element={<Universidades />} />
          <Route path="cursos" element={<Cursos />} />

          <Route path="configuracion" element={<Configuracion />} />
          <Route path="Ayuda" element={<Ayuda />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
