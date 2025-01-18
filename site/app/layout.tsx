import './styles.css'

export default function layout({ children }) {
  return (
    <html>
      <body>
        <div className='main'>
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

export const metadata = {
  title: 'Codice',
  description: 'A simple code editor and code block',
}