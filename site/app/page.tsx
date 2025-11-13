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
          <span className="huge-title">Codice<span className="cursor-blink">_</span></span>
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
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300/40">
                    <th className="text-left py-2 px-3 font-semibold">Variable</th>
                    <th className="text-left py-2 px-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300/40">
                    <td className="py-2 px-3 whitespace-nowrap">
                      <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-text-color</code>
                    </td>
                    <td className="py-2 px-3">Editor text color (default: transparent)</td>
                  </tr>
                  <tr className="border-b border-gray-300/40">
                    <td className="py-2 px-3 whitespace-nowrap">
                      <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-background-color</code>
                    </td>
                    <td className="py-2 px-3">Editor background color (default: transparent)</td>
                  </tr>
                  <tr className="border-b border-gray-300/40">
                    <td className="py-2 px-3 whitespace-nowrap">
                      <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-caret-color</code>
                    </td>
                    <td className="py-2 px-3">Text cursor color (default: inherit)</td>
                  </tr>
                  <tr className="border-b border-gray-300/40">
                    <td className="py-2 px-3 whitespace-nowrap">
                      <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-font-family</code>
                    </td>
                    <td className="py-2 px-3">Code font family (default: Consolas, Monaco, monospace)</td>
                  </tr>
                  <tr className="border-b border-gray-300/40">
                    <td className="py-2 px-3 whitespace-nowrap">
                      <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-font-size</code>
                    </td>
                    <td className="py-2 px-3">Font size (default: inherit)</td>
                  </tr>
                  <tr className="border-b border-gray-300/40">
                    <td className="py-2 px-3 whitespace-nowrap">
                      <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-code-padding</code>
                    </td>
                    <td className="py-2 px-3">Content padding (default: 1rem)</td>
                  </tr>
                  <tr className="border-b border-gray-300/40">
                    <td className="py-2 px-3 whitespace-nowrap">
                      <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-code-line-number-width</code>
                    </td>
                    <td className="py-2 px-3">Line numbers column width (default: 2.5rem)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">UI Controls Variables</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300/40">
                    <th className="text-left py-2 px-3 font-semibold">Variable</th>
                    <th className="text-left py-2 px-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300/40">
                    <td className="py-2 px-3 whitespace-nowrap">
                      <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-control-color</code>
                    </td>
                    <td className="py-2 px-3">Control dots and UI elements color</td>
                  </tr>
                  <tr className="border-b border-gray-300/40">
                    <td className="py-2 px-3 whitespace-nowrap">
                      <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-title-color</code>
                    </td>
                    <td className="py-2 px-3">Title text color</td>
                  </tr>
                  <tr className="border-b border-gray-300/40">
                    <td className="py-2 px-3 whitespace-nowrap">
                      <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-code-line-number-color</code>
                    </td>
                    <td className="py-2 px-3">Line numbers color</td>
                  </tr>
                  <tr className="border-b border-gray-300/40">
                    <td className="py-2 px-3 whitespace-nowrap">
                      <code className="text-xs bg-[var(--control-bg-color)] px-2 py-1 rounded">--codice-code-highlight-color</code>
                    </td>
                    <td className="py-2 px-3">Highlighted lines background</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
