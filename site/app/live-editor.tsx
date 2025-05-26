'use client'

import { Editor } from 'codice'
import React, { startTransition, useActionState, useEffect, useId, useState } from 'react'
import { toPng } from 'html-to-image'

const CODE_QUERY_KEY = 'c'

function ControlButton({
  id,
  checked,
  onChange,
  propName,
  content,
}: {
  id: string
  checked: boolean
  onChange?: (checked: boolean) => void
  propName: string
  content?: React.ReactNode
}) {
  return (
    <span className="control-button">
      <input id={id} type="checkbox" checked={checked} onChange={(event) => onChange?.(event.target.checked)} />
      <label className="controls-manager-label" data-checked={checked} htmlFor={id}>
        {`${propName}={`}
        {content ? content : <span>{checked ? '●' : '○'}</span>}
        {`}`}
      </label>
    </span>
  )
}

function RangeSelector({
  value,
  onChange,
  text,
  min,
  max,
  step,
  className,
  ...props
}: {
  value: number
  text: string
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  className: string
}) {
  const id = useId()
  return (
    <div className={className}>
      <label className="controls-manager-label controls-manager-label--checked" htmlFor={id}>
        {text}
        {`={`}
        <b>
          <span>{value}</span>
        </b>
        {`}`}
      </label>
      <input
        {...props}
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
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
  const domNode: HTMLElement = document.querySelector(selector)
  return toPng(domNode).then((dataUrl) => {
    return copyImageDataUrl(dataUrl).then(
      () => {
        return true
      },
      () => {
        return false
      }
    )
  })
}

function CameraIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 18V9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      />
      <circle cx="12" cy="13" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function ScreenshotButton({ onCopyImage }: { onCopyImage: () => Promise<boolean> }) {
  const [actionState, dispatch, isPending] = useActionState<
    { state: 'idle' | 'succeed' | 'error' },
    'reset' | 'copy'
  >(
    (state, action) => {
      if (action === 'reset') {
        return { state: 'idle' }
      } else if (action === 'copy') {
        return onCopyImage().then(succeed => {
          return { state: succeed ? 'succeed': 'error' }
        })
      }
      return state
    },
    {
      state: 'idle',
    }
  )

  function copy() {
    startTransition(async () => {
      if (isPending) return
      dispatch('copy')
    })
  }

  function reset() {
    startTransition(() => {
      dispatch('reset')
    })
  }
  // set a timeout 1.5s to reset the success or error state
  useEffect(() => {
    if (actionState.state === 'succeed' || actionState.state === 'error') {
      const timer = setTimeout(() => {
        reset()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [actionState, reset])

  const currentState = isPending ? 'loading' : actionState.state

  return (
    <span className="copy-image" onClick={copy}>
      {currentState === 'succeed' ? (
        <span className="success-icon">✔</span>
      ) : currentState === 'error' ? (
        <span className="error-icon">✖</span>
      ) : (
        <CameraIcon width={20} height={20} fill="none" stroke="currentColor" strokeWidth="1.5" />
      )}
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
  const [title, setTitle] = useState('Untitled')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [controls, setControls] = useState(true)
  const [lineNumbers, setLineNumbers] = useState(true)
  const [fontSize, setFontSize] = useState(14)
  const [padding, setPadding] = useState(1) // rem
  const [lineNumbersWidth, setLineNumbersWidth] = useState(2.5) // rem

  return (
    <div>
      {/* Controls to for displaying the `title`, `controls`, `lineNumbers` */}
      <div className="controls">
        <div className="controls-manager">
          <ControlButton id="control-control" checked={controls} onChange={setControls} propName="controls" />
          <ControlButton
            id="control-line-numbers"
            checked={lineNumbers}
            onChange={setLineNumbers}
            propName="lineNumbers"
          />
          {/* control of theme: light/dark */}
          <ControlButton
            id="control-theme"
            checked={theme === 'dark'}
            onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            propName="theme"
            content={<span>{theme === 'dark' ? '🌙' : '☀️'}</span>}
          />
        </div>
        
        <RangeSelector
          text="fontSize"
          className="range-control"
          min={12}
          max={24}
          step={2}
          value={fontSize}
          onChange={setFontSize}
        />
        <RangeSelector
          text="padding"
          className="range-control"
          min={1}
          max={2}
          step={0.1}
          value={padding}
          onChange={setPadding}
        />
        <RangeSelector
          text="lineNumbersWidth"
          className="range-control"
          value={lineNumbersWidth}
          min={2}
          max={3}
          step={0.1}
          onChange={setLineNumbersWidth}
        />
      </div>

      <div className="editor-layout">
        <ScreenshotButton onCopyImage={() => handleCopyImage('#editor-canvas')} />
        <Editor
          id="editor-canvas"
          value={code}
          className="editor"
          data-theme={theme}
          title={title}
          controls={controls}
          fontSize={fontSize}
          lineNumbers={lineNumbers}
          lineNumbersWidth={`${lineNumbersWidth}rem`}
          padding={`${padding}rem`}
          onChange={(text) => setCode(text)}
          onChangeTitle={(newTitle) => setTitle(newTitle)}
        />
      </div>
    </div>
  )
}
