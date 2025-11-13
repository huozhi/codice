'use client'

import { Editor } from 'codice'
import React, { startTransition, useActionState, useEffect, useRef, useState } from 'react'
import { format as prettierFormat } from 'prettier/standalone'
import { toPng } from 'html-to-image'
import { useTheme } from './theme'
import { ArrowIcon } from './arrow-icon'
import { useHighlightTheme } from './highlight-theme'

const cx = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

const CODE_QUERY_KEY = 'c'
// Theme mapping: nord=Gruvbox, vscode=VS Code/GitHub, solarized=One Dark, minimal=Minimal, monokai=Monokai, base16=Tokyo Night
// Note: 'default' theme is used internally for SSR/hydration plain text styling and doesn't appear in this list
const SYNTAX_THEMES = ['nord', 'vscode', 'solarized', 'minimal', 'monokai', 'base16']

// Theme color representatives (2 colors per theme)
const THEME_COLORS: Record<string, [string, string]> = {
  nord: ['#fabd2f', '#fb4934'], // Gruvbox: yellow and red
  vscode: ['#569cd6', '#ce9178'], // VS Code: blue and orange
  solarized: ['#c678dd', '#98c379'], // One Dark: purple and green
  minimal: ['#b0b0b0', '#808080'], // Minimal: light gray and medium gray
  monokai: ['#f92672', '#a6e22e'], // Monokai: pink and green
  base16: ['#bb9af7', '#9ece6a'], // Tokyo Night: purple and green
}

function ThemeColorBlocks({ theme }: { theme: string }) {
  const colors = THEME_COLORS[theme] || ['#000000', '#000000']
  return (
    <span className="flex items-center justify-center gap-1">
      <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[0] }} />
      <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[1] }} />
    </span>
  )
}

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
      <label className="controls-manager-label whitespace-nowrap" data-checked={checked} htmlFor={id}>
        <span className="mr-2">{prefix ? prefix : checked ? '●' : '○'}</span>
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
    if (!navigator.clipboard || !window.ClipboardItem) {
      return Promise.reject('Clipboard API not available')
    }

    const blob = await (await fetch(dataUrl)).blob()
    
    // Safari compatibility: Check if the format is supported
    const mimeType = 'image/png'
    
    // Use ClipboardItem.supports() if available (modern browsers)
    if (typeof ClipboardItem.supports === 'function') {
      if (!ClipboardItem.supports(mimeType)) {
        return Promise.reject(`Format ${mimeType} not supported`)
      }
    }

    // Safari-specific: Create ClipboardItem with promise-based blob for better compatibility
    const clipboardItem = new ClipboardItem({ 
      [mimeType]: Promise.resolve(blob)
    })

    // Safari requires user gesture - this should be called within a user interaction
    await navigator.clipboard.write([clipboardItem])
    return Promise.resolve(dataUrl)
    
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Clipboard error:', error)
    }
    
    // Safari-specific error handling with better messages
    if (error instanceof Error) {
      if (error.name === 'NotAllowedError') {
        // This is the most common Safari issue
        return Promise.reject('Safari blocked clipboard access. Try clicking the screenshot button again.')
      }
      if (error.name === 'DataError') {
        return Promise.reject('Invalid image data format.')
      }
      if (error.name === 'SecurityError') {
        return Promise.reject('Security policy prevented clipboard access.')
      }
    }
    
    // Generic error fallback
    return Promise.reject('Failed to copy image to clipboard. Please try again.')
  }
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

function FormatIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`inline-block ${className || ''}`} {...props}>
      {/* Mop handle */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 2v14"
      />
      {/* Mop bristles */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 16l-2 4M12 16l-2 4M16 16l-2 4"
      />
    </svg>
  )
}

interface ScreenshotItem {
  id: string
  dataUrl: string
  phase: 'entering' | 'settled' | 'exiting'
}

