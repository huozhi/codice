import { Editor as EditorClient } from './editor'
import { css } from './css'
import { Style } from '../style'

export type EditorProps = React.HTMLAttributes<HTMLDivElement> &
  Exclude<Parameters<typeof EditorClient>[0], 'id'> & {
    fontSize?: string | number
    fontFamily?: string
  }

export function Editor(props: EditorProps) {
  const {
    title,
    value,
    onChange,
    controls = true,
    lineNumbers = true,
    lineNumbersWidth,
    padding,
    fontSize,
    fontFamily,
    extension,
    ...restProps
  } = props
  const editorProps = { 
    title,
    value,
    onChange,
    controls,
    lineNumbers,
    lineNumbersWidth,
    padding,
    extension,
  }
  return (
    <div
      {...restProps}
      data-codice="editor"
      data-codice-editor
      // DOM attributes for selecting the stateful editor easily.
      // e.g. [data-codice-line-numbers="true"]
      data-codice-title={title || ''}
      data-codice-controls={!!controls}
      data-codice-line-numbers={!!lineNumbers}
    >
      <Style css={css({ fontSize, padding, lineNumbersWidth, fontFamily })} />
      <EditorClient {...editorProps} />
    </div>
  )
}
