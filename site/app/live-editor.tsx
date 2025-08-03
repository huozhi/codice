'use client'

import { Editor } from 'codice'
import React, { startTransition, useActionState, useEffect, useId, useRef, useState } from 'react'
import { format as prettierFormat } from 'prettier/standalone'
import prettierPluginBabel from "prettier/plugins/babel"
import prettierPluginEstree from "prettier/plugins/estree"
import { toPng } from 'html-to-image'
import { useTheme } from './theme'
import { ArrowIcon } from './arrow-icon'
import { useHighlightTheme } from './highlight-theme'

const cx = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

const CODE_QUERY_KEY = 'c'
// Theme mapping: nord=Gruvbox, vscode=VS Code/GitHub, solarized=One Dark, dracula=Dracula, monokai=Monokai, base16=Tokyo Night
// Note: 'default' theme is used internally for SSR/hydration plain text styling and doesn't appear in this list
const SYNTAX_THEMES = ['nord', 'vscode', 'solarized', 'dracula', 'monokai', 'base16']

function ControlButton({
  id,
  checked,
  onChange,
  text: propName,
  prefix,
}: {
  id: string
  checked: boolean
  onChange?: (checked: boolean) => void
  text: string
  prefix?: React.ReactNode
}) {
  return (
    <button className="control-button">
      <input id={id} type="checkbox" checked={checked} onChange={(event) => onChange?.(event.target.checked)} />
      <label className="controls-manager-label" data-checked={checked} htmlFor={id}>
        <span className='mr-2'>{prefix ? prefix : checked ? '●' : '○'}</span>
        {` ${propName}`}
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
  displayValue = true,
}: {
  value: number
  text: string
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  className: string
  displayValue?: boolean
}) {
  return (
    <div className={className}>
      <span className="range-button" onClick={() => onChange(Math.max(min, value - step))}>
        <ArrowIcon size={16} direction="left" />
      </span>
      <label className="controls-manager-label controls-manager-label--checked">
        {text}
        {displayValue && (
          <>
            {` =`}
            <b className="range-selector-value">
              <span>{value.toFixed(1)}</span>
            </b>
          </>
        )}
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
      return Promise.resolve(dataUrl)
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
      () => dataUrl,
      () => {
        return null
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

interface ScreenshotItem {
  id: string
  dataUrl: string
  phase: 'entering' | 'settled' | 'exiting'
}

function ScreenshotButton({ onCopyImage }: { onCopyImage: () => Promise<string | null> }) {
  const [screenshots, setScreenshots] = useState<ScreenshotItem[]>([])
  const buttonRef = useRef<HTMLSpanElement>(null)
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map())
  const [actionState, dispatch, isPending] = useActionState<{ state: 'idle' | 'succeed' | 'error' }, 'reset' | 'copy'>(
    (state, action) => {
      if (action === 'reset') {
        return { state: 'idle' }
      } else if (action === 'copy') {
        // Take screenshot and create new item
        return onCopyImage().then((imageDataUrl) => {
          if (imageDataUrl) {
            const id = Date.now().toString()
            
            // Add new screenshot item to the top of the queue
            setScreenshots(prev => [{
              id,
              dataUrl: imageDataUrl,
              phase: 'entering'
            }, ...prev])
            
            // Reset button state quickly after successful screenshot
            const resetButtonTimeout = setTimeout(() => {
              dispatch('reset')
            }, 300)
            
            // Transition to settled after delay
            const settledTimeout = setTimeout(() => {
              setScreenshots(prev => prev.map(item => 
                item.id === id ? { ...item, phase: 'settled' } : item
              ))
              
              // Start exit animation 2 seconds after reaching settled state
              const exitTimeout = setTimeout(() => {
                setScreenshots(prev => prev.map(item => 
                  item.id === id ? { ...item, phase: 'exiting' } : item
                ))
                
                // Remove item after exit animation
                const removeTimeout = setTimeout(() => {
                  setScreenshots(prev => prev.filter(item => item.id !== id))
                  timeoutsRef.current.delete(id)
                  timeoutsRef.current.delete(id + '-exit')
                  timeoutsRef.current.delete(id + '-remove')
                  timeoutsRef.current.delete(id + '-reset')
                }, 300)
                
                timeoutsRef.current.set(id + '-remove', removeTimeout)
              }, 2000)
              
              timeoutsRef.current.set(id + '-exit', exitTimeout)
            }, 50)
            
            timeoutsRef.current.set(id, settledTimeout)
            timeoutsRef.current.set(id + '-reset', resetButtonTimeout)
          } else {
            // Reset button state quickly after failed screenshot
            setTimeout(() => {
              dispatch('reset')
            }, 1000)
          }
          return { state: imageDataUrl ? 'succeed' : 'error' }
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
      // Always allow new screenshots, even if one is pending
      dispatch('copy')
    })
  }

    function reset() {
    startTransition(() => {
      dispatch('reset')
    })
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear all timeouts
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      timeoutsRef.current.clear()
    }
  }, [])

  const currentState = isPending ? 'loading' : actionState.state

  return (
    <>
      <span className="copy-image w-32 inline-flex justify-center" onClick={copy} ref={buttonRef}>
        <span className="inline-flex items-center gap-1">
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
              <span className="copy-image-text">Screenshot</span>
            </>
          )}
        </span>
      </span>
      {screenshots.map((screenshot) => (
        <div
          key={screenshot.id}
          className="fixed z-50 shadow-lg rounded-lg transition-all duration-500 ease-out"
          style={(() => {
            const editorElement = document.querySelector('#editor-canvas') as HTMLElement
            const buttonRect = buttonRef.current?.getBoundingClientRect()
            
            if (!editorElement || !buttonRect) {
              return {
                top: '50px',
                left: '50px',
                width: '120px',
                height: 'auto',
                opacity: 1,
                transform: 'translateY(0px) scale(1)',
                padding: '4px',
              }
            }

            const editorRect = editorElement.getBoundingClientRect()
            // Use viewport coordinates (no scroll offset needed for fixed positioning)
            // Stack screenshots vertically, newest at top
            const index = screenshots.findIndex(s => s.id === screenshot.id)
            const finalLeft = buttonRect.right + 8
            const itemSpacing = 120 // Total space per item (includes height + gap)
            const finalTop = buttonRect.top + (index * itemSpacing)
            const finalWidth = 120

            if (screenshot.phase === 'entering') {
              return {
                top: editorRect.top + 'px',
                left: editorRect.left + 'px', 
                width: editorRect.width + 'px',
                height: editorRect.height + 'px',
                opacity: 0.9,
                transform: 'translateY(0px) scale(1)',
                padding: '0px',
              }
            } else if (screenshot.phase === 'settled') {
              return {
                top: finalTop + 'px',
                left: finalLeft + 'px',
                width: finalWidth + 'px',
                height: 'auto',
                opacity: 1,
                transform: 'translateY(0px) scale(1)',
                padding: '4px',
              }
            } else { // exiting - animate downward and fade out
              return {
                top: finalTop + 'px',
                left: finalLeft + 'px',
                width: finalWidth + 'px',
                height: 'auto',
                opacity: 0,
                transform: 'translateY(60px) translateX(20px) scale(0.7)',
                padding: '4px',
              }
            }
          })()}
        >
          <img 
            src={screenshot.dataUrl} 
            alt="Screenshot Preview" 
            className='pointer-events-none select-none w-full h-full object-cover' 
            style={{ borderRadius: 'inherit' }}
          />
        </div>
      ))}
    </>
  )
}

