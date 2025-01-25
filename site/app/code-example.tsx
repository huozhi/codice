import { Code } from 'codice'

const CODE_SIMPLE_SNIPPET_HTML = (`console.log("hello world")`)

const CODE_ULTIMATE_SNIPPET_HTML = (`\
import { Code } from 'codice'

<Code controls title="app/index.js">
  {'<div>Hello World</div>'}
</Code>
`)

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
      <CodeExampleItem title="Code Block with Controls and Title">
        <Code className="code" controls title="app/index.js">
          {CODE_ULTIMATE_SNIPPET_HTML}
        </Code>
      </CodeExampleItem>

      <CodeExampleItem title="Code Block with Highlighted Lines">
        <Code 
          className="code" title="app/index.js" 
          highlightLines={[1, [4,5]]}
          lineNumbers={true}
        >
          {`\
import { highlight } from 'sugar-high'

function marker() {
  const code = "return 'long live sugar-high'"
  return highlight(code)
}

const html = marker()

render(html)
`}
        </Code>
      </CodeExampleItem>

      <CodeExampleItem title="Simple Code Block">
        <Code className="code">{CODE_SIMPLE_SNIPPET_HTML}</Code>
      </CodeExampleItem>      
    </div>
  )
}
