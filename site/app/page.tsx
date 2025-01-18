import { EditorExample } from './editor-example'
import { CodeExamples } from './code-example'
import { Code } from 'codice'

export default async function Page(props) {
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
            Codice is a simple code editor and code block component for React. It is a zero-dependency library that provides a simple and easy-to-use code editor and code block component.
          </p>
          <Code className='code code--default'>
            {`npm install codice`}
          </Code>
        </div>
      </div>

      <div className='section'>
        <h2>Editor Examples</h2>
        <EditorExample searchParams={searchParams} />
      </div>

      <div className='section'>
        <h2>Code Block Examples</h2>
        <CodeExamples />
      </div>
    </div>
  )
}
