import { Editor as EditorClient } from './editor'
import { css } from './css'

export type EditorProps = React.HTMLAttributes<HTMLDivElement> & Parameters<typeof EditorClient>[0]

export function Editor(props: EditorProps) {
  const { title, value, onChange, highlight, controls, ...restProps } = props
  const editorProps = { title, value, onChange, highlight, controls }
  return (
    <div {...restProps} data-codice-editor>
      <style key="codice-inline-css" dangerouslySetInnerHTML={{ __html: css }} />
      <EditorClient {...editorProps} />
    </div>
  )
}
