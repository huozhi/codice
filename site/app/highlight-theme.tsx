'use client'

import React, { useContext, useState, createContext, useEffect } from 'react'

// write a highligh provide to change the highlight theme name

const HighlightThemeContext = createContext({
  highlightTheme: 'default',
  setHighlightTheme: (highlightTheme: string) => {},
})

export const HighlightThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highlightTheme, setHighlightTheme] = useState('default')

  function updateHighlightTheme(theme: string) {
    localStorage.setItem('highlightTheme', theme)
    document.documentElement.setAttribute('data-highlight-theme', theme)
    
    setHighlightTheme(theme)
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem('highlightTheme')
    if (storedTheme) {
      setHighlightTheme(storedTheme)
    } else {
      localStorage.setItem('highlightTheme', 'default')
      document.documentElement.setAttribute('data-highlight-theme', 'default')
      setHighlightTheme('default')
    }
  }, [])

  return (
    <HighlightThemeContext.Provider value={{ highlightTheme, setHighlightTheme: updateHighlightTheme }}>
      {children}
    </HighlightThemeContext.Provider>
  )
}

export const useHighlightTheme = () => {
  const context = useContext(HighlightThemeContext)
  if (!context) {
    throw new Error('useHighlightTheme must be used within a HighlightThemeProvider')
  }
  return context
}
