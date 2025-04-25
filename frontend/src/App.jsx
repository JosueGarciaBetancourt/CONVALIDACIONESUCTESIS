import { Routes, Route, Navigate } from "react-router-dom";

import ApiTester from "./pages/ApiTester";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inicio from "./pages/Inicio";
import Convalidaciones from "./pages/Convalidaciones";
import Universidades from "./pages/Universidades";
import Cursos from "./pages/Cursos";

import routes from "./routes";
import PrivateRoute from "./components/PrivateRoute";

function App() {
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
          <Route path="universidades" element={<Universidades />} />
          <Route path="cursos" element={<Cursos />} />

      </Route>
      </Route>
    </Routes>
  );
}

export default App;
