import './globals.css'
import './styles.css'
import './theme.css'
import { ThemeProvider } from './theme'
import { HighlightThemeProvider } from './highlight-theme'

// Default to the first available theme (Gruvbox)
const DEFAULT_HIGHLIGHT_THEME = 'nord'

function Html({ children }) {
  return (
    <html>
      <body>
        <div className="main">
          {children}
          <footer>
            <p>
              © {new Date().getFullYear()},{` `}
              <a href={'https://github.com/huozhi'}>Huozhi</a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  )
}

export default function layout({ children }) {
  return (
    <ThemeProvider>
      <HighlightThemeProvider defaultTheme={DEFAULT_HIGHLIGHT_THEME}>
        <Html>{children}</Html>
      </HighlightThemeProvider>
    </ThemeProvider>
  )
}

export const metadata = {
  title: 'Codice',
  description: 'A simple code editor and code block',
}