function DropdownMenu({
  buttonText,
  items,
  onChange,
  onNext,
  ...props
}: {
  buttonText: React.ReactNode
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
    <div {...props} ref={nodeRef} className={cx('dropdown-menu relative', props.className)}>
      <span className={cx('dropdown-menu-button-group', !!onNext && 'dropdown-menu-button-group--merged')}>
        <button className="dropdown-menu-button flex-1" onClick={() => setIsOpen(!isOpen)}>
          <span className="flex items-center gap-1">
            {buttonText}
            {/* dropdown indicator */}
            <svg
              width="14"
              height="14"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`ml-auto transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : ''}`}
            >
              <path 
                d="M6 9l6 6 6-6"
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </span>
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
              title="Next theme"
            >
              {/* next/forward arrow icon */}
              <svg
                width="12"
                height="12"
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
        <ul className="dropdown-menu-list absolute top-full left-0 w-full min-w-max">
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
  const [_f, setFormat] = useState(false)
  const [title, setTitle] = useState('Untitled')
  const { theme, setTheme } = useTheme()
  const { highlightTheme, setHighlightTheme } = useHighlightTheme()
  const [controls, setControls] = useState(true)
  const [lineNumbers, setLineNumbers] = useState(true)
  const [lineNumbersWidth, setLineNumbersWidth] = useState(2.5) // rem

  return (
    <div>
      <div className="editor-layout">
        <div className="controls flex items-center justify-between">
          {/* Left controls */}
          <div className="flex flex-col gap-y-2 flex-wrap">
            <div className="controls-manager">
              <ControlButton id="control-control" checked={controls} onChange={setControls} text="controls" />
              <ControlButton
                id="control-line-numbers"
                checked={lineNumbers}
                onChange={setLineNumbers}
                text="line no."
              />
              {/* control of theme: light/dark */}
              <ControlButton
                id="control-theme"
                checked={theme === 'dark'}
                onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                text={theme === 'dark' ? 'dark' : 'light'}
                prefix={<span>{theme === 'dark' ? '🌙' : '☀️'}</span>}
              />
            </div>
            {/* row */}
            <div className='flex flex-wrap gap-2'>
              <RangeSelector
                text="indent"
                className="range-control"
                value={lineNumbersWidth}
                min={2}
                max={3}
                step={0.1}
                onChange={setLineNumbersWidth}
                displayValue={false}
              />
              {/* selector highlight styling theme */}
              <DropdownMenu
                className="dropdown-menu-highlight w-36"
                buttonText={
                  <>
                    <span className="mr-2">🎨</span>
                    <span>{highlightTheme}</span>
                  </>
                }
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

              <ControlButton
                id="control-format"
                checked
                onChange={() => {
                  setFormat(!_f)
                  prettierFormat(code, {
                    parser: 'babel',
                    plugins: [prettierPluginBabel, prettierPluginEstree],
                    printWidth: 120,
                    singleQuote: true,
                    trailingComma: 'es5',
                    semi: false,
                    tabWidth: 2,
                  }).then((formattedCode) => {
                    setCode(formattedCode)
                  })
                }}
                text="format"
                prefix={'🧹'}
              />
            </div>
          </div>
          {/* Right side screenshot button */}
          <div className="flex items-center justify-end gap-2 self-end">
            <ScreenshotButton 
              onCopyImage={() => handleCopyImage('#editor-canvas')}
            />
          </div>
        </div>
        <Resizable className="editor-resizable">
          <Editor
            id="editor-canvas"
            value={code}
            className="editor"
            title={title}
            controls={controls}
            fontSize={14}
            lineNumbers={lineNumbers}
            lineNumbersWidth={`${lineNumbersWidth}rem`}
            padding={`1rem`}
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
      containerRef.current.style.transform = `translateX(${-((newWidth - 600) / 2)}px)` // Center the resizable container
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
      <div
        className="resizable-resizer" 
        onMouseDown={onMouseDown}
        style={{ cursor: 'ew-resize' }}
      />
    </div>
  )
}
