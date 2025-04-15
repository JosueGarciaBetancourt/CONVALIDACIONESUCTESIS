import { redirect } from "next/navigation"
import { LoginForm } from "@/components/login-form"

export default function Home() {
  // If user is already logged in, redirect to dashboard
  // This would be replaced with actual auth check
  const isLoggedIn = false

  if (isLoggedIn) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sistema de Convalidaciones</h1>
          <p className="mt-2 text-sm text-slate-600">Inicie sesión para acceder al sistema</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
