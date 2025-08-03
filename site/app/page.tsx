import { EditorExample } from './editor-example'
import { CodeExamples } from './code-example'
import { Code } from 'codice'

type SearchParams = {
  c?: string // default code
}

export default async function Page(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams

  return (
    <div>
      <a className="absolute top-4 right-4" href="https://github.com/huozhi/codice">
        Source Code ↗
      </a>
      <div className="titles">
        <h1>
          <span className="huge-title">Codice</span>
        </h1>
        <p>
          <span className="subtitle">The Story of Code Presentation</span>
        </p>
        <p className="mt-[2rem]">
          Codice is a simple code editor and code block component for React.
          It is a zero-dependency library that provides a slim code editor and code block component.
        </p>

        <Code className="mt-[1rem] rounded-lg code-install--bash">{`npm install codice`}</Code>
      </div>

      <div className="section">
        <h2>{`<Editor />`}</h2>
        <EditorExample searchParams={searchParams} />
      </div>

      <div className="section">
        <h2>{`<Code />`}</h2>
        <CodeExamples />
      </div>

      <div className="section">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Core Editor Variables</h3>
            <div className="space-y-2 text-sm">
              <div>
                <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-text-color</code> - Editor text color
                (default: transparent)
              </div>
              <div>
                <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-background-color</code> - Editor
                background color (default: transparent)
              </div>
              <div>
                <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-caret-color</code> - Text cursor color
                (default: inherit)
              </div>
              <div>
                <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-font-family</code> - Code font family
                (default: Consolas, Monaco, monospace)
              </div>
              <div>
                <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-font-size</code> - Font size (default:
                inherit)
              </div>
              <div>
                <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-code-padding</code> - Content padding
                (default: 1rem)
              </div>
              <div>
                <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-code-line-number-width</code> - Line
                numbers column width (default: 2.5rem)
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">UI Controls Variables</h3>
            <div className="space-y-2 text-sm">
              <div>
                <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-control-color</code> - Control dots and
                UI elements color
              </div>
              <div>
                <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-title-color</code> - Title text color
              </div>
              <div>
                <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-code-line-number-color</code> - Line
                numbers color
              </div>
              <div>
                <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-code-highlight-color</code> -
                Highlighted lines background
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
