import './styles.css'

export default function layout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}

export const metadata = {
  title: 'Codice',
  description: 'A simple code editor and code block',
}