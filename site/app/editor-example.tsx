import { LiveEditor } from './live-editor'

const defaultCode = `\
import { useState } from 'react'
import { Editor } from 'codice'

const defaultText = 'console.log("hello world")'

export default function Page() {
  const [code, setCode] = useState(defaultText)

  return (
    <div>
      <Editor
        value={code}
        className='editor'
        title='index.js'
        onChange={(text) => setCode(text)}
      />
    </div>
  )
}
`

export function EditorExample({ searchParams } : { searchParams: { c?: string } }) {
  return (
    <LiveEditor searchParams={searchParams} defaultCode={defaultCode} />
  )
}