function ScreenshotButton({ editorElementRef }: { editorElementRef: React.RefObject<HTMLElement> }) {
  const [screenshots, setScreenshots] = useState<ScreenshotItem[]>([])
  const buttonRef = useRef<HTMLSpanElement>(null)
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map())

  const handleCopyImage = async () => {
    if (!editorElementRef.current) {
      return Promise.resolve(null)
    }
    
    try {
      // Safari fix: Create clipboard promise immediately to preserve user gesture
      if (!navigator.clipboard || !window.ClipboardItem) {
        throw new Error('Clipboard API not available')
      }

      // Create the clipboard item with a promise that resolves to the blob
      // This preserves Safari's user gesture context
      const clipboardItem = new ClipboardItem({
        'image/png': toPng(editorElementRef.current).then(async (dataUrl) => {
          const response = await fetch(dataUrl)
          return response.blob()
        })
      })

      // Start clipboard write immediately (synchronously from user event)
      await navigator.clipboard.write([clipboardItem])
      
      // Generate dataUrl for return (can be done after clipboard operation)
      const dataUrl = await toPng(editorElementRef.current)
      return dataUrl
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Screenshot or clipboard error:', error)
      }
      return null
    }
  }

  const [actionState, dispatch, isPending] = useActionState<
    { state: 'idle' | 'succeed' | 'error'; dataUrl?: string }, 
    { type: 'reset' } | { type: 'copy'; dataUrl: string | null }
  >(
    (state, action) => {
      if (action.type === 'reset') {
        return { state: 'idle' }
      } else if (action.type === 'copy') {
        const imageDataUrl = action.dataUrl
        
        if (imageDataUrl) {
          const id = Date.now().toString()

          // Add new screenshot item to the top of the queue
          setScreenshots((prev) => [
            {
              id,
              dataUrl: imageDataUrl,
              phase: 'entering',
            },
            ...prev,
          ])

          // Reset button state quickly after successful screenshot
          const resetButtonTimeout = setTimeout(() => {
            reset()
          }, 300)

          // Transition to settled after delay
          const settledTimeout = setTimeout(() => {
            setScreenshots((prev) => prev.map((item) => (item.id === id ? { ...item, phase: 'settled' } : item)))

            // Start exit animation 2 seconds after reaching settled state
            const exitTimeout = setTimeout(() => {
              setScreenshots((prev) => prev.map((item) => (item.id === id ? { ...item, phase: 'exiting' } : item)))

              // Remove item after exit animation
              const removeTimeout = setTimeout(() => {
                setScreenshots((prev) => prev.filter((item) => item.id !== id))
                timeoutsRef.current.delete(id)
                timeoutsRef.current.delete(id + '-exit')
                timeoutsRef.current.delete(id + '-remove')
                timeoutsRef.current.delete(id + '-reset')
              }, 300)

              timeoutsRef.current.set(id + '-remove', removeTimeout)
            }, 1500)

            timeoutsRef.current.set(id + '-exit', exitTimeout)
          }, 50)

          timeoutsRef.current.set(id, settledTimeout)
          timeoutsRef.current.set(id + '-reset', resetButtonTimeout)
        } else {
          // Reset button state quickly after failed screenshot
          setTimeout(() => {
            reset()
          }, 1000)
        }
        return { state: imageDataUrl ? 'succeed' : 'error', dataUrl: imageDataUrl || undefined }
      }
      return state
    },
    {
      state: 'idle',
    }
  )

  function copy() {
    startTransition(async () => {
      // Perform clipboard operation immediately to maintain Safari user gesture context
      const imageDataUrl = await handleCopyImage()
      // Then dispatch the action with the result
      dispatch({ type: 'copy', dataUrl: imageDataUrl })
    })
  }

  function reset() {
    startTransition(() => {
      dispatch({ type: 'reset' })
    })
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear all timeouts
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout))
      timeoutsRef.current.clear()
    }
  }, [])

  const currentState = isPending ? 'loading' : actionState.state

  return (
    <>
      <span className="copy-image w-32 inline-flex shrink-0 justify-center rounded-l-none rounded-r-lg whitespace-nowrap" onClick={copy} ref={buttonRef}>
        <span className="inline-flex flex-col items-center gap-1">
          {currentState === 'succeed' ? (
            <>
              <span className="success-icon">✔</span>
              <span className="copy-image-text">Copied</span>
            </>
          ) : currentState === 'error' ? (
            <>
              <span className="error-icon">✖</span>
              <span className="copy-image-text">Copy Failed</span>
            </>
          ) : (
            <>
              <CameraIcon width={32} height={32} fill="none" stroke="currentColor" strokeWidth="1.5" />
              <span className="copy-image-text hidden md:inline">Screenshot</span>
            </>
          )}
        </span>
      </span>
      {screenshots.map((screenshot, index) => (
        <div
          key={screenshot.id}
          className="fixed z-50 shadow-lg rounded-lg transition-all duration-300 ease-out"
          style={(() => {
            const editorElement = editorElementRef.current
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
            const index = screenshots.findIndex((s) => s.id === screenshot.id)
            const finalLeft = buttonRect.right + 8
            const itemSpacing = 120 // Total space per item (includes height + gap)
            const finalTop = buttonRect.top + index * itemSpacing
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
                zIndex: screenshots.length - index,
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
                zIndex: screenshots.length - index,
              }
            } else {
              // exiting - animate downward and fade out
              return {
                top: finalTop + 'px',
                left: finalLeft + 'px',
                width: finalWidth + 'px',
                height: 'auto',
                opacity: 0,
                transform: 'translateY(60px) translateX(20px) scale(0.7)',
                padding: '4px',
                zIndex: screenshots.length - index,
              }
            }
          })()}
        >
          <img
            src={screenshot.dataUrl}
            alt="Screenshot Preview"
            className="pointer-events-none select-none w-full h-full object-cover"
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
  buttonRef,
  ...props
}: {
  buttonText: React.ReactNode
  items: { text: string }[]
  onChange: (text: string) => void
  onNext?: () => void
  buttonRef?: React.RefObject<HTMLButtonElement>
} & React.HTMLAttributes<HTMLDivElement>) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const openTimeRef = useRef(0)

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handlePointerDownOutside = (event: PointerEvent) => {
      // Prevent closing immediately after opening (mobile touch issue)
      if (Date.now() - openTimeRef.current < 100) {
        return
      }
      
      const dropdown = nodeRef.current
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDownOutside)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDownOutside)
    }
  }, [])

  const arrowRef = useRef<SVGSVGElement>(null)

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const arrowElement = arrowRef.current
    if (!arrowElement) {
      const newState = !isOpen
      setIsOpen(newState)
      if (newState) {
        openTimeRef.current = Date.now()
      }
      return
    }

    const arrowRect = arrowElement.getBoundingClientRect()
    const arrowLeft = arrowRect.left
    const clientX = e.clientX
    
    // Check if pointer is on the arrow (right side) - use a wider touch target
    const touchPadding = e.pointerType === 'touch' ? 12 : 8 // Extra padding for touch
    if (clientX >= arrowLeft - touchPadding) {
      // Pointer on arrow area - toggle dropdown
      e.preventDefault()
      const newState = !isOpen
      setIsOpen(newState)
      if (newState) {
        openTimeRef.current = Date.now()
      }
    } else if (onNext) {
      // Pointer on left side (not arrow) - switch theme
      e.preventDefault()
      setIsOpen(false)
      onNext()
    }
  }

  return (
    <div {...props} ref={nodeRef} className={cx('dropdown-menu relative', props.className)}>
      <button 
        ref={buttonRef} 
        className="dropdown-menu-button relative w-full" 
        onPointerDown={handlePointerDown}
      >
        <span className="flex items-center gap-1 min-w-0 w-full relative">
          <span className="flex-1 flex items-center justify-center">{buttonText}</span>
          {/* dropdown indicator */}
          <svg
            ref={arrowRef}
            width="14"
            height="14"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`flex-shrink-0 transition-transform duration-200 ease-out pointer-events-none ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu-list absolute top-full left-0 w-full min-w-max">
          {items.map((item, index) => (
            <li
              key={index}
              className="dropdown-menu-list-item flex items-center gap-2"
              onClick={() => {
                setIsOpen(false)
                onChange(item.text)
              }}
            >
              <ThemeColorBlocks theme={item.text} />
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
  const [isFormatting, setIsFormatting] = useState(false)

  // Refs for theme change animations
  const editorElementRef = useRef<HTMLDivElement | null>(null)
  const themeButtonRef = useRef<HTMLButtonElement | null>(null)

  // Handle theme change animations
  useEffect(() => {
    if (highlightTheme === 'default') return // Skip animations for SSR theme

    // Add animation to editor
    const editorElement = editorElementRef.current
    if (editorElement) {
      editorElement.classList.add('theme-changing')
      setTimeout(() => {
        editorElement.classList.remove('theme-changing')
      }, 400)
    }

    // Add animation to theme button
    const themeButton = themeButtonRef.current
    if (themeButton) {
      themeButton.classList.add('theme-selected')
      setTimeout(() => {
        themeButton.classList.remove('theme-selected')
      }, 200)
    }
  }, [highlightTheme])

  return (
    <div>
      <div className="editor-layout">
        <div className="controls flex flex-row md:flex-nowrap mt-8 md:mt-8 mb-4 md:mb-4 items-start md:items-center justify-start md:justify-center w-full">
          {/* Left controls */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 rounded-lg bg-[var(--app-editor-bg-color)] controls-left-panel flex-1">
            <DropdownMenu
              className="dropdown-menu-highlight"
              buttonRef={themeButtonRef}
              buttonText={<ThemeColorBlocks theme={highlightTheme} />}
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
              id="control-theme"
              checked={theme === 'dark'}
              onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              text={theme === 'dark' ? 'dark' : 'light'}
              prefix={<span>{theme === 'dark' ? '🌙' : '☀️'}</span>}
            />
            <ControlButton
              id="control-line-numbers"
              checked={lineNumbers}
              onChange={setLineNumbers}
              text="line no."
            />
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
            <ControlButton
              id="control-format"
              checked
              onChange={async () => {
                setFormat(!_f)
                setIsFormatting(true)
                try {
                  const [prettierPluginBabel, prettierPluginEstree] = await Promise.all([
                    import('prettier/plugins/babel'),
                    import('prettier/plugins/estree'),
                  ])
                  const formattedCode = await prettierFormat(code, {
                    parser: 'babel',
                    plugins: [prettierPluginBabel.default, prettierPluginEstree.default],
                    printWidth: 120,
                    singleQuote: true,
                    trailingComma: 'es5',
                    semi: false,
                    tabWidth: 2,
                  })
                  setCode(formattedCode)
                } catch (error) {
                  console.error('Formatting error:', error)
                } finally {
                  setTimeout(() => setIsFormatting(false), 600)
                }
              }}
              text="format"
              prefix={<FormatIcon width={14} height={14} stroke="currentColor" strokeWidth="2" className={isFormatting ? 'mop-animate' : ''} />}
            />
            <ControlButton id="control-control" checked={controls} onChange={setControls} text="controls" />
          </div>
          {/* Right side screenshot button */}
          <div className="inline-flex items-center self-stretch gap-2 flex-shrink-0">
            <ScreenshotButton editorElementRef={editorElementRef} />
          </div>
        </div>
        <Resizable className="editor-resizable">
          <Editor
            id="editor-canvas"
            ref={editorElementRef}
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
      <div className="resizable-resizer" onMouseDown={onMouseDown} style={{ cursor: 'ew-resize' }} />
    </div>
  )
}
