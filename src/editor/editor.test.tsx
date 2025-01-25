import { describe, expect, it } from 'vitest'
import { Editor } from '.'
import { renderToString } from 'react-dom/server'

describe('Code', () => {
  it('default props', () => {
    expect(
      renderToString(
        <Editor>test</Editor>
      )
    ).toMatchInlineSnapshot(`
      "<div data-codice-editor="true" data-codice-editor-title="" data-codice-editor-controls="false" data-codice-editor-line-numbers="false"><style data-codice-style="true">[data-codice-editor] {
        position: relative;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        scrollbar-width: none;
      }
      [data-codice-editor] code,
      [data-codice-editor] textarea {
        font-family: Consolas, Monaco, monospace;
        line-break: anywhere;
        overflow-wrap: break-word;
        scrollbar-width: none;
        padding: 24px 16px;
        font-size: 16px;
        line-height: 20px;
        caret-color: var(--codice-editor-caret-color);
        border: none;
        outline: none;
        width: 100%;
      }
      [data-codice-editor] code {
        display: inline-block;
        width: 100%;
      }
      [data-codice-editor] textarea::-webkit-scrollbar,
      [data-codice-editor] textarea:focus::-webkit-scrollbar,
      [data-codice-editor] textarea:hover::-webkit-scrollbar {
        width: 0;
      }
      [data-codice-editor] [data-codice-editor-content] {
        position: relative;
      }
      [data-codice-editor] textarea {
        resize: none;
        display: block;
        color: var(--codice-editor-text-color);
        background-color: var(--codice-editor-background-color);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        overflow: hidden;
      }
      [data-codice-editor][data-codice-editor-line-numbers="true"] textarea {
        padding-left: 55px;
      }
      </style><div data-codice-editor-header="true" data-codice-editor-header-controls="true"><style data-codice-style="true">[data-codice-editor-header] {
        position: relative;
        display: flex;
        padding: 16px 22px 8px;
        align-items: center;
      }
      [data-codice-editor-header] [data-codice-editor-title] {
        display: inline-block;
        flex: 1 0;
        text-align: center;
        line-height: 1;
      }
      [data-codice-editor-header] [data-codice-editor-controls] {
        display: inline-flex;
        align-self: center;
        justify-self: start;
        align-items: center;
        justify-content: center;
      }
      [data-codice-editor-header] [data-codice-editor-controls],
      [data-codice-editor-header] [data-codice-editor-controls-placeholder] {
        width: 52px;
      }
      [data-codice-editor-header-controls="true"] [data-codice-editor-title] {
        padding-right: 52px;
      }
      [data-codice-editor-header] [data-codice-editor-control] {
        display: flex;
        width: 10px;
        height: 10px;
        margin: 3px;
        border-radius: 50%;
        background-color: var(--codice-editor-control-color);
      }
      </style><div data-codice-editor-controls="true"><span data-codice-editor-control="true"></span><span data-codice-editor-control="true"></span><span data-codice-editor-control="true"></span></div></div><div data-codice-editor-content="true"><div data-codice-code="true"><style data-codice-style="true">[data-codice-code] {
        --codice-code-line-number-color: #a4a4a4;
        --codice-code-highlight-color: #555555;
      }
      [data-codice-code] pre {
        white-space: pre-wrap;
        margin: 0;
      }
      [data-codice-code] code {
        border: none;
      }
      [data-codice-code] .sh__line {
        display: inline-block;
        width: 100%;
      }
      [data-codice-code] .sh__line[data-highlight] {
        background-color: var(--codice-code-highlight-color);
      }
      @scope {
        code { 
          counter-reset: codice-code-line-number; 
          padding-left
        }
        [data-codice-code-line-number] {
          counter-increment: codice-code-line-number 1;
          content: counter(codice-code-line-number);
          display: inline-block;
          min-width: 24px;
          margin-right: 16px;
          text-align: right;
          user-select: none;
          color: var(--codice-code-line-number-color);
        }
      }
      </style><pre data-codice-code-content="true"><code></code></pre></div><textarea></textarea></div></div>"
    `)
  })

  it('with title', () => (
    expect(
      renderToString(
        <Editor title="file.js">test</Editor>
      )
    ).toMatchInlineSnapshot(`
      "<div data-codice-editor="true" data-codice-editor-title="file.js" data-codice-editor-controls="false" data-codice-editor-line-numbers="false"><style data-codice-style="true">[data-codice-editor] {
        position: relative;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        scrollbar-width: none;
      }
      [data-codice-editor] code,
      [data-codice-editor] textarea {
        font-family: Consolas, Monaco, monospace;
        line-break: anywhere;
        overflow-wrap: break-word;
        scrollbar-width: none;
        padding: 24px 16px;
        font-size: 16px;
        line-height: 20px;
        caret-color: var(--codice-editor-caret-color);
        border: none;
        outline: none;
        width: 100%;
      }
      [data-codice-editor] code {
        display: inline-block;
        width: 100%;
      }
      [data-codice-editor] textarea::-webkit-scrollbar,
      [data-codice-editor] textarea:focus::-webkit-scrollbar,
      [data-codice-editor] textarea:hover::-webkit-scrollbar {
        width: 0;
      }
      [data-codice-editor] [data-codice-editor-content] {
        position: relative;
      }
      [data-codice-editor] textarea {
        resize: none;
        display: block;
        color: var(--codice-editor-text-color);
        background-color: var(--codice-editor-background-color);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        overflow: hidden;
      }
      [data-codice-editor][data-codice-editor-line-numbers="true"] textarea {
        padding-left: 55px;
      }
      </style><div data-codice-editor-header="true" data-codice-editor-header-controls="true"><style data-codice-style="true">[data-codice-editor-header] {
        position: relative;
        display: flex;
        padding: 16px 22px 8px;
        align-items: center;
      }
      [data-codice-editor-header] [data-codice-editor-title] {
        display: inline-block;
        flex: 1 0;
        text-align: center;
        line-height: 1;
      }
      [data-codice-editor-header] [data-codice-editor-controls] {
        display: inline-flex;
        align-self: center;
        justify-self: start;
        align-items: center;
        justify-content: center;
      }
      [data-codice-editor-header] [data-codice-editor-controls],
      [data-codice-editor-header] [data-codice-editor-controls-placeholder] {
        width: 52px;
      }
      [data-codice-editor-header-controls="true"] [data-codice-editor-title] {
        padding-right: 52px;
      }
      [data-codice-editor-header] [data-codice-editor-control] {
        display: flex;
        width: 10px;
        height: 10px;
        margin: 3px;
        border-radius: 50%;
        background-color: var(--codice-editor-control-color);
      }
      </style><div data-codice-editor-controls="true"><span data-codice-editor-control="true"></span><span data-codice-editor-control="true"></span><span data-codice-editor-control="true"></span></div><div data-codice-editor-title="true">file.js</div></div><div data-codice-editor-content="true"><div data-codice-code="true"><style data-codice-style="true">[data-codice-code] {
        --codice-code-line-number-color: #a4a4a4;
        --codice-code-highlight-color: #555555;
      }
      [data-codice-code] pre {
        white-space: pre-wrap;
        margin: 0;
      }
      [data-codice-code] code {
        border: none;
      }
      [data-codice-code] .sh__line {
        display: inline-block;
        width: 100%;
      }
      [data-codice-code] .sh__line[data-highlight] {
        background-color: var(--codice-code-highlight-color);
      }
      @scope {
        code { 
          counter-reset: codice-code-line-number; 
          padding-left
        }
        [data-codice-code-line-number] {
          counter-increment: codice-code-line-number 1;
          content: counter(codice-code-line-number);
          display: inline-block;
          min-width: 24px;
          margin-right: 16px;
          text-align: right;
          user-select: none;
          color: var(--codice-code-line-number-color);
        }
      }
      </style><pre data-codice-code-content="true"><code></code></pre></div><textarea></textarea></div></div>"
    `)
  ))

  it('without controls and with className', () => (
    expect(
      renderToString(
        <Editor controls={false} className="editor">test</Editor>
      )
    ).toMatchInlineSnapshot(`
      "<div class="editor" data-codice-editor="true" data-codice-editor-title="" data-codice-editor-controls="false" data-codice-editor-line-numbers="false"><style data-codice-style="true">[data-codice-editor] {
        position: relative;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        scrollbar-width: none;
      }
      [data-codice-editor] code,
      [data-codice-editor] textarea {
        font-family: Consolas, Monaco, monospace;
        line-break: anywhere;
        overflow-wrap: break-word;
        scrollbar-width: none;
        padding: 24px 16px;
        font-size: 16px;
        line-height: 20px;
        caret-color: var(--codice-editor-caret-color);
        border: none;
        outline: none;
        width: 100%;
      }
      [data-codice-editor] code {
        display: inline-block;
        width: 100%;
      }
      [data-codice-editor] textarea::-webkit-scrollbar,
      [data-codice-editor] textarea:focus::-webkit-scrollbar,
      [data-codice-editor] textarea:hover::-webkit-scrollbar {
        width: 0;
      }
      [data-codice-editor] [data-codice-editor-content] {
        position: relative;
      }
      [data-codice-editor] textarea {
        resize: none;
        display: block;
        color: var(--codice-editor-text-color);
        background-color: var(--codice-editor-background-color);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        overflow: hidden;
      }
      [data-codice-editor][data-codice-editor-line-numbers="true"] textarea {
        padding-left: 55px;
      }
      </style><div data-codice-editor-content="true"><div data-codice-code="true"><style data-codice-style="true">[data-codice-code] {
        --codice-code-line-number-color: #a4a4a4;
        --codice-code-highlight-color: #555555;
      }
      [data-codice-code] pre {
        white-space: pre-wrap;
        margin: 0;
      }
      [data-codice-code] code {
        border: none;
      }
      [data-codice-code] .sh__line {
        display: inline-block;
        width: 100%;
      }
      [data-codice-code] .sh__line[data-highlight] {
        background-color: var(--codice-code-highlight-color);
      }
      @scope {
        code { 
          counter-reset: codice-code-line-number; 
          padding-left
        }
        [data-codice-code-line-number] {
          counter-increment: codice-code-line-number 1;
          content: counter(codice-code-line-number);
          display: inline-block;
          min-width: 24px;
          margin-right: 16px;
          text-align: right;
          user-select: none;
          color: var(--codice-code-line-number-color);
        }
      }
      </style><pre data-codice-code-content="true"><code></code></pre></div><textarea></textarea></div></div>"
    `)
  ))
})
