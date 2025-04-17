// En tu archivo de rutas (normalmente App.jsx o routes.jsx)
import { Routes, Route } from 'react-router-dom';
import ApiTester from './pages/ApiTester'; // Ajusta la ruta según tu estructura
/* import Home from './pages/Home'; // Tu página principal
 */
function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/api-tester" element={<ApiTester />} />
    </Routes>
  );
}

export default App;