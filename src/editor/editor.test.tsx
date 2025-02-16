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
      "<div data-codice="editor" data-codice-editor="_RA:" data-codice-title="" data-codice-controls="true" data-codice-line-numbers="true"><style data-codice-style="true">[data-codice-editor="_RA:"] {
        --codice-text-color: transparent;
        --codice-background-color: transparent;
        --codice-caret-color: inherit;
        --codice-font-size: inherit;
        --codice-code-line-number-width: 2.5rem;
        --codice-code-padding: 1rem;
        --codice-font-family: Consolas, Monaco, monospace;

        position: relative;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        scrollbar-width: none;
      }
      [data-codice-editor="_RA:"] code,
      [data-codice-editor="_RA:"] textarea {
        font-family: var(--codice-font-family);
        line-break: anywhere;
        overflow-wrap: break-word;
        scrollbar-width: none;
        padding: calc(var(--codice-code-padding) * 1.5) var(--codice-code-padding);
        line-height: 1.5;
        font-size: var(--codice-font-size);
        caret-color: var(--codice-caret-color);
        border: none;
        outline: none;
        width: 100%;
      }
      [data-codice-editor="_RA:"] code {
        display: inline-block;
        width: 100%;
        margin-left: calc(var(--codice-code-line-number-width) - 2.5rem); 
      }
      [data-codice-editor="_RA:"] textarea::-webkit-scrollbar,
      [data-codice-editor="_RA:"] textarea:focus::-webkit-scrollbar,
      [data-codice-editor="_RA:"] textarea:hover::-webkit-scrollbar {
        width: 0;
      }
      [data-codice-editor="_RA:"] [data-codice-content] {
        position: relative;
      }
      [data-codice-editor="_RA:"] textarea {
        resize: none;
        display: block;
        color: var(--codice-text-color);
        background-color: var(--codice-background-color);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        overflow: hidden;
      }
      [data-codice-editor="_RA:"][data-codice-line-numbers="true"] textarea {
        padding-left: calc(var(--codice-code-line-number-width) + var(--codice-code-padding));
      }
      </style><div data-codice-header="_RA:" data-codice-header-controls="true"><style data-codice-style="true">[data-codice-header="_RA:"] {
        position: relative;
        display: flex;
        padding: 16px 22px 8px;
        align-items: center;
      }
      [data-codice-header="_RA:"] [data-codice-title] {
        display: inline-block;
        flex: 1 0;
        text-align: center;
        line-height: 1;
      }
      [data-codice-header="_RA:"] [data-codice-controls] {
        display: inline-flex;
        align-self: center;
        justify-self: start;
        align-items: center;
        justify-content: center;
      }
      [data-codice-header="_RA:"] [data-codice-controls] {
        width: 52px;
      }
      [data-codice-header="_RA:"][data-codice-header-controls="true"] [data-codice-title] {
        padding-right: 52px;
      }
      [data-codice-header="_RA:"] [data-codice-control] {
        display: flex;
        width: 10px;
        height: 10px;
        margin: 3px;
        border-radius: 50%;
        background-color: var(--codice-control-color);
      }
      </style><div data-codice-controls="true"><span data-codice-control="true"></span><span data-codice-control="true"></span><span data-codice-control="true"></span></div></div><div data-codice-content="true"><div data-codice="code" data-codice-code=":R1l:"><style data-codice-style="true">[data-codice-code=":R1l:"] {
        --codice-code-line-number-color: #a4a4a4;
        --codice-code-highlight-color: #555555;
        --codice-control-color: #8d8989;
        --codice-font-size: inherit;
        --codice-code-line-number-width: 2.5rem;
        --codice-code-padding: 1rem;
      }
      [data-codice-code=":R1l:"] pre {
        white-space: pre-wrap;
        margin: 0;
      }
      [data-codice-code=":R1l:"] code {
        border: none;
      }
      [data-codice-code=":R1l:"] .sh__line {
        display: inline-block;
        width: 100%;
      }
      [data-codice-code=":R1l:"] .sh__line:has(> [data-codice-code-line-number]) {
        padding-left: var(--codice-code-line-number-width);
      }
      [data-codice-code=":R1l:"] .sh__line[data-highlight] {
        background-color: var(--codice-code-highlight-color);
      }

      [data-codice-header=":R1l:"] {
        position: relative;
        display: flex;
        padding: 16px 22px 8px;
        align-items: center;
      }
      [data-codice-header=":R1l:"] [data-codice-title] {
        display: inline-block;
        flex: 1 0;
        text-align: center;
        line-height: 1;
      }
      [data-codice-header=":R1l:"] [data-codice-controls] {
        display: inline-flex;
        align-self: center;
        justify-self: start;
        align-items: center;
        justify-content: center;
      }
      [data-codice-header=":R1l:"] [data-codice-controls] {
        width: 52px;
      }
      [data-codice-header=":R1l:"][data-codice-header-controls="true"] [data-codice-title] {
        padding-right: 52px;
      }
      [data-codice-header=":R1l:"] [data-codice-control] {
        display: flex;
        width: 10px;
        height: 10px;
        margin: 3px;
        border-radius: 50%;
        background-color: var(--codice-control-color);
      }

      [data-codice-code=":R1l:"] code {
        counter-reset: codice-code-line-number;
      }
      [data-codice-code=":R1l:"] [data-codice-code-line-number] {
        counter-increment: codice-code-line-number 1;
        content: counter(codice-code-line-number);
        display: inline-block;
        min-width: calc(2rem - 6px);
        margin-left: calc(var(--codice-code-line-number-width) * -1);
        margin-right: 16px;
        text-align: right;
        user-select: none;
        color: var(--codice-code-line-number-color);
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
      "<div data-codice="editor" data-codice-editor="_RA:" data-codice-title="file.js" data-codice-controls="true" data-codice-line-numbers="true"><style data-codice-style="true">[data-codice-editor="_RA:"] {
        --codice-text-color: transparent;
        --codice-background-color: transparent;
        --codice-caret-color: inherit;
        --codice-font-size: inherit;
        --codice-code-line-number-width: 2.5rem;
        --codice-code-padding: 1rem;
        --codice-font-family: Consolas, Monaco, monospace;

        position: relative;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        scrollbar-width: none;
      }
      [data-codice-editor="_RA:"] code,
      [data-codice-editor="_RA:"] textarea {
        font-family: var(--codice-font-family);
        line-break: anywhere;
        overflow-wrap: break-word;
        scrollbar-width: none;
        padding: calc(var(--codice-code-padding) * 1.5) var(--codice-code-padding);
        line-height: 1.5;
        font-size: var(--codice-font-size);
        caret-color: var(--codice-caret-color);
        border: none;
        outline: none;
        width: 100%;
      }
      [data-codice-editor="_RA:"] code {
        display: inline-block;
        width: 100%;
        margin-left: calc(var(--codice-code-line-number-width) - 2.5rem); 
      }
      [data-codice-editor="_RA:"] textarea::-webkit-scrollbar,
      [data-codice-editor="_RA:"] textarea:focus::-webkit-scrollbar,
      [data-codice-editor="_RA:"] textarea:hover::-webkit-scrollbar {
        width: 0;
      }
      [data-codice-editor="_RA:"] [data-codice-content] {
        position: relative;
      }
      [data-codice-editor="_RA:"] textarea {
        resize: none;
        display: block;
        color: var(--codice-text-color);
        background-color: var(--codice-background-color);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        overflow: hidden;
      }
      [data-codice-editor="_RA:"][data-codice-line-numbers="true"] textarea {
        padding-left: calc(var(--codice-code-line-number-width) + var(--codice-code-padding));
      }
      </style><div data-codice-header="_RA:" data-codice-header-controls="true"><style data-codice-style="true">[data-codice-header="_RA:"] {
        position: relative;
        display: flex;
        padding: 16px 22px 8px;
        align-items: center;
      }
      [data-codice-header="_RA:"] [data-codice-title] {
        display: inline-block;
        flex: 1 0;
        text-align: center;
        line-height: 1;
      }
      [data-codice-header="_RA:"] [data-codice-controls] {
        display: inline-flex;
        align-self: center;
        justify-self: start;
        align-items: center;
        justify-content: center;
      }
      [data-codice-header="_RA:"] [data-codice-controls] {
        width: 52px;
      }
      [data-codice-header="_RA:"][data-codice-header-controls="true"] [data-codice-title] {
        padding-right: 52px;
      }
      [data-codice-header="_RA:"] [data-codice-control] {
        display: flex;
        width: 10px;
        height: 10px;
        margin: 3px;
        border-radius: 50%;
        background-color: var(--codice-control-color);
      }
      </style><div data-codice-controls="true"><span data-codice-control="true"></span><span data-codice-control="true"></span><span data-codice-control="true"></span></div><div data-codice-title="true">file.js</div></div><div data-codice-content="true"><div data-codice="code" data-codice-code=":R1l:"><style data-codice-style="true">[data-codice-code=":R1l:"] {
        --codice-code-line-number-color: #a4a4a4;
        --codice-code-highlight-color: #555555;
        --codice-control-color: #8d8989;
        --codice-font-size: inherit;
        --codice-code-line-number-width: 2.5rem;
        --codice-code-padding: 1rem;
      }
      [data-codice-code=":R1l:"] pre {
        white-space: pre-wrap;
        margin: 0;
      }
      [data-codice-code=":R1l:"] code {
        border: none;
      }
      [data-codice-code=":R1l:"] .sh__line {
        display: inline-block;
        width: 100%;
      }
      [data-codice-code=":R1l:"] .sh__line:has(> [data-codice-code-line-number]) {
        padding-left: var(--codice-code-line-number-width);
      }
      [data-codice-code=":R1l:"] .sh__line[data-highlight] {
        background-color: var(--codice-code-highlight-color);
      }

      [data-codice-header=":R1l:"] {
        position: relative;
        display: flex;
        padding: 16px 22px 8px;
        align-items: center;
      }
      [data-codice-header=":R1l:"] [data-codice-title] {
        display: inline-block;
        flex: 1 0;
        text-align: center;
        line-height: 1;
      }
      [data-codice-header=":R1l:"] [data-codice-controls] {
        display: inline-flex;
        align-self: center;
        justify-self: start;
        align-items: center;
        justify-content: center;
      }
      [data-codice-header=":R1l:"] [data-codice-controls] {
        width: 52px;
      }
      [data-codice-header=":R1l:"][data-codice-header-controls="true"] [data-codice-title] {
        padding-right: 52px;
      }
      [data-codice-header=":R1l:"] [data-codice-control] {
        display: flex;
        width: 10px;
        height: 10px;
        margin: 3px;
        border-radius: 50%;
        background-color: var(--codice-control-color);
      }

      [data-codice-code=":R1l:"] code {
        counter-reset: codice-code-line-number;
      }
      [data-codice-code=":R1l:"] [data-codice-code-line-number] {
        counter-increment: codice-code-line-number 1;
        content: counter(codice-code-line-number);
        display: inline-block;
        min-width: calc(2rem - 6px);
        margin-left: calc(var(--codice-code-line-number-width) * -1);
        margin-right: 16px;
        text-align: right;
        user-select: none;
        color: var(--codice-code-line-number-color);
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
      "<div class="editor" data-codice="editor" data-codice-editor="_RA:" data-codice-title="" data-codice-controls="false" data-codice-line-numbers="true"><style data-codice-style="true">[data-codice-editor="_RA:"] {
        --codice-text-color: transparent;
        --codice-background-color: transparent;
        --codice-caret-color: inherit;
        --codice-font-size: inherit;
        --codice-code-line-number-width: 2.5rem;
        --codice-code-padding: 1rem;
        --codice-font-family: Consolas, Monaco, monospace;

        position: relative;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        scrollbar-width: none;
      }
      [data-codice-editor="_RA:"] code,
      [data-codice-editor="_RA:"] textarea {
        font-family: var(--codice-font-family);
        line-break: anywhere;
        overflow-wrap: break-word;
        scrollbar-width: none;
        padding: calc(var(--codice-code-padding) * 1.5) var(--codice-code-padding);
        line-height: 1.5;
        font-size: var(--codice-font-size);
        caret-color: var(--codice-caret-color);
        border: none;
        outline: none;
        width: 100%;
      }
      [data-codice-editor="_RA:"] code {
        display: inline-block;
        width: 100%;
        margin-left: calc(var(--codice-code-line-number-width) - 2.5rem); 
      }
      [data-codice-editor="_RA:"] textarea::-webkit-scrollbar,
      [data-codice-editor="_RA:"] textarea:focus::-webkit-scrollbar,
      [data-codice-editor="_RA:"] textarea:hover::-webkit-scrollbar {
        width: 0;
      }
      [data-codice-editor="_RA:"] [data-codice-content] {
        position: relative;
      }
      [data-codice-editor="_RA:"] textarea {
        resize: none;
        display: block;
        color: var(--codice-text-color);
        background-color: var(--codice-background-color);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        overflow: hidden;
      }
      [data-codice-editor="_RA:"][data-codice-line-numbers="true"] textarea {
        padding-left: calc(var(--codice-code-line-number-width) + var(--codice-code-padding));
      }
      </style><div data-codice-content="true"><div data-codice="code" data-codice-code=":R1l:"><style data-codice-style="true">[data-codice-code=":R1l:"] {
        --codice-code-line-number-color: #a4a4a4;
        --codice-code-highlight-color: #555555;
        --codice-control-color: #8d8989;
        --codice-font-size: inherit;
        --codice-code-line-number-width: 2.5rem;
        --codice-code-padding: 1rem;
      }
      [data-codice-code=":R1l:"] pre {
        white-space: pre-wrap;
        margin: 0;
      }
      [data-codice-code=":R1l:"] code {
        border: none;
      }
      [data-codice-code=":R1l:"] .sh__line {
        display: inline-block;
        width: 100%;
      }
      [data-codice-code=":R1l:"] .sh__line:has(> [data-codice-code-line-number]) {
        padding-left: var(--codice-code-line-number-width);
      }
      [data-codice-code=":R1l:"] .sh__line[data-highlight] {
        background-color: var(--codice-code-highlight-color);
      }

      [data-codice-header=":R1l:"] {
        position: relative;
        display: flex;
        padding: 16px 22px 8px;
        align-items: center;
      }
      [data-codice-header=":R1l:"] [data-codice-title] {
        display: inline-block;
        flex: 1 0;
        text-align: center;
        line-height: 1;
      }
      [data-codice-header=":R1l:"] [data-codice-controls] {
        display: inline-flex;
        align-self: center;
        justify-self: start;
        align-items: center;
        justify-content: center;
      }
      [data-codice-header=":R1l:"] [data-codice-controls] {
        width: 52px;
      }
      [data-codice-header=":R1l:"][data-codice-header-controls="true"] [data-codice-title] {
        padding-right: 52px;
      }
      [data-codice-header=":R1l:"] [data-codice-control] {
        display: flex;
        width: 10px;
        height: 10px;
        margin: 3px;
        border-radius: 50%;
        background-color: var(--codice-control-color);
      }

      [data-codice-code=":R1l:"] code {
        counter-reset: codice-code-line-number;
      }
      [data-codice-code=":R1l:"] [data-codice-code-line-number] {
        counter-increment: codice-code-line-number 1;
        content: counter(codice-code-line-number);
        display: inline-block;
        min-width: calc(2rem - 6px);
        margin-left: calc(var(--codice-code-line-number-width) * -1);
        margin-right: 16px;
        text-align: right;
        user-select: none;
        color: var(--codice-code-line-number-color);
      }

      </style><pre data-codice-code-content="true"><code></code></pre></div><textarea></textarea></div></div>"
    `)
  ))
})
