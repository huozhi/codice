'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../theme'
import './studio.css'

interface Screenshot {
  id: string
  dataUrl: string
  x: number
  y: number
  width: number
  height: number
}

interface CanvasViewProps {
  screenshots: Screenshot[]
  onUpdateScreenshots: (screenshots: Screenshot[]) => void
}

export function CanvasView({ screenshots, onUpdateScreenshots }: CanvasViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, setTheme } = useTheme()
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeHandle, setResizeHandle] = useState<'se' | 'sw' | 'ne' | 'nw' | null>(null)
  const [loadedImages, setLoadedImages] = useState<Record<string, HTMLImageElement>>({})
  const [cursor, setCursor] = useState<string>('default')
  const [canvasBgColor, setCanvasBgColor] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const theme = document.documentElement.getAttribute('data-theme')
      return theme === 'light' ? '#ffffff' : '#1a1a1a'
    }
    return '#1a1a1a'
  })
  const [showColorPicker, setShowColorPicker] = useState(false)

  useEffect(() => {
    const updateCanvasColor = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      if (theme === 'light' && canvasBgColor === '#1a1a1a') {
        setCanvasBgColor('#ffffff')
      } else if (theme === 'dark' && canvasBgColor === '#ffffff') {
        setCanvasBgColor('#1a1a1a')
      }
    }

    const observer = new MutationObserver(updateCanvasColor)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [canvasBgColor])

  const CANVAS_WIDTH = 800
  const CANVAS_HEIGHT = 600

  // Load images when screenshots change
  useEffect(() => {
    screenshots.forEach((screenshot) => {
      if (!loadedImages[screenshot.id]) {
        const img = new Image()
        img.src = screenshot.dataUrl
        img.onload = () => {
          setLoadedImages((prev) => ({ ...prev, [screenshot.id]: img }))
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenshots])

  useEffect(() => {
    setupCanvas()
  }, [])

  useEffect(() => {
    drawCanvas()
  }, [screenshots, selectedScreenshot, loadedImages, canvasBgColor])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const wrapper = document.querySelector('.canvas-color-picker-wrapper')
      if (showColorPicker && wrapper && !wrapper.contains(target)) {
        setShowColorPicker(false)
      }
    }

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showColorPicker])

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1

    // Set actual size in memory (scaled for DPI)
    canvas.width = CANVAS_WIDTH * dpr
    canvas.height = CANVAS_HEIGHT * dpr

    // Scale the canvas back down using CSS
    canvas.style.width = `${CANVAS_WIDTH}px`
    canvas.style.height = `${CANVAS_HEIGHT}px`

    // Set up the context scale once
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
    }
  }

  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = canvasBgColor
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.lineWidth = 1
    for (let x = 0; x <= CANVAS_WIDTH; x += 20) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, CANVAS_HEIGHT)
      ctx.stroke()
    }
    for (let y = 0; y <= CANVAS_HEIGHT; y += 20) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(CANVAS_WIDTH, y)
      ctx.stroke()
    }

    // Draw screenshots
    screenshots.forEach((screenshot) => {
      const img = loadedImages[screenshot.id]
      if (img) {
        ctx.drawImage(img, screenshot.x, screenshot.y, screenshot.width, screenshot.height)

        // Draw delete button on top right corner (centered with corner)
        const deleteBtnSize = 16
        const deleteBtnX = screenshot.x + screenshot.width
        const deleteBtnY = screenshot.y

        // Background circle - more subtle
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
        ctx.beginPath()
        ctx.arc(deleteBtnX, deleteBtnY, deleteBtnSize / 2, 0, Math.PI * 2)
        ctx.fill()

        // X mark - subtle gray
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(deleteBtnX - 5, deleteBtnY - 5)
        ctx.lineTo(deleteBtnX + 5, deleteBtnY + 5)
        ctx.moveTo(deleteBtnX + 5, deleteBtnY - 5)
        ctx.lineTo(deleteBtnX - 5, deleteBtnY + 5)
        ctx.stroke()

        // Draw selection border if selected
        if (selectedScreenshot === screenshot.id) {
          ctx.strokeStyle = '#f47067'
          ctx.lineWidth = 2
          ctx.setLineDash([5, 5])
          ctx.strokeRect(screenshot.x, screenshot.y, screenshot.width, screenshot.height)
          ctx.setLineDash([])

          // Draw resize handles
          const handleSize = 8
          const handles = [
            { x: screenshot.x + screenshot.width, y: screenshot.y + screenshot.height, type: 'se' },
            { x: screenshot.x, y: screenshot.y + screenshot.height, type: 'sw' },
            { x: screenshot.x + screenshot.width, y: screenshot.y, type: 'ne' },
            { x: screenshot.x, y: screenshot.y, type: 'nw' },
          ]

          handles.forEach((handle) => {
            ctx.fillStyle = '#f47067'
            ctx.fillRect(handle.x - handleSize / 2, handle.y - handleSize / 2, handleSize, handleSize)
          })
        }
      }
    })
  }

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const getScreenshotAt = (x: number, y: number): Screenshot | null => {
    for (let i = screenshots.length - 1; i >= 0; i--) {
      const s = screenshots[i]
      if (x >= s.x && x <= s.x + s.width && y >= s.y && y <= s.y + s.height) {
        return s
      }
    }
    return null
  }

  const getResizeHandle = (screenshot: Screenshot, x: number, y: number): 'se' | 'sw' | 'ne' | 'nw' | null => {
    const handleSize = 8
    const handles = [
      { x: screenshot.x + screenshot.width, y: screenshot.y + screenshot.height, type: 'se' as const },
      { x: screenshot.x, y: screenshot.y + screenshot.height, type: 'sw' as const },
      { x: screenshot.x + screenshot.width, y: screenshot.y, type: 'ne' as const },
      { x: screenshot.x, y: screenshot.y, type: 'nw' as const },
    ]

    for (const handle of handles) {
      if (
        x >= handle.x - handleSize / 2 &&
        x <= handle.x + handleSize / 2 &&
        y >= handle.y - handleSize / 2 &&
        y <= handle.y + handleSize / 2
      ) {
        return handle.type
      }
    }
    return null
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e)

    // Check if clicking on delete button
    const screenshot = getScreenshotAt(pos.x, pos.y)
    if (screenshot) {
      const deleteBtnSize = 16
      const deleteBtnX = screenshot.x + screenshot.width
      const deleteBtnY = screenshot.y
      const distance = Math.sqrt(Math.pow(pos.x - deleteBtnX, 2) + Math.pow(pos.y - deleteBtnY, 2))

      if (distance <= deleteBtnSize / 2) {
        onUpdateScreenshots(screenshots.filter((s) => s.id !== screenshot.id))
        setSelectedScreenshot(null)
        return
      }
    }

    if (screenshot) {
      const handle = getResizeHandle(screenshot, pos.x, pos.y)
      if (handle) {
        setIsResizing(true)
        setResizeHandle(handle)
        setSelectedScreenshot(screenshot.id)
      } else {
        setIsDragging(true)
        setSelectedScreenshot(screenshot.id)
      }
      setDragStart({ x: pos.x - screenshot.x, y: pos.y - screenshot.y })
    } else {
      setSelectedScreenshot(null)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e)

    // Update cursor if not dragging/resizing
    if (!isDragging && !isResizing) {
      const screenshot = getScreenshotAt(pos.x, pos.y)
      if (screenshot) {
        const handle = getResizeHandle(screenshot, pos.x, pos.y)
        if (handle) {
          const cursors = { se: 'se-resize', sw: 'sw-resize', ne: 'ne-resize', nw: 'nw-resize' }
          setCursor(cursors[handle])
        } else {
          setCursor('grab')
        }
      } else {
        setCursor('default')
      }
    }

    if (isDragging && selectedScreenshot) {
      const screenshot = screenshots.find((s) => s.id === selectedScreenshot)
      if (screenshot) {
        const newX = Math.max(0, Math.min(CANVAS_WIDTH - screenshot.width, pos.x - dragStart.x))
        const newY = Math.max(0, Math.min(CANVAS_HEIGHT - screenshot.height, pos.y - dragStart.y))
        onUpdateScreenshots(
          screenshots.map((s) => (s.id === selectedScreenshot ? { ...s, x: newX, y: newY } : s))
        )
      }
    } else if (isResizing && selectedScreenshot && resizeHandle) {
      const screenshot = screenshots.find((s) => s.id === selectedScreenshot)
      if (screenshot) {
        let newX = screenshot.x
        let newY = screenshot.y
        let newWidth = screenshot.width
        let newHeight = screenshot.height

        if (resizeHandle === 'se') {
          newWidth = Math.max(50, Math.min(CANVAS_WIDTH - screenshot.x, pos.x - screenshot.x))
          newHeight = Math.max(50, Math.min(CANVAS_HEIGHT - screenshot.y, pos.y - screenshot.y))
        } else if (resizeHandle === 'sw') {
          const deltaX = screenshot.x - pos.x
          newX = Math.max(0, pos.x)
          newWidth = Math.max(50, screenshot.width + deltaX)
          newHeight = Math.max(50, Math.min(CANVAS_HEIGHT - screenshot.y, pos.y - screenshot.y))
        } else if (resizeHandle === 'ne') {
          newWidth = Math.max(50, Math.min(CANVAS_WIDTH - screenshot.x, pos.x - screenshot.x))
          const deltaY = screenshot.y - pos.y
          newY = Math.max(0, pos.y)
          newHeight = Math.max(50, screenshot.height + deltaY)
        } else if (resizeHandle === 'nw') {
          const deltaX = screenshot.x - pos.x
          const deltaY = screenshot.y - pos.y
          newX = Math.max(0, pos.x)
          newY = Math.max(0, pos.y)
          newWidth = Math.max(50, screenshot.width + deltaX)
          newHeight = Math.max(50, screenshot.height + deltaY)
        }

        onUpdateScreenshots(
          screenshots.map((s) =>
            s.id === selectedScreenshot ? { ...s, x: newX, y: newY, width: newWidth, height: newHeight } : s
          )
        )
      }
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
    setResizeHandle(null)
  }

  const copyCanvasAsImage = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const dataUrl = canvas.toDataURL('image/png')
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': new Blob([await fetch(dataUrl).then((r) => r.blob())], { type: 'image/png' }),
        }),
      ])
      alert('Canvas copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy canvas:', error)
      // Fallback: download the image
      const link = document.createElement('a')
      link.download = 'canvas.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }


  return (
    <div className="canvas-view">
      <div className="canvas-toolbar">
        <div className="canvas-actions">
          <div className="canvas-color-picker-wrapper">
            <div
              className="canvas-bg-indicator"
              onClick={() => setShowColorPicker(!showColorPicker)}
              style={{ backgroundColor: canvasBgColor }}
            />
            {showColorPicker && (
              <div
                className="canvas-color-picker"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <input
                  type="color"
                  value={canvasBgColor}
                  onChange={(e) => {
                    setCanvasBgColor(e.target.value)
                  }}
                  className="canvas-color-input"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="canvas-color-presets">
                  <div
                    className="canvas-color-preset"
                    style={{ backgroundColor: '#1a1a1a' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCanvasBgColor('#1a1a1a')
                      setShowColorPicker(false)
                    }}
                  />
                  <div
                    className="canvas-color-preset"
                    style={{ backgroundColor: '#ffffff' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCanvasBgColor('#ffffff')
                      setShowColorPicker(false)
                    }}
                  />
                  <div
                    className="canvas-color-preset"
                    style={{ backgroundColor: '#f5f5f5' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCanvasBgColor('#f5f5f5')
                      setShowColorPicker(false)
                    }}
                  />
                  <div
                    className="canvas-color-preset"
                    style={{ backgroundColor: '#000000' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCanvasBgColor('#000000')
                      setShowColorPicker(false)
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="canvas-theme-toggle"
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            style={{
              backgroundColor: theme === 'dark' ? '#ffffff' : '#1a1a1a'
            }}
          />
          <button onClick={copyCanvasAsImage} className="control-button">
            Copy
          </button>
        </div>
      </div>

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            handleMouseUp()
            setCursor('default')
          }}
          style={{
            cursor: isDragging || isResizing ? 'grabbing' : cursor,
            width: `${CANVAS_WIDTH}px`,
            height: `${CANVAS_HEIGHT}px`,
          }}
        />
      </div>
    </div>
  )
}

