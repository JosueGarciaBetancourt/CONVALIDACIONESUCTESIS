import LoginForm from "../components/login-form"

// Página de inicio de sesión
const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-md dark:border-gray-800 dark:bg-gray-950">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
