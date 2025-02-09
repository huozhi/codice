const C = `:scope [data-codice-code]`
const H = `:scope [data-codice-header]`

export const baseCss = `\
${C} {
  --codice-code-line-number-color: #a4a4a4;
  --codice-code-highlight-color: #555555;
  --codice-control-color: #8d8989;
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
${C} .sh__line:has(> [data-codice-code-line-number]) {
  padding-left: 40px;
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
${H} [data-codice-title] {
  display: inline-block;
  flex: 1 0;
  text-align: center;
  line-height: 1;
}
${H} [data-codice-controls] {
  display: inline-flex;
  align-self: center;
  justify-self: start;
  align-items: center;
  justify-content: center;
}
${H} [data-codice-controls] {
  width: 52px;
}
[data-codice-header-controls="true"] [data-codice-title] {
  padding-right: 52px;
}
${H} [data-codice-control] {
  display: flex;
  width: 10px;
  height: 10px;
  margin: 3px;
  border-radius: 50%;
  background-color: var(--codice-control-color);
}
`

export const lineNumbersCss = `\
:scope code {
  counter-reset: codice-code-line-number;
}
:scope [data-codice-code-line-number] {
  counter-increment: codice-code-line-number 1;
  content: counter(codice-code-line-number);
  display: inline-block;
  min-width: 24px;
  margin-left: -40px;
  margin-right: 16px;
  text-align: right;
  user-select: none;
  color: var(--codice-code-line-number-color);
}
`

export const fontCss = (fontSize: number | undefined) => `\
:scope { font-size: ${fontSize || 'inherit'}; }
`