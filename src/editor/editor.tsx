'use client'

import { useEffect, useState, useRef, forwardRef } from 'react'
import { Code } from '../code'
import { CodeHeader } from '../code/code'

function composeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    })
  }
}

const Editor = forwardRef(function EditorComponent(
  {
    title,
    value = '',
    controls = true,
    onChange = () => {},
    highlight = () => '',
  }: {
    title?: string
    value?: string
    controls?: boolean
    onChange?: (code: string) => void
    highlight?: (code: string) => string
  } & React.HTMLAttributes<HTMLDivElement>,
  ref: React.Ref<HTMLDivElement>
) {
  const [text, setText] = useState(value)
  const [output, setOutput] = useState(() => highlight(text))
  const textareaRef = useRef(null)

  function update(code: string) {
    const highlighted = highlight(code)
    setText(code)
    setOutput(highlighted)
    onChange(code)
  }

  useEffect(() => {
    update(value)
  }, [value])

  function onInput(event) {
    const code = event.target.value || ''
    update(code)
  }

  return (
    <>
      {/* Display the header outside of the matched textarea and code */}
      <CodeHeader title={title} controls={controls} />
      <div data-codice-editor-content>
        <Code title={null} controls={false}>
          {output}
        </Code>
        <textarea ref={composeRefs(ref, textareaRef)} value={text} onChange={onInput} />
      </div>
    </>
  )
})

export { Editor }
