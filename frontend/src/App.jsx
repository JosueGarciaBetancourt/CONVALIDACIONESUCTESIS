import { Suspense, lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { DashboardShell } from "./components/dashboard/dashboard-shell"

// Lazy load pages for better performance
const LoginPage = lazy(() => import("./pages/login"))
const DashboardPage = lazy(() => import("./pages/dashboard"))
const UniversitiesPage = lazy(() => import("./pages/universities"))
const CareersPage = lazy(() => import("./pages/careers"))
const CurriculumsPage = lazy(() => import("./pages/curriculums"))
const StudentsPage = lazy(() => import("./pages/students"))
const CoursesPage = lazy(() => import("./pages/courses"))
const NewValidationPage = lazy(() => import("./pages/validations/new"))
const ValidationReviewPage = lazy(() => import("./pages/validations/review"))
const ValidationReportPage = lazy(() => import("./pages/validations/report"))
const HistoryPage = lazy(() => import("./pages/history"))

// Loading component
const Loading = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
  </div>
)

// Auth guard component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  )
}

export default App
