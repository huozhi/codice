'use client'

import { useState } from 'react'
import { highlight } from 'sugar-high'
import { Editor } from 'codice'

const defaultCode = `\
import { useState } from 'react'
import { highlight } from 'sugar-high'
import { Editor } from 'codice'

export default function Page() {
  const [files, setFiles] = useState({
    'index.js': defaultCode,
  })

  return (
    <div>
      <Editor
        highlight={highlight}
        className='editor'
        value={files['index.js']}
        onChange={(code) => {
          setFiles({
            ['index.js']: code,
          })
        }}
      />
    </div>
  )
}

`

export default function Page() {
  const [files, setFiles] = useState({
    'index.js': defaultCode,
  })

  return (
    <div>
      <Editor
        highlight={highlight}
        className='editor'
        value={files['index.js']}
        onChange={(code) => {
          setFiles({
            ['index.js']: code,
          })
        }}
      />
    </div>
  )
}
