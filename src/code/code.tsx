import { tokenize, generate } from 'sugar-high'
import { baseCss, headerCss, lineNumbersCss } from './css'
import { useMemo } from 'react'

function generateHighlightedLines(
  codeText: string,
  highlightLines: ([number, number] | number)[],
  lineNumbers: boolean
) {
  const childrenLines = generate(tokenize(codeText))

  // each line will contain class name 'sh__line',
  // if it's highlighted, it will contain [data-highlight]
  const highlightedLines = new Set<number>()
  if (highlightLines) {
    for (const line of highlightLines) {
      if (Array.isArray(line)) {
        // Add range of lines
        for (let i = line[0]; i <= line[1]; i++) {
          highlightedLines.add(i)
        }
      } else {
        // Add single line
        highlightedLines.add(line)
      }
    }
  }

  const lines = (
    childrenLines.map((line, index) => {
      const isHighlighted = highlightedLines.has(index + 1)
      const { tagName: Line, properties: lineProperties } = line
      const tokens = line.children
        .map((child, childIndex) => {
          const { tagName: Token, type, children, properties } = child
          return (
            <Token 
              data-sh-token-type={type}
              key={childIndex} 
              {...properties}
            >
              {(children[0].value)}
            </Token>
          )
        })
        

      return (
        <Line 
          {...lineProperties}
          // Add data-highlight attribute if line is highlighted
          {...(isHighlighted ? {'data-highlight': true} : {})}
          key={index}
        >
          {lineNumbers ? <span key='ln' data-codice-code-line-number>{index + 1}</span> : null}
          {tokens}
        </Line>
      )
    })
  )
  return lines
}

export function CodeHeader({ title, controls = false }: { title?: string; controls: boolean }) {
  if (!title && !controls) return null

  return (
    <div 
      data-codice-header
      data-codice-header-controls={controls}
    >
      <style data-codice-style>{headerCss}</style>
      {controls ? (
        <div data-codice-controls>
          <span data-codice-control />
          <span data-codice-control />
          <span data-codice-control />
        </div>
      ) : null}
      {title ? <div data-codice-title>{title}</div> : null}
    </div>
  )
}

export function Code({
  children: code,
  title,
  controls,
  preformatted = true,
  lineNumbers = false,
  highlightLines,
  ...props
}: {
  children: string
  /** Whether to use a preformatted block <pre><code> */
  preformatted?: boolean
  title?: string
  controls?: boolean
  lineNumbers?: boolean
  highlightLines?: ([number, number] | number)[]
} & React.HTMLAttributes<HTMLDivElement>) {
  const css = baseCss + (lineNumbers ? lineNumbersCss : '')
  const lineElements = useMemo(() => 
    generateHighlightedLines(code, highlightLines, lineNumbers), 
    [code, highlightLines, lineNumbers]
  ) 

  return (
    // Add both attribute because it's both root component and child component (of editor)
    <div {...props} data-codice="code" data-codice-code>
      <style data-codice-style>
        {css}
      </style>
      <CodeHeader title={title} controls={controls} />
      {preformatted ? (
        <pre data-codice-code-content>
          <code>
            <>
              {lineElements}
            </>
          </code>
        </pre>
      ) : (
        <div data-codice-code-content>{lineElements}</div>
      )}
    </div>
  )
}
