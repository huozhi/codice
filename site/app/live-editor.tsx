'use client'

import { Editor } from 'codice'
import { useState } from 'react'

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
      <label className='controls-manager-label' data-checked={checked} htmlFor={id}>
        {`${propName}={`}<span>{checked ? '●' : '○'}</span>{`}`}
      </label>
    </span>
  )
}

function RangeSelector({ 
  value, 
  onChange,
  className,
  ...props
}: { 
  value: number; 
  onChange: (value: number) => void 
  className: string
}) {
  return (
    <div className={className}>
      <label 
        className='controls-manager-label controls-manager-label--checked' 
        htmlFor="font-size">{`fontSize={`}<span>{value}</span>{`}`}
      </label>
      <input
        {...props}
        type="range"
        min="12"
        max="24"
        step="2"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
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
  const [fontSize, setFontSize] = useState(14)

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
      <RangeSelector className="font-size-control" value={fontSize} onChange={setFontSize} />

      <Editor
        value={code}
        className="editor"
        title={title}
        controls={controls}
        fontSize={fontSize}
        lineNumbers={lineNumbers}
        onChange={(text) => setCode(text)}
      />
    </div>
  )
}
