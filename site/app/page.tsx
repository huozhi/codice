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
      <div className='titles'>
        <h1>
          <span className='huge-title'>Codice</span>
        </h1>
        <p>
          <span className='subtitle'>
            The Story of Code Presentation
          </span>
        </p>
        <div className='description'>
          <p>
            Codice is a simple code editor and code block component for React. 
            It is a zero-dependency library that provides a slim code editor and code block component. <a href='https://github.com/huozhi/codice'>Source Code ↗</a>
          </p>
          <Code className='code-install code-install--bash'>
            {`npm install codice`}
          </Code>
        </div>
      </div>

      <div className='section'>
        <h2>Editor Example</h2>
        <EditorExample searchParams={searchParams} />
      </div>

      <div className='section'>
        <h2>Code Block Examples</h2>
        <CodeExamples />
      </div>
    </div>
  )
}
