import { tokenize, generate } from 'sugar-high'
import { css, headerCss } from './css'
import * as presets from 'sugar-high/presets'
import { useMemo } from 'react'
import { Style } from '../style'

const getPresetByExt = (ext: string) => {
  switch (ext) {
    case 'sass':
    case 'scss':
    case 'less':
    case 'css':
      return presets.css
    case 'py':
      return presets.python
    case 'rs':
      return presets.rust 
    default:
      return undefined
  }
}

/** utils */
export function getExtension(title: string | undefined) {
  return (title || '').split('.').pop() || ''
}

function generateHighlightedLines(
  codeText: string,
  highlightLines: ([number, number] | number)[],
  lineNumbers: boolean,
  title: string | undefined,
  extension: string | undefined
) {
  const ext = extension || getExtension(title)
  const preset = getPresetByExt(ext)
  const childrenLines = generate(tokenize(codeText, preset))

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
          data-codice-code-line
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

export function CodeHeader({ 
  title, 
  controls = false
}: {
  title?: string
  controls: boolean
}) {
  if (!title && !controls) return null
  return (
    <div 
      data-codice-header
      data-codice-header-controls={controls}
    >
      <Style css={headerCss()} />
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

function CodeFrame({ 
  children, 
  preformatted,
  asMarkup,
}: { 
  children: React.ReactNode
  preformatted: boolean
  asMarkup: boolean
}) {
  const props = asMarkup ? { dangerouslySetInnerHTML: { __html: children } } : { children }
  return preformatted ? (
    <pre data-codice-code-content>
      <code {...props} />
    </pre>
  ) : (
    <div {...props} data-codice-code-content  />
  )
}

export function Code({
  children: code,
  title,
  controls,
  fontSize,
  highlightLines,
  preformatted = true,
  lineNumbers = false,
  lineNumbersWidth,
  padding,
  asMarkup = false,
  extension,
  ...props
}: {
  children: string
  /** Whether to use a preformatted block <pre><code> */
  preformatted?: boolean
  fontSize?: string | number
  highlightLines?: ([number, number] | number)[]
  title?: string
  controls?: boolean
  lineNumbers?: boolean
  lineNumbersWidth?: string
  padding?: string
  asMarkup?: boolean
  extension?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const styles = css({ fontSize, lineNumbers, lineNumbersWidth, padding })
  
  const lineElements = useMemo(() => 
    asMarkup 
      ? code
      : generateHighlightedLines(code, highlightLines, lineNumbers, title, extension),
    [code, highlightLines, lineNumbers, title, extension, asMarkup]
  )

  return (
    // Add both attribute because it's both root component and child component (of editor)
    <div {...props} data-codice="code" data-codice-code>
      <Style css={styles} />
      <CodeHeader title={title} controls={controls} />
      <CodeFrame preformatted={preformatted} asMarkup={asMarkup}>
        {lineElements}
      </CodeFrame>
    </div>
  )
}
