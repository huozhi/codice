import React, { useEffect, useState, useRef, CSSProperties } from 'react'

const styles: Record<string, CSSProperties> = {
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
  },
  codeControl: {
    backgroundColor: 'var(--editor-control-color)',
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


export function Editor(
  { title, value = '', onChange = () => {}, highlight = () => '', ...props }:
  { title?: string, value?: string, onChange?: (code: string) => void, highlight?: (code: string) => string } & React.HTMLAttributes<HTMLDivElement>
) {
  const [text, setText] = useState(value)
  const [output, setOutput] = useState(() => highlight(text))
  const codeRef = useRef()
  const textareaRef = useRef()

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
    <div {...props}>
      <div className="editor-header">
        <div className="editor-controls">
          <span className='editor-controls__control' style={styles.codeControl} />
          <span className='editor-controls__control' style={styles.codeControl} />
          <span className='editor-controls__control' style={styles.codeControl} />
        </div>
        <div className="editor-title">{title || ''}</div>
      </div>
      <div style={styles.root}>
        <pre style={preStyle}>
          <code style={codeStyle} ref={codeRef} dangerouslySetInnerHTML={{ __html: output }} />
        </pre>
        <textarea ref={textareaRef} style={inputStyle} value={text} onChange={onInput} />
      </div>
    </div>
  )
}
