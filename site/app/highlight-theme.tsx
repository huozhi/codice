'use client'

import React, { useContext, useState, createContext, useEffect } from 'react'

// write a highligh provide to change the highlight theme name

const SSR_HIGHLIGHT_THEME = 'default' // Plain text theme for SSR/hydration

const HighlightThemeContext = createContext({
  highlightTheme: SSR_HIGHLIGHT_THEME,
  setHighlightTheme: (highlightTheme: string) => {},
})

export const HighlightThemeProvider: React.FC<{ 
  children: React.ReactNode
  defaultTheme: string 
}> = ({ children, defaultTheme }) => {
  // Start with SSR theme for hydration safety
  const [highlightTheme, setHighlightTheme] = useState(SSR_HIGHLIGHT_THEME)

  function updateHighlightTheme(theme: string) {
    if (theme === SSR_HIGHLIGHT_THEME) {
      return
    }

    localStorage.setItem('highlightTheme', theme)
    
    // Update document attribute (client-side only)
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-highlight-theme', theme)
    }
    
    setHighlightTheme(theme)
  }

  useEffect(() => {
    // Load saved theme from localStorage after mount (client-side only)
    const savedTheme = localStorage.getItem('highlightTheme')
    const themeToUse = savedTheme || defaultTheme
    
    // Always update from SSR theme to the actual theme
    setHighlightTheme(themeToUse)
    
    if (savedTheme === SSR_HIGHLIGHT_THEME) {
      return
    }
    // Update document attribute (client-side only)
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-highlight-theme', themeToUse)
    }
  }, [defaultTheme])

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
