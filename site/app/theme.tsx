'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const defaultTheme = 'light'

const ThemeContext = createContext({
  theme: defaultTheme,
  setTheme: (theme: 'light' | 'dark') => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<'light' | 'dark'>(defaultTheme)

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initial = stored || system
    document.documentElement.setAttribute('data-theme', initial)
    setThemeState(initial)
  }, [])

  const setTheme = (newTheme: 'light' | 'dark') => {
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    setThemeState(newTheme)
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
