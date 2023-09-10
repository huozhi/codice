'use client'

import { Editor } from 'codice'
import { useState } from 'react'
import { highlight } from 'sugar-high'
import { useSearchParams } from 'next/navigation'

const CODE_QUERY_KEY = 'c'

const defaultCode = `\
import { useState } from 'react'
import { highlight } from 'sugar-high'
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
        highlight={text => highlight(text)}
        onChange={(text) => setCode(text)}
      />
    </div>
  )
}

`

export default function Page() {
  const searchParams = useSearchParams()
  const codeQuery = searchParams.get(CODE_QUERY_KEY)
  const initialCode = codeQuery ? atob(codeQuery) : defaultCode
  const [code, setCode] = useState(initialCode)

  return (
    <div>
      <Editor
        value={code}
        className='editor'
        title='index.js'
        highlight={text => highlight(text)}
        onChange={(text) => setCode(text)}
      />
    </div>
  )
}
