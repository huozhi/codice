import './globals.css'
import './styles.css'
import './theme.css'
import { ThemeProvider } from './theme'
import { HighlightThemeProvider } from './highlight-theme'

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
      <HighlightThemeProvider>
        <Html>{children}</Html>
      </HighlightThemeProvider>
    </ThemeProvider>
  )
}

export const metadata = {
  title: 'Codice',
  description: 'A simple code editor and code block',
}
