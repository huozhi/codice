'use client'

import { Editor } from 'codice'
import { useState } from 'react'
import { highlight } from 'sugar-high'

const CODE_QUERY_KEY = 'c'

function ControlButton({ id, checked, onChange, propName }: {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  propName: string
}) {
  return (
    <span className='control-button'>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <label data-checked={checked} htmlFor={id}>
        {`${propName}={`}<span>{checked ? '●' : '○'}</span>{`}`}
      </label>
    </span>
  )
}

export function LiveEditor({
  searchParams,
  defaultCode,
}: {
  searchParams: Record<string, string>
  defaultCode: string
}) {
  const codeQuery = searchParams[CODE_QUERY_KEY]
  const initialCode = codeQuery ? atob(codeQuery) : defaultCode
  const [code, setCode] = useState(initialCode)
  const [title, setTitle] = useState<'index.js' | ''>('index.js')
  const [controls, setControls] = useState(true)
  const [lineNumbers, setLineNumbers] = useState(true)

  return (
    <div>
      {/* Controls to for displaying the `title`, `controls`, `lineNumbers` */}
      <div className="controls-manager">
        <ControlButton
          id="control-title"
          checked={!!title}
          onChange={(checked) => setTitle(checked ? 'index.js' : '')}
          propName="title"
        />
        <ControlButton
          id="control-control"
          checked={controls}
          onChange={setControls}
          propName="controls"
        />
        <ControlButton
          id="control-line-numbers"
          checked={lineNumbers}
          onChange={setLineNumbers}
          propName="lineNumbers"
        />
      </div>

      <Editor
        value={code}
        className="editor"
        title={title}
        controls={controls}
        lineNumbers={lineNumbers}
        highlight={(text) => highlight(text)}
        onChange={(text) => setCode(text)}
      />
    </div>
  )
}
