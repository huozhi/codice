'use client'

import { Editor } from 'codice'
import { EditorConfig } from './page'
import './studio.css'

interface EditorManagerProps {
  editor: EditorConfig
  onUpdate: (updates: Partial<EditorConfig>) => void
  editorRef: (el: HTMLDivElement | null) => void
  onTakeScreenshot: () => void
}

export function EditorManager({ editor, onUpdate, editorRef, onTakeScreenshot }: EditorManagerProps) {
  return (
    <div className="editor-manager">
      <div className="editor-wrapper">
        <div className="editor-controls">
          <div className="editor-setting-toggle">
            <label className="control-button">
              <input
                type="checkbox"
                checked={editor.lineNumbers ?? true}
                onChange={(e) => onUpdate({ lineNumbers: e.target.checked })}
                style={{ display: 'none' }}
              />
              <span className="controls-manager-label">{editor.lineNumbers ? '✓' : '𐄂'}{' line numbers'}</span>
            </label>
          </div>
          <button onClick={onTakeScreenshot} className="control-button">
            Screenshot
          </button>
        </div>
        <div className="editor-preview" ref={editorRef}>
          <Editor
            title={editor.title}
            value={editor.code}
            fontSize={editor.fontSize}
            fontFamily={editor.fontFamily}
            padding={editor.padding}
            lineNumbersWidth={editor.lineNumbersWidth}
            lineNumbers={editor.lineNumbers}
            onChange={(code) => onUpdate({ code })}
            onChangeTitle={(title) => onUpdate({ title })}
            className="editor-preview-editor"
          />
        </div>
      </div>
    </div>
  )
}

