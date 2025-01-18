'use client'

import { useEffect, useState, useRef, forwardRef } from 'react'

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
    onChange = () => {},
    highlight = () => '',
    ...props
  }: {
    title?: string
    value?: string
    onChange?: (code: string) => void
    highlight?: (code: string) => string
  } & React.HTMLAttributes<HTMLDivElement>,
  ref: React.Ref<HTMLDivElement>
) {
  const [text, setText] = useState(value)
  const [output, setOutput] = useState(() => highlight(text))
  const codeRef = useRef(null)
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
    <div {...props} data-codice-editor>
      <div data-codice-editor-header>
        <div data-codice-editor-controls>
          <span data-codice-editor-controls-close />
          <span data-codice-editor-controls-close />
          <span data-codice-editor-controls-close-maximize />
        </div>
        <div data-codice-editor-title>{title || ''}</div>
      </div>
      <div data-codice-editor-content>
        {/* Unique elements don't need special data attributes,
        they can be styled using the class attribute. e.g. [data-codice-editor] code { ... }
         */}
        <pre>
          <code
            ref={codeRef}
            dangerouslySetInnerHTML={{ __html: output }}
          />
        </pre>
        <textarea
          ref={composeRefs(ref, textareaRef)}
          value={text}
          onChange={onInput}
        />
      </div>
    </div>
  )
})

export { Editor }
