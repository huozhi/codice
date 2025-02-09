import { describe, expect, it } from 'vitest'
import { Code } from '.'
import { renderToString } from 'react-dom/server'

describe('Code', () => {
  it('default props', () => {
    expect(renderToString(<Code>test</Code>)).toMatchInlineSnapshot(`
      "<div data-codice="code" data-codice-code="true"><style data-codice-style="true">:scope [data-codice-code] {
        --codice-code-line-number-color: #a4a4a4;
        --codice-code-highlight-color: #555555;
        --codice-control-color: #8d8989;
      }
      :scope [data-codice-code] pre {
        white-space: pre-wrap;
        margin: 0;
      }
      :scope [data-codice-code] code {
        border: none;
      }
      :scope [data-codice-code] .sh__line {
        display: inline-block;
        width: 100%;
      }
      :scope [data-codice-code] .sh__line:has(> [data-codice-code-line-number]) {
        padding-left: 40px;
      }
      :scope [data-codice-code] .sh__line[data-highlight] {
        background-color: var(--codice-code-highlight-color);
      }
      :scope { font-size: inherit; }
      </style><pre data-codice-code-content="true"><code><span class="sh__line"><span data-sh-token-type="element" class="sh__token--identifier" style="color:var(--sh-identifier)">test</span></span></code></pre></div>"
    `)
  })

  it('with title', () => {
    expect(renderToString(<Code title="file.js">test</Code>)).toMatchInlineSnapshot(`
      "<div data-codice="code" data-codice-code="true"><style data-codice-style="true">:scope [data-codice-code] {
        --codice-code-line-number-color: #a4a4a4;
        --codice-code-highlight-color: #555555;
        --codice-control-color: #8d8989;
      }
      :scope [data-codice-code] pre {
        white-space: pre-wrap;
        margin: 0;
      }
      :scope [data-codice-code] code {
        border: none;
      }
      :scope [data-codice-code] .sh__line {
        display: inline-block;
        width: 100%;
      }
      :scope [data-codice-code] .sh__line:has(> [data-codice-code-line-number]) {
        padding-left: 40px;
      }
      :scope [data-codice-code] .sh__line[data-highlight] {
        background-color: var(--codice-code-highlight-color);
      }
      :scope { font-size: inherit; }
      </style><div data-codice-header="true" data-codice-header-controls="false"><style data-codice-style="true">:scope [data-codice-header] {
        position: relative;
        display: flex;
        padding: 16px 22px 8px;
        align-items: center;
      }
      :scope [data-codice-header] [data-codice-title] {
        display: inline-block;
        flex: 1 0;
        text-align: center;
        line-height: 1;
      }
      :scope [data-codice-header] [data-codice-controls] {
        display: inline-flex;
        align-self: center;
        justify-self: start;
        align-items: center;
        justify-content: center;
      }
      :scope [data-codice-header] [data-codice-controls] {
        width: 52px;
      }
      [data-codice-header-controls="true"] [data-codice-title] {
        padding-right: 52px;
      }
      :scope [data-codice-header] [data-codice-control] {
        display: flex;
        width: 10px;
        height: 10px;
        margin: 3px;
        border-radius: 50%;
        background-color: var(--codice-control-color);
      }
      </style><div data-codice-title="true">file.js</div></div><pre data-codice-code-content="true"><code><span class="sh__line"><span data-sh-token-type="element" class="sh__token--identifier" style="color:var(--sh-identifier)">test</span></span></code></pre></div>"
    `)
  })

  it('with controls', () => {
    expect(renderToString(<Code controls>test</Code>)).toMatchInlineSnapshot(`
      "<div data-codice="code" data-codice-code="true"><style data-codice-style="true">:scope [data-codice-code] {
        --codice-code-line-number-color: #a4a4a4;
        --codice-code-highlight-color: #555555;
        --codice-control-color: #8d8989;
      }
      :scope [data-codice-code] pre {
        white-space: pre-wrap;
        margin: 0;
      }
      :scope [data-codice-code] code {
        border: none;
      }
      :scope [data-codice-code] .sh__line {
        display: inline-block;
        width: 100%;
      }
      :scope [data-codice-code] .sh__line:has(> [data-codice-code-line-number]) {
        padding-left: 40px;
      }
      :scope [data-codice-code] .sh__line[data-highlight] {
        background-color: var(--codice-code-highlight-color);
      }
      :scope { font-size: inherit; }
      </style><div data-codice-header="true" data-codice-header-controls="true"><style data-codice-style="true">:scope [data-codice-header] {
        position: relative;
        display: flex;
        padding: 16px 22px 8px;
        align-items: center;
      }
      :scope [data-codice-header] [data-codice-title] {
        display: inline-block;
        flex: 1 0;
        text-align: center;
        line-height: 1;
      }
      :scope [data-codice-header] [data-codice-controls] {
        display: inline-flex;
        align-self: center;
        justify-self: start;
        align-items: center;
        justify-content: center;
      }
      :scope [data-codice-header] [data-codice-controls] {
        width: 52px;
      }
      [data-codice-header-controls="true"] [data-codice-title] {
        padding-right: 52px;
      }
      :scope [data-codice-header] [data-codice-control] {
        display: flex;
        width: 10px;
        height: 10px;
        margin: 3px;
        border-radius: 50%;
        background-color: var(--codice-control-color);
      }
      </style><div data-codice-controls="true"><span data-codice-control="true"></span><span data-codice-control="true"></span><span data-codice-control="true"></span></div></div><pre data-codice-code-content="true"><code><span class="sh__line"><span data-sh-token-type="element" class="sh__token--identifier" style="color:var(--sh-identifier)">test</span></span></code></pre></div>"
    `)
  })

  it('with fontSize', () => {
    expect(renderToString(<Code fontSize={14}>test</Code>)).toMatchInlineSnapshot(`
      "<div data-codice="code" data-codice-code="true"><style data-codice-style="true">:scope [data-codice-code] {
        --codice-code-line-number-color: #a4a4a4;
        --codice-code-highlight-color: #555555;
        --codice-control-color: #8d8989;
      }
      :scope [data-codice-code] pre {
        white-space: pre-wrap;
        margin: 0;
      }
      :scope [data-codice-code] code {
        border: none;
      }
      :scope [data-codice-code] .sh__line {
        display: inline-block;
        width: 100%;
      }
      :scope [data-codice-code] .sh__line:has(> [data-codice-code-line-number]) {
        padding-left: 40px;
      }
      :scope [data-codice-code] .sh__line[data-highlight] {
        background-color: var(--codice-code-highlight-color);
      }
      :scope { font-size: 14px; }
      </style><pre data-codice-code-content="true"><code><span class="sh__line"><span data-sh-token-type="element" class="sh__token--identifier" style="color:var(--sh-identifier)">test</span></span></code></pre></div>"
    `)

    expect(renderToString(<Code fontSize={'1rem'}>test</Code>)).toMatchInlineSnapshot(`
      "<div data-codice="code" data-codice-code="true"><style data-codice-style="true">:scope [data-codice-code] {
        --codice-code-line-number-color: #a4a4a4;
        --codice-code-highlight-color: #555555;
        --codice-control-color: #8d8989;
      }
      :scope [data-codice-code] pre {
        white-space: pre-wrap;
        margin: 0;
      }
      :scope [data-codice-code] code {
        border: none;
      }
      :scope [data-codice-code] .sh__line {
        display: inline-block;
        width: 100%;
      }
      :scope [data-codice-code] .sh__line:has(> [data-codice-code-line-number]) {
        padding-left: 40px;
      }
      :scope [data-codice-code] .sh__line[data-highlight] {
        background-color: var(--codice-code-highlight-color);
      }
      :scope { font-size: 1rem; }
      </style><pre data-codice-code-content="true"><code><span class="sh__line"><span data-sh-token-type="element" class="sh__token--identifier" style="color:var(--sh-identifier)">test</span></span></code></pre></div>"
    `)
  })
})