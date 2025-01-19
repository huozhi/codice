'use client'

import { Editor } from 'codice'
import { useState } from 'react'
import { highlight } from 'sugar-high'

const CODE_QUERY_KEY = 'c'

function ControlButton({ id, checked, onChange, name }) {
  return (
    <span className='control-button'>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <label data-checked={checked} htmlFor={id}>
        {`${name}={`}<span>{checked ? '●' : '○'}</span>{`}`}
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

  return (
    <div>
      {/* Controls to for displaying the `title` and `controls` */}
      <div className="controls-manager">
        <ControlButton
          id="title-control"
          checked={!!title}
          onChange={(checked) => setTitle(checked ? 'index.js' : '')}
          name="title"
        />

        <ControlButton
          id="controls-control"
          checked={controls}
          onChange={setControls}
          name="controls"
        />
      </div>

      <Editor
        value={code}
        className="editor"
        title={title}
        controls={controls}
        highlight={(text) => highlight(text)}
        onChange={(text) => setCode(text)}
      />
    </div>
  )
}
