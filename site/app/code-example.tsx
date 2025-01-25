import { Code } from 'codice'

const CODE_SIMPLE_SNIPPET_HTML = `\
# Here is a simple function
def hello():
    print('Hello, world from Python!')
    return 123 # return a number

hello()
`

const CODE_ULTIMATE_SNIPPET_HTML = `\
import { Code } from 'codice'
import { highlight } from 'sugar-high'

function renderMarkup() {
  const code = "return 'long live sugar-high'"
  return highlight(code)
}

const markup = renderMarkup()
console.log(markup)

render(
  <div>
    <Code 
      controls 
      title="app/index.js"
      lineNumbers
      highlightLines={[1, [14, 19]]}
    >
      {'<div>Hello World</div>'}
    </Code>
  </div>
)
`

function CodeExampleItem({ 
  title, 
  children,
}: { 
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="code-example__item">
      <h3 className="code-example__item__title">{title}</h3>
      {children}
    </div>
  )
}

export function CodeExamples() {
  return (
    <div className="code-example">
      <CodeExampleItem title="Ultimate Code Block">
        <Code 
          controls
          className="code" 
          title="app/index.js"
          highlightLines={[1, [14, 19]]}
          lineNumbers
        >
          {CODE_ULTIMATE_SNIPPET_HTML}
        </Code>
      </CodeExampleItem>

      <CodeExampleItem title="Language Based Highlighting">
        <p>
          Pass the title with the file extension to enable language based highlighting.
        </p>
        <Code className="code" title='main.py'>{CODE_SIMPLE_SNIPPET_HTML}</Code>
      </CodeExampleItem>
    </div>
  )
}
