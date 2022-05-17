import React, { useEffect, useState, useRef } from 'react'

const styles = {
  pad: {
    display: 'inline-block',
    overflowWrap: 'break-word',
  },
  pre: {
    margin: '0px',
    whiteSpace: 'pre-wrap',
  },
  input: {
    resize: 'none',
    display: 'block',
    color: 'var(--editor-text-color)',
    backgroundColor: 'var(--editor-background-color)',
  },
  root: {
    position: 'relative',
  }
}

const inputStyle = {
  ...styles.pad,
  ...styles.input,
}
const codeStyle = {
  ...styles.pad,
}
const preStyle = {
  ...styles.pre,
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

  function onInput(event) {
    const code = event.target.value || ''
    update(code)
  }

  return (
    <div {...props}>
      <div style={styles.root}>
        <pre style={preStyle}>
          <code style={codeStyle} ref={codeRef} dangerouslySetInnerHTML={{ __html: output }} />
        </pre>
        <textarea ref={textareaRef} style={inputStyle} value={text} onChange={onInput} />
      </div>
    </div>
  )
}
