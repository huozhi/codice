'use client'

import { useEffect, useState, useRef, forwardRef } from 'react'
import { CodeHeader, getExtension, Code } from '../code/code'
import { ScopedStyle } from '../style'
import { css } from './css'

function composeRefs(...refs: React.Ref<HTMLElement>[]) {
  return (node: HTMLElement | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        if (node) {
          ref(node)
        }
      } else if (ref) {
        if (node) {
          ref.current = node
        }
      }
    })
  }
}

export const Editor = forwardRef(function Editor(
  {
    title,
    value = '',
    controls = true,
    lineNumbers = true,
    lineNumbersWidth,
    extension,
    padding,
    onChange = () => {},
    fontSize,
    fontFamily,
    ...props
  }: {
    title?: string
    value?: string
    controls?: boolean
    lineNumbers?: boolean
    lineNumbersWidth?: string
    padding?: string
    extension?: string
    onChange?: (code: string) => void
  } & {
    fontSize?: string | number
    fontFamily?: string
  } & React.HTMLAttributes<HTMLDivElement>,
  ref: React.Ref<HTMLDivElement>
) {
  const [code, setCode] = useState(value)
  const textareaRef = useRef(null)

  function update(textContent: string) {
    setCode(textContent)
    onChange(textContent)
  }

  useEffect(() => {
    if (value !== code) {
      update(value)
    }
  }, [value, code])

  function onInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const textContent = event.target.value || ''
    update(textContent)
  }

  return (
    <div
      {...props}
      data-codice="editor"
      data-codice-editor
      // DOM attributes for selecting the stateful editor easily.
      // e.g. [data-codice-line-numbers="true"]
      data-codice-title={title || ''}
      data-codice-controls={!!controls}
      data-codice-line-numbers={!!lineNumbers}
    >
      <ScopedStyle css={css({ fontSize, padding, lineNumbersWidth, fontFamily })} />
      {/* Display the header outside of the matched textarea and code, by default display controls */}
      <CodeHeader title={title} controls={controls} />
      <div data-codice-content>
        {/* hide controls component inside Code to keep content matched with textarea */}
        <Code
          title={null}
          extension={extension || getExtension(title)}
          controls={false}
          lineNumbers={lineNumbers}
          lineNumbersWidth={lineNumbersWidth}
          padding={padding}
          // Do not pass fontSize to Code in Editor.
          // It will control both the textarea and code font size.
        >
          {code}
        </Code>
        <textarea ref={composeRefs(ref, textareaRef)} value={code} onChange={onInput} />
      </div>
    </div>
  )
})
