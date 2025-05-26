import './styles.css'
import { ThemeProvider } from './theme-provider'

export default function layout({ children }) {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export const metadata = {
  title: 'Codice',
  description: 'A simple code editor and code block',
}
