import React, { useEffect, useState } from 'react'
import { highlight } from 'sugar-high'

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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    resize: 'none',
    display: 'block',
    color: 'var(--editor-text-color)',
    backgroundColor: 'var(--editor-background-color)',
  },
}

const inputStyle = { ...styles.pad, ...styles.input }

export function Editor({ value = '', onChange = () => {}, ...props }) {
  const [text, setText] = useState(value)
  const [output, setOutput] = useState(highlight(text))

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
      <pre style={styles.pre}>
        <code style={styles.pad} dangerouslySetInnerHTML={{ __html: output }} />
      </pre>
      <textarea style={inputStyle} value={text} onChange={onInput} />
    </div>
  )
}
