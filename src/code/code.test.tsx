import { describe, expect, it } from 'vitest'
import { Code } from '.'
import { renderToString } from 'react-dom/server'

describe('Code', () => {
  it('default props', () => {
    expect(renderToString(<Code>test</Code>)).toMatchInlineSnapshot(`
      "<div data-codice-code="true"><style>
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
      </style><pre data-codice-code-content="true"><code>test</code></pre></div>"
    `)
  })

  it('with title', () => {
    expect(renderToString(<Code title="file.js">test</Code>)).toMatchInlineSnapshot(`
      "<div data-codice-code="true"><style>
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
      </style><div data-codice-editor-header="true"><div data-codice-editor-title="true">file.js</div></div><pre data-codice-code-content="true"><code>test</code></pre></div>"
    `)
  })

  it('with controls', () => {
    expect(renderToString(<Code controls>test</Code>)).toMatchInlineSnapshot(`
      "<div data-codice-code="true"><style>
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
      </style><div data-codice-editor-header="true"><div data-codice-editor-controls="true"><span data-codice-editor-control="true"></span><span data-codice-editor-control="true"></span><span data-codice-editor-control="true"></span></div><span data-codice-editor-controls-placeholder="true"></span></div><pre data-codice-code-content="true"><code>test</code></pre></div>"
    `)
  })
})