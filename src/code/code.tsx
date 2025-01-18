import { css } from './css'

export function CodeHeader({ title, controls = false }: { title: string; controls: boolean }) {
  if (!title && !controls) return null
  // TODO: migrate inline css
  return (
    <div data-codice-editor-header>
      {controls ? (
        <div data-codice-editor-controls>
          <span data-codice-editor-controls-close />
          <span data-codice-editor-controls-close />
          <span data-codice-editor-controls-close-maximize />
        </div>
      ) : null}
      {title ? <div data-codice-editor-title>{title}</div> : null}
    </div>
  )
}

export function Code({
  filename,
  children: code,
  controls,
}: {
  filename: string
  children: string
  controls?: boolean
}) {
  return (
    <div data-codice-code>
      <style key='codice-code-style'>{css}</style>
      <CodeHeader title={filename} controls={controls} />
      <pre>
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
    </div>
  )
}
