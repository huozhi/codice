'use client'

import { Editor } from 'codice'
import { useState } from 'react'
import { highlight } from 'sugar-high'

const CODE_QUERY_KEY = 'c'

export function LiveEditor({
  searchParams,
  defaultCode,
}: {
  searchParams: Record<string, string>
  defaultCode: string
}) {
  const codeQuery = searchParams[CODE_QUERY_KEY]
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

