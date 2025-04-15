"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({
  theme: "system",
  setTheme: () => null,
})

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "theme" }) {
  const [theme, setTheme] = useState(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem(storageKey)
    if (storedTheme) {
      return storedTheme
    }

    // If not stored, check for system preference
    if (defaultTheme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }

    return defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement

    // Remove previous theme class
    root.classList.remove("light", "dark")

    // Add current theme class
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    // Store theme in localStorage
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      if (theme === "system") {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(mediaQuery.matches ? "dark" : "light")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme) => setTheme(newTheme),
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
