'use client'

import { Editor } from 'codice'
import { useState } from 'react'
import { highlight } from 'sugar-high'

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
        highlight={text => highlight(text)}
        onChange={(text) => setCode(text)}
      />
    </div>
  )
}

`

export default function Page() {
  const [code, setCode] = useState(defaultCode)

  return (
    <div>
      <Editor
        value={code}
        className='editor'
        highlight={text => highlight(text)}
        onChange={(text) => setCode(text)}
      />
    </div>
  )
}
