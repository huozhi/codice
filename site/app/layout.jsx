import './styles.css'

export default function layout({ children }) {
  return (
    <html>
      <head></head>
      <body>{children}</body>
    </html>
  )
}