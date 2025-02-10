import { Editor as EditorClient } from './editor'
import { css } from './css'
import { Style } from '../style'
import { useId } from 'react'

export type EditorProps = React.HTMLAttributes<HTMLDivElement> 
  & Exclude<Parameters<typeof EditorClient>[0], 'id'>
  & {
    fontSize?: string | number
  }

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
  const editorProps = { title, value, onChange, controls, lineNumbers }
  const id = useId()
    .replace(':', '_')
    .replace(/[0-9]/g, (match) => String.fromCharCode(65 + Number(match)))
  return (
    <div 
      {...restProps} 
      data-codice="editor"
      data-codice-editor={id}
      // DOM attributes for selecting the stateful editor easily.
      // e.g. [data-codice-line-numbers="true"]
      data-codice-title={title || ''}
      data-codice-controls={!!controls}
      data-codice-line-numbers={!!lineNumbers}
    >
      <Style css={css(id, { fontSize })} />
      <EditorClient {...editorProps} id={id} />
    </div>
  )
}
