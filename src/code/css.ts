const C = `[data-codice-code]`
const H = `[data-codice-editor-header]`

export const baseCss = `\
${C} {
  --codice-code-line-number-color: #a4a4a4;
  --codice-code-highlight-color: #555555;
}
${C} pre {
  white-space: pre-wrap;
  margin: 0;
}
${C} code {
  border: none;
}
${C} .sh__line {
  display: inline-block;
  width: 100%;
}
${C} .sh__line[data-highlight] {
  background-color: var(--codice-code-highlight-color);
}
`

export const headerCss = `\
${H} {
  position: relative;
  display: flex;
  padding: 16px 22px 8px;
  align-items: center;
}
${H} [data-codice-editor-title] {
  display: inline-block;
  flex: 1 0;
  text-align: center;
  line-height: 1;
}
${H} [data-codice-editor-controls] {
  display: inline-flex;
  align-self: center;
  justify-self: start;
  align-items: center;
  justify-content: center;
}
${H} [data-codice-editor-controls],
${H} [data-codice-editor-controls-placeholder] {
  width: 52px;
}
[data-codice-editor-header-controls="true"] [data-codice-editor-title] {
  padding-right: 52px;
}
${H} [data-codice-editor-control] {
  display: flex;
  width: 10px;
  height: 10px;
  margin: 3px;
  border-radius: 50%;
  background-color: var(--codice-editor-control-color);
}
`

export const lineNumbersCss = `\
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
`