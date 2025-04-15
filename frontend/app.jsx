import React from "react"
// Obtener las dependencias de React Router
const { BrowserRouter, Routes, Route, Navigate, useNavigate, Link } = ReactRouterDOM
import { ThemeProvider } from "next-themes"
import LoginPage from "./pages/LoginPage"
import DashboardShell from "./components/DashboardShell"
import DashboardPage from "./pages/DashboardPage"
import UniversitiesPage from "./pages/UniversitiesPage"
import CareersPage from "./pages/CareersPage"
import CurriculumsPage from "./pages/CurriculumsPage"
import StudentsPage from "./pages/StudentsPage"
import CoursesPage from "./pages/CoursesPage"
import NewValidationPage from "./pages/NewValidationPage"
import ValidationReviewPage from "./pages/ValidationReviewPage"
import ValidationReportPage from "./pages/ValidationReportPage"
import HistoryPage from "./pages/HistoryPage"
import ReactDOM from "react-dom/client"

// Componente de carga
const Loading = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
  </div>
)

// Componente de ruta protegida
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Componente principal de la aplicación
const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="theme-preference">
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="universities" element={<UniversitiesPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="curriculums" element={<CurriculumsPage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="validations/new" element={<NewValidationPage />} />
            <Route path="validations/review/:id" element={<ValidationReviewPage />} />
            <Route path="validations/report/:id" element={<ValidationReportPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

// Renderizar la aplicación
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
