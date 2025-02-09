import { Editor as EditorClient } from './editor'
import { css } from './css'

export type EditorProps = React.HTMLAttributes<HTMLDivElement> 
  & Parameters<typeof EditorClient>[0]

export function Editor(props: EditorProps) {
  const { 
    title, 
    value, 
    onChange, 
    controls = true, 
    lineNumbers = true,
    fontSize,
    ...restProps
  } = props
  const editorProps = { title, value, onChange, controls, lineNumbers, fontSize }

  return (
    <div 
      {...restProps} 
      data-codice="editor"
      // DOM attributes for selecting the stateful editor easily.
      // e.g. [data-codice-line-numbers="true"]
      data-codice-title={title || ''}
      data-codice-controls={!!controls}
      data-codice-line-numbers={!!lineNumbers}
    >
      <style data-codice-style>
        {css}
      </style>
      <EditorClient {...editorProps} />
    </div>
  )
}
