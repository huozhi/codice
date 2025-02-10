'use client'

import { Editor } from 'codice'
import React, { useState } from 'react'
import domToImage from 'dom-to-image'

const CODE_QUERY_KEY = 'c'

function ControlButton({ 
  id, 
  checked, 
  onChange, 
  propName,
  content
}: {
  id: string
  checked: boolean
  onChange?: (checked: boolean) => void
  propName: string
  content?: React.ReactNode
}) {
  return (
    <span className='control-button'>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <label className='controls-manager-label' data-checked={checked} htmlFor={id}>
        {`${propName}={`}
          {content
            ? content
            : <span>{checked ? '●' : '○'}</span>
          }
        {`}`}
      </label>
    </span>
  )
}

function Input({
  value,
  onChange,
  ...props
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <span>
      <input
        className='controls-manager-input'
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
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
        htmlFor="font-size">{`fontSize={`}<b><span>{value}</span></b>{`}`}
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

export async function copyImageDataUrl(dataUrl: string) {
  try {
    if (navigator.clipboard && window.ClipboardItem) {
      // Modern browsers: Use Clipboard API
      const blob = await (await fetch(dataUrl)).blob()
      const item = new ClipboardItem({ 'image/png': blob })
      await navigator.clipboard.write([item])
      return Promise.resolve()
    } else {
      return Promise.reject('Clipboard API not available')
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

function handleCopyImage(selector: string) {
  const domNode = document.querySelector(selector)
  return domToImage.toPng(domNode).then(dataUrl => {
    return copyImageDataUrl(dataUrl).then(
      () => {
        return true
      }, () => {
        return false
      }
    )
  })
}

function CameraIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 18V9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <circle cx="12" cy="13" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
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
  const [title, setTitle] = useState('index.js')
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
          propName="title"
          content={
            <Input
              value={title}
              onChange={v => { setTitle(v) }}
            />
          }
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

      <div className='editor-layout'>
        <span
          className="copy-image"
          onClick={() => {
            handleCopyImage('#editor-canvas')
          }}
        >
          <CameraIcon
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </span>

        <Editor
          id={'editor-canvas'}
          value={code}
          className="editor"
          title={title}
          controls={controls}
          fontSize={fontSize}
          lineNumbers={lineNumbers}
          onChange={(text) => setCode(text)}
        />
      </div>
    </div>
  )
}
