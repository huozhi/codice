import { css } from './css'

export function CodeHeader({ filename, controls = false }: { filename?: string; controls: boolean }) {
  if (!filename && !controls) return null
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
      {filename ? <div data-codice-editor-title>{filename}</div> : null}
      {controls ? <span data-codice-editor-controls-placeholder /> : null}
    </div>
  )
}

export function Code({
  children: code,
  filename,
  controls,
  ...props
}: {
  children: string
  filename?: string
  controls?: boolean
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} data-codice-code>
      <style key='codice-code-style'>{css}</style>
      <CodeHeader filename={filename} controls={controls} />
      <pre>
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
    </div>
  )
}
