import { Code } from 'codice'
import { highlight } from 'sugar-high'

const CODE_SIMPLE_SNIPPET_HTML = highlight(`console.log("hello world")`)

const CODE_ULTIMATE_SNIPPET_HTML = highlight(`\
import { Code } from 'codice'

<Code controls filename="app/index.js">
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
      <CodeExampleItem title="Ultimate Code Block">
        <Code className="code code--controls" controls filename="app/index.js">
          {CODE_ULTIMATE_SNIPPET_HTML}
        </Code>
      </CodeExampleItem>

      <CodeExampleItem title="Code Block with filename">
        <Code className="code code--filename" filename="app/index.js">
          {highlight(`\
function marker() {
  return "long live sugar-high"
}`)}
        </Code>
      </CodeExampleItem>

      <CodeExampleItem title="Simple Code Block">
        <Code className="code code--simple">{CODE_SIMPLE_SNIPPET_HTML}</Code>
      </CodeExampleItem>

      
    </div>
  )
}
