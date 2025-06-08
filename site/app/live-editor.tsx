'use client'

import { Editor } from 'codice'
import React, { startTransition, useActionState, useEffect, useId, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { useTheme } from './theme'
import { ArrowIcon } from './arrow-icon'
import { useHighlightTheme } from './highlight-theme'

const cx = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

const CODE_QUERY_KEY = 'c'
const SYNTAX_THEMES = ['default', 'solarized', 'dracula', 'monokai', 'base16', 'nord']

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
    <button className="control-button">
      <input id={id} type="checkbox" checked={checked} onChange={(event) => onChange?.(event.target.checked)} />
      <label className="controls-manager-label" data-checked={checked} htmlFor={id}>
        {`${propName} = `}
        {content ? content : <span>{checked ? '●' : '○'}</span>}
      </label>
    </button>
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
      <span className="range-button" onClick={() => onChange(Math.max(min, value - step))}>
        <ArrowIcon size={16} direction="left" />
      </span>
      <label className="controls-manager-label controls-manager-label--checked" htmlFor={id}>
        {text}
        {` =`}
        <b className="range-selector-value">
          <span>{value.toFixed(1)}</span>
        </b>
      </label>
      <span className="range-button" onClick={() => onChange(Math.min(max, value + step))}>
        <ArrowIcon size={16} direction="right" />
      </span>
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
  const [actionState, dispatch, isPending] = useActionState<{ state: 'idle' | 'succeed' | 'error' }, 'reset' | 'copy'>(
    (state, action) => {
      if (action === 'reset') {
        return { state: 'idle' }
      } else if (action === 'copy') {
        return onCopyImage().then((succeed) => {
          return { state: succeed ? 'succeed' : 'error' }
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
      <span className="flex items-center gap-1">
        {currentState === 'succeed' ? (
          <>
            <span className="success-icon">✔</span>
            <span className="copy-image-text">Copied</span>
          </>
        ) : currentState === 'error' ? (
          <>
            <span className="error-icon">✖</span>
            <span className="copy-image-text">Failed to copy</span>
          </>
        ) : (
          <>
            <CameraIcon width={18} height={18} fill="none" stroke="currentColor" strokeWidth="1.5" />
            <span className="copy-image-text">Copy Screenshot</span>
          </>
        )}
      </span>
    </span>
  )
}

function DropdownMenu({
  buttonText,
  items,
  onChange,
  onNext,
  ...props
}: {
  buttonText: string
  items: { text: string }[]
  onChange: (text: string) => void
  onNext?: () => void
} & React.HTMLAttributes<HTMLDivElement>) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = nodeRef.current
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div {...props} ref={nodeRef} className={cx('dropdown-menu', props.className)}>
      <span className={cx('dropdown-menu-button-group', !!onNext && 'dropdown-menu-button-group--merged')}>
        <button className="dropdown-menu-button" onClick={() => setIsOpen(!isOpen)}>
          {buttonText}
        </button>
        {!!onNext && (
          <>
            {/* divider */}
            <span className="dropdown-menu-divider" />
            {/* A button to go to the next */}

            <button
              className="dropdown-menu-button--next"
              onClick={() => {
                setIsOpen(false)
                onNext()
              }}
            >
              {/* right arrow svg */}
              <svg
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="dropdown-menu-next-icon"
              >
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </span>
      {isOpen && (
        <ul className="dropdown-menu-list">
          {items.map((item, index) => (
            <li
              key={index}
              className="dropdown-menu-list-item"
              onClick={() => {
                setIsOpen(false)
                onChange(item.text)
              }}
            >
              {item.text}
            </li>
          ))}
        </ul>
      )}
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
  const [title, setTitle] = useState('Untitled')
  const { theme, setTheme } = useTheme()
  const { highlightTheme, setHighlightTheme } = useHighlightTheme()
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
            propName="line no."
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
          text="font size"
          className="range-control"
          min={12}
          max={20}
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
          text="line no. width"
          className="range-control"
          value={lineNumbersWidth}
          min={2}
          max={3}
          step={0.1}
          onChange={setLineNumbersWidth}
        />
        {/* selector highlight styling theme */}
        <DropdownMenu
          className="dropdown-menu-highlight"
          buttonText={`syntax = ${highlightTheme}`}
          items={SYNTAX_THEMES.map((theme) => ({ text: theme }))}
          onChange={(text) => {
            setHighlightTheme(text)
          }}
          onNext={() => {
            const nextIndex = SYNTAX_THEMES.indexOf(highlightTheme) + 1
            const nextTheme = SYNTAX_THEMES[nextIndex % SYNTAX_THEMES.length]
            setHighlightTheme(nextTheme)
          }}
        />

        <ScreenshotButton onCopyImage={() => handleCopyImage('#editor-canvas')} />
      </div>

      <div className="editor-layout">
        <Resizable className="editor-resize">
          <Editor
            id="editor-canvas"
            value={code}
            className="editor"
            title={title}
            controls={controls}
            fontSize={fontSize}
            lineNumbers={lineNumbers}
            lineNumbersWidth={`${lineNumbersWidth}rem`}
            padding={`${padding}rem`}
            onChange={(text) => setCode(text)}
            onChangeTitle={(newTitle) => setTitle(newTitle)}
          />
        </Resizable>
      </div>
    </div>
  )
}

function Resizable({
  children,
  ...props
}: {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  const containerRef = useRef(null)

  const onMouseDown = (e) => {
    const startX = e.clientX
    const startWidth = containerRef.current.offsetWidth

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX)
      containerRef.current.style.width = `${newWidth}px`
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div {...props} ref={containerRef}>
      {children}
      <div className="resizable-resizer" onMouseDown={onMouseDown} style={{ cursor: 'ew-resize' }} />
    </div>
  )
}
