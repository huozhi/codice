import React, { useEffect, useState, useRef, useCallback } from 'react'

const styles = {
  pad: {
    display: 'inline-block',
    overflowWrap: 'break-word',
  },
  pre: {
    margin: '0px',
    whiteSpace: 'pre-wrap',
  },
  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  input: {
    resize: 'none',
    display: 'block',
    color: 'var(--editor-text-color)',
    backgroundColor: 'var(--editor-background-color)',
  },
}

const inputStyle = { ...styles.pad, ...styles.input, ...styles.absolute }
const codeStyle = {
  ...styles.pad,
}
const preStyle = {
  ...styles.pre,
  ...styles.absolute,
}

export function Editor({ value = '', onChange = () => {}, highlight = () => {}, ...props }) {
  const [text, setText] = useState(value)
  const [output, setOutput] = useState(() => highlight(text))
  const codeRef = useRef()
  const textareaRef = useRef()

  function update(code) {
    const highlighted = highlight(code)
    setText(code)
    setOutput(highlighted)
    onChange(code)
  }

  useEffect(() => {
    update(value)
  }, [value])

  const scroll = useCallback(() => {
    const code = codeRef.current
    const textarea = textareaRef.current
    if (code && textarea) {
      code.style.transform = `translateY(${-textarea.scrollTop}px)`
    }
  }, [])

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.addEventListener('scroll', scroll)
    }
    return () => {
      textarea.removeEventListener('scroll', scroll)
    }
  }, [])

  function onInput(event) {
    const code = event.target.value || ''
    update(code)
  }

  return (
    <div {...props}>
      <pre style={preStyle}>
        <code style={codeStyle} ref={codeRef} dangerouslySetInnerHTML={{ __html: output }} />
      </pre>
      <textarea ref={textareaRef} style={inputStyle} value={text} onChange={onInput} />
    </div>
  )
}
