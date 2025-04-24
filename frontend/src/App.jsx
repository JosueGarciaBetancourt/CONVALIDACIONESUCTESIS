import { Routes, Route, Navigate } from "react-router-dom";
import ApiTester from "./pages/ApiTester";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inicio from "./pages/Inicio"; // Asumo que tienes este componente
import Convalidaciones from "./pages/Convalidaciones"; // Asumo que tienes este componente
import routes from "./routes";

function App() {
  return (
    <Routes>
      <Route path={routes.apiTester} element={<ApiTester />} />
      <Route path={routes.login} element={<Login />} />
      <Route path="/" element={<Navigate to={routes.login} />} />

      {/* Rutas agrupadas dentro de Dashboard */}
      <Route path={routes.dashboard} element={<Dashboard />}>
        <Route path="inicio" element={<Inicio />} />
        <Route path="convalidaciones" element={<Convalidaciones />} />
      </Route>
    </Routes>
  );
}

export default App;
