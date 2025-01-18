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
      "<div data-codice-editor="true"><style>
      [data-codice-editor] {
        position: relative;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        scrollbar-width: none;
      }
      [data-codice-editor] code,
      [data-codice-editor] textarea {
        overflow-wrap: break-word;
        scrollbar-width: none;
        padding: 1.5rem 2.2rem;
        font-size: 1rem;
        line-height: 1.25em;
        caret-color: var(--codice-editor-caret-color);
        border: none;
        outline: none;
        width: 100%;
        font-family: Consolas, Monaco, monospace;
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
      [data-codice-editor] textarea:focus {
        border: 1px solid rgba(226, 255, 234, 0.3);
      }
      [data-codice-editor-content] {
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
      </style><div data-codice-editor-content="true"><div data-codice-code="true"><style>
      [data-codice-code] pre {
        white-space: pre-wrap;
        margin: 0;
      }
      [data-codice-code] code {
        counter-reset: sh-line-number;
        border: none;
      }
      [data-codice-editor-header] {
        position: relative;
        display: flex;
        padding: 16px 22px 8px;
        align-items: center;
      }
      [data-codice-editor-title] {
        display: inline-block;
        flex: 1 0;
        text-align: center;
      }
      [data-codice-editor-controls] {
        display: inline-flex;
        align-self: center;
        justify-self: start;
        align-items: center;
        justify-content: center;
      }
      [data-codice-editor-controls],
      [data-codice-editor-controls-placeholder] {
        width: 52px;
      }
      [data-codice-editor-control] {
        display: flex;
        width: 11px;
        height: 11px;
        margin: 3px;
        border-radius: 50%;
        background-color: var(--codice-editor-control-color);
      }
      </style><div data-codice-editor-header="true"><div data-codice-editor-controls="true"><span data-codice-editor-control="true"></span><span data-codice-editor-control="true"></span><span data-codice-editor-control="true"></span></div><span data-codice-editor-controls-placeholder="true"></span></div><pre data-codice-code-content="true"><code></code></pre></div><textarea></textarea></div></div>"
    `)
  })

  it('with title', () => (
    expect(
      renderToString(
        <Editor title="file.js">test</Editor>
      )
    ).toMatchInlineSnapshot(`
      "<div data-codice-editor="true"><style>
      [data-codice-editor] {
        position: relative;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        scrollbar-width: none;
      }
      [data-codice-editor] code,
      [data-codice-editor] textarea {
        overflow-wrap: break-word;
        scrollbar-width: none;
        padding: 1.5rem 2.2rem;
        font-size: 1rem;
        line-height: 1.25em;
        caret-color: var(--codice-editor-caret-color);
        border: none;
        outline: none;
        width: 100%;
        font-family: Consolas, Monaco, monospace;
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
      [data-codice-editor] textarea:focus {
        border: 1px solid rgba(226, 255, 234, 0.3);
      }
      [data-codice-editor-content] {
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
      </style><div data-codice-editor-header="true"><div data-codice-editor-title="true">file.js</div></div><div data-codice-editor-content="true"><div data-codice-code="true"><style>
      [data-codice-code] pre {
        white-space: pre-wrap;
        margin: 0;
      }
      [data-codice-code] code {
        counter-reset: sh-line-number;
        border: none;
      }
      [data-codice-editor-header] {
        position: relative;
        display: flex;
        padding: 16px 22px 8px;
        align-items: center;
      }
      [data-codice-editor-title] {
        display: inline-block;
        flex: 1 0;
        text-align: center;
      }
      [data-codice-editor-controls] {
        display: inline-flex;
        align-self: center;
        justify-self: start;
        align-items: center;
        justify-content: center;
      }
      [data-codice-editor-controls],
      [data-codice-editor-controls-placeholder] {
        width: 52px;
      }
      [data-codice-editor-control] {
        display: flex;
        width: 11px;
        height: 11px;
        margin: 3px;
        border-radius: 50%;
        background-color: var(--codice-editor-control-color);
      }
      </style><div data-codice-editor-header="true"><div data-codice-editor-controls="true"><span data-codice-editor-control="true"></span><span data-codice-editor-control="true"></span><span data-codice-editor-control="true"></span></div><span data-codice-editor-controls-placeholder="true"></span></div><pre data-codice-code-content="true"><code></code></pre></div><textarea></textarea></div></div>"
    `)
  ))

  it('without controls and with className', () => (
    expect(
      renderToString(
        <Editor controls={false} className="editor">test</Editor>
      )
    ).toMatchInlineSnapshot(`
      "<div class="editor" data-codice-editor="true"><style>
      [data-codice-editor] {
        position: relative;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        scrollbar-width: none;
      }
      [data-codice-editor] code,
      [data-codice-editor] textarea {
        overflow-wrap: break-word;
        scrollbar-width: none;
        padding: 1.5rem 2.2rem;
        font-size: 1rem;
        line-height: 1.25em;
        caret-color: var(--codice-editor-caret-color);
        border: none;
        outline: none;
        width: 100%;
        font-family: Consolas, Monaco, monospace;
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
      [data-codice-editor] textarea:focus {
        border: 1px solid rgba(226, 255, 234, 0.3);
      }
      [data-codice-editor-content] {
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
      </style><div data-codice-editor-content="true"><div data-codice-code="true"><style>
      [data-codice-code] pre {
        white-space: pre-wrap;
        margin: 0;
      }
      [data-codice-code] code {
        counter-reset: sh-line-number;
        border: none;
      }
      [data-codice-editor-header] {
        position: relative;
        display: flex;
        padding: 16px 22px 8px;
        align-items: center;
      }
      [data-codice-editor-title] {
        display: inline-block;
        flex: 1 0;
        text-align: center;
      }
      [data-codice-editor-controls] {
        display: inline-flex;
        align-self: center;
        justify-self: start;
        align-items: center;
        justify-content: center;
      }
      [data-codice-editor-controls],
      [data-codice-editor-controls-placeholder] {
        width: 52px;
      }
      [data-codice-editor-control] {
        display: flex;
        width: 11px;
        height: 11px;
        margin: 3px;
        border-radius: 50%;
        background-color: var(--codice-editor-control-color);
      }
      </style><pre data-codice-code-content="true"><code></code></pre></div><textarea></textarea></div></div>"
    `)
  ))
})
