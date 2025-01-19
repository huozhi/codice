import { Editor as EditorClient } from './editor'
import { css } from './css'

export type EditorProps = React.HTMLAttributes<HTMLDivElement> & Parameters<typeof EditorClient>[0]

export function Editor(props: EditorProps) {
  const { title, value, onChange, highlight, controls, lineNumbers, ...restProps } = props
  const editorProps = { title, value, onChange, highlight, controls, lineNumbers }

  return (
    <div 
      {...restProps} 
      data-codice-editor
      // DOM attributes for selecting the stateful editor easily.
      // e.g. [data-codice-editor-line-numbers="true"]
      data-codice-editor-title={title || ''}
      data-codice-editor-controls={!!controls}
      data-codice-editor-line-numbers={!!lineNumbers}
    >
      <style data-codice-style>{css}</style>
      <EditorClient {...editorProps} />
    </div>
  )
}
