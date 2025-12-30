'use client'

import { useState, useRef, useEffect } from 'react'
import { EditorManager } from './editor-manager'
import { CanvasView } from './canvas-view'
import './studio.css'

export interface EditorConfig {
  id: string
  title: string
  code: string
  fontSize?: string | number
  fontFamily?: string
  padding?: string
  lineNumbersWidth?: string
  lineNumbers?: boolean
}

export default function StudioPage() {
  const [editors, setEditors] = useState<EditorConfig[]>([
    {
      id: '1',
      title: 'example.js',
      code: `function hello() {
  console.log('Hello, World!')
}`,
      fontSize: 14,
      fontFamily: 'Consolas, Monaco, monospace',
      padding: '1rem',
      lineNumbersWidth: '2.5rem',
      lineNumbers: true,
    },
  ])
  const [selectedEditorId, setSelectedEditorId] = useState<string>('1')
  const [screenshots, setScreenshots] = useState<Array<{ id: string; dataUrl: string; x: number; y: number; width: number; height: number }>>([])
  const editorRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [animatingScreenshot, setAnimatingScreenshot] = useState<{
    dataUrl: string
    startX: number
    startY: number
    endX: number
    endY: number
    width: number
    height: number
  } | null>(null)
  const [editorPanelWidth, setEditorPanelWidth] = useState<number>(640)
  const [isResizingPanel, setIsResizingPanel] = useState(false)

  const selectedEditor = editors.find((e) => e.id === selectedEditorId) || editors[0]

  useEffect(() => {
    document.body.classList.add('studio-page')
    return () => {
      document.body.classList.remove('studio-page')
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingPanel) {
        const newWidth = Math.min(640, Math.max(300, e.clientX - 60)) // 60px is sidebar width
        setEditorPanelWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizingPanel(false)
    }

    if (isResizingPanel) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizingPanel])

  const updateEditor = (id: string, updates: Partial<EditorConfig>) => {
    setEditors((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)))
  }

  const addEditor = () => {
    const newId = String(Date.now())
    const defaultTitle = `file-${editors.length + 1}.js`
    const newEditor: EditorConfig = {
      id: newId,
      title: defaultTitle,
      code: '// <code>',
      fontSize: 14,
      fontFamily: 'Consolas, Monaco, monospace',
      padding: '1rem',
      lineNumbersWidth: '2.5rem',
      lineNumbers: true,
    }
    setEditors((prev) => [...prev, newEditor])
    setSelectedEditorId(newId)

    // Focus the title input after a short delay to ensure it's rendered
    setTimeout(() => {
      const editorElement = editorRefs.current[newId]
      if (editorElement) {
        const titleInput = editorElement.querySelector(`[data-codice-title]`) as HTMLInputElement
        if (titleInput && titleInput instanceof HTMLInputElement) {
          titleInput.focus()
          if (typeof titleInput.select === 'function') {
            titleInput.select()
          } else {
            // Fallback for browsers that don't support select()
            titleInput.setSelectionRange(0, titleInput.value.length)
          }
        }
      }
    }, 100)
  }

  const deleteEditor = (id: string) => {
    setEditors((prev) => prev.filter((e) => e.id !== id))
    if (selectedEditorId === id && editors.length > 1) {
      const remaining = editors.filter((e) => e.id !== id)
      setSelectedEditorId(remaining[0]?.id || '')
    }
  }

  const takeScreenshot = async () => {
    const editorElement = editorRefs.current[selectedEditorId]
    if (!editorElement) return

    try {
      // Get editor position for animation
      const rect = editorElement.getBoundingClientRect()
      const canvasPanel = document.querySelector('.studio-canvas-panel')
      const canvasRect = canvasPanel?.getBoundingClientRect()

      // Dynamic import to avoid SSR issues
      const { toPng } = await import('html-to-image')
      const dataUrl = await toPng(editorElement, {
        backgroundColor: 'transparent',
        pixelRatio: 4,
        quality: 1,
      })

      const img = new Image()
      img.src = dataUrl
      await new Promise((resolve) => {
        img.onload = resolve
      })

      const screenshotId = `screenshot-${Date.now()}`
      const newScreenshot = {
        id: screenshotId,
        dataUrl,
        x: 100 + screenshots.length * 20,
        y: 100 + screenshots.length * 20,
        width: img.width / 4, // Divide by 4 because pixelRatio is 4
        height: img.height / 4,
      }

      // Trigger animation
      if (canvasRect) {
        setAnimatingScreenshot({
          dataUrl,
          startX: rect.left + rect.width / 2,
          startY: rect.top + rect.height / 2,
          endX: canvasRect.left + newScreenshot.x + newScreenshot.width / 2,
          endY: canvasRect.top + newScreenshot.y + newScreenshot.height / 2,
          width: newScreenshot.width,
          height: newScreenshot.height,
        })

        // Add screenshot after animation completes
        setTimeout(() => {
          setScreenshots((prev) => [...prev, newScreenshot])
          setAnimatingScreenshot(null)
        }, 600) // Match animation duration
      } else {
        setScreenshots((prev) => [...prev, newScreenshot])
      }
    } catch (error) {
      console.error('Failed to take screenshot:', error)
    }
  }

  return (
    <div className="studio-container">
      <div className="studio-sidebar">

        <div className="studio-editor-list">
          {editors.map((editor) => (
            <div
              key={editor.id}
              className={`studio-editor-item ${selectedEditorId === editor.id ? 'active' : ''}`}
              onClick={() => setSelectedEditorId(editor.id)}
              title={editor.title}
            >
              <div className="studio-editor-dot" />
              {editors.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteEditor(editor.id)
                  }}
                  className="studio-btn-close"
                >
                  -
                </button>
              )}
            </div>
          ))}
          <button onClick={addEditor} className="studio-add-button">
            +
          </button>
        </div>
      </div>

      <div className="studio-main">
        <div className="studio-content">
          <div
            className="studio-editor-panel"
            style={{ width: `${editorPanelWidth}px` }}
          >
            <EditorManager
              editor={selectedEditor}
              onUpdate={(updates) => updateEditor(selectedEditorId, updates)}
              editorRef={(el) => {
                editorRefs.current[selectedEditorId] = el
              }}
              onTakeScreenshot={takeScreenshot}
            />
          </div>
          <div
            className="studio-resize-handle"
            onMouseDown={(e) => {
              setIsResizingPanel(true)
              e.preventDefault()
            }}
          />
          <div className="studio-canvas-panel">
            <CanvasView screenshots={screenshots} onUpdateScreenshots={setScreenshots} />
          </div>
        </div>
      </div>

      {animatingScreenshot && (
        <div
          className="screenshot-animation"
          style={{
            '--start-x': `${animatingScreenshot.startX}px`,
            '--start-y': `${animatingScreenshot.startY}px`,
            '--end-x': `${animatingScreenshot.endX}px`,
            '--end-y': `${animatingScreenshot.endY}px`,
            '--width': `${animatingScreenshot.width}px`,
            '--height': `${animatingScreenshot.height}px`,
          } as React.CSSProperties}
        >
          <img src={animatingScreenshot.dataUrl} alt="Screenshot" />
        </div>
      )}
    </div>
  )
}

