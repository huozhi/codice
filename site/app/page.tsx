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
      <a className='absolute top-4 right-4' href='https://github.com/huozhi/codice'>Source Code ↗</a>
      <div className='titles'>
        <h1>
          <span className='huge-title'>Codice</span>
        </h1>
        <p>
          <span className='subtitle'>
            The Story of Code Presentation
          </span>
        </p>
        <p className='mt-[2rem]'>
          Codice is a simple code editor and code block component for React. 
          It is a zero-dependency library that provides a slim code editor and code block component.
        </p>

        <Code className='mt-[1rem] rounded-lg code-install--bash'>
          {`npm install codice`}
        </Code>
      </div>

      <div className='section'>
        <h2>{`<Editor />`}</h2>
        <EditorExample searchParams={searchParams} />
      </div>

      <div className='section'>
        <h2>{`<Code />`}</h2>
        <CodeExamples />
      </div>

      <div className='my-[2rem]'>
        
      </div>
    </div>
  )
}
