import { css } from './css'

export function CodeHeader({ title, controls = false }: { title?: string; controls: boolean }) {
  if (!title && !controls) return null
  // TODO: migrate inline css
  return (
    <div data-codice-editor-header>
      {controls ? (
        <div data-codice-editor-controls>
          <span data-codice-editor-control />
          <span data-codice-editor-control />
          <span data-codice-editor-control />
        </div>
      ) : null}
      {title ? <div data-codice-editor-title>{title}</div> : null}
      {controls ? <span data-codice-editor-controls-placeholder /> : null}
    </div>
  )
}

export function Code({
  children: code,
  title,
  controls,
  preformatted = true,
  ...props
}: {
  children: string
  /** Whether to use a preformatted block <pre><code> */
  preformatted?: boolean
  title?: string
  controls?: boolean
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} data-codice-code>
      <style key='codice-code-style'>{css}</style>
      <CodeHeader title={title} controls={controls} />
      {preformatted ? (
        <pre data-codice-code-content>
          <code dangerouslySetInnerHTML={{ __html: code }} />
        </pre>
      ) : (
        <div data-codice-code-content>{code}</div>
      )}
    </div>
  )
}
