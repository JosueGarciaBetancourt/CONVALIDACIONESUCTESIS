"use client"

import React from "react"

// Contexto para el tema
const ThemeProviderContext = React.createContext()

// Hook para usar el tema
const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Componente proveedor del tema
const ThemeProvider = ({ children, defaultTheme = "system", storageKey = "theme" }) => {
  const [theme, setTheme] = React.useState(() => {
    const storedTheme = localStorage.getItem(storageKey)
    return storedTheme || defaultTheme
  })

  React.useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (newTheme) => {
        localStorage.setItem(storageKey, newTheme)
        setTheme(newTheme)
      },
    }),
    [theme, storageKey],
  )

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}
