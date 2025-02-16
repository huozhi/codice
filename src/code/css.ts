import { fontSizeCss } from '../style'

const baseCss = (id: string) => {
  const C = `[data-codice-code="${id}"]`
  return `\
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
  padding-left: var(--codice-code-line-number-width);
}
${C} .sh__line[data-highlight] {
  background-color: var(--codice-code-highlight-color);
}
`
}

export const headerCss = (id: string) => {
  const H = `[data-codice-header="${id}"]`
  return `\
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
${H}[data-codice-header-controls="true"] [data-codice-title] {
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
}

const lineNumbersCss = (id: string) => `\
[data-codice-code="${id}"] code {
  counter-reset: codice-code-line-number;
}
[data-codice-code="${id}"] [data-codice-code-line-number] {
  counter-increment: codice-code-line-number 1;
  content: counter(codice-code-line-number);
  display: inline-block;
  min-width: calc(2rem - 6px);
  width: var(--codice-code-line-number-width);
  margin-left: calc(var(--codice-code-line-number-width) * -1);
  margin-right: 16px;
  text-align: right;
  user-select: none;
  color: var(--codice-code-line-number-color);
}
`

export const css = (id: string, {
  fontSize,
  lineNumbers,
  lineNumbersWidth = '2.5rem',
  padding = '1rem',
}: {
  fontSize: string | number | undefined
  lineNumbers: boolean
  lineNumbersWidth: string
  padding: string
}): string => {
  const U = `[data-codice-code="${id}"]`
  const fz = fontSizeCss(fontSize)
  return `\
${U} {
  --codice-code-line-number-color: #a4a4a4;
  --codice-code-highlight-color: #555555;
  --codice-control-color: #8d8989;
  --codice-font-size: ${fz};
  --codice-code-line-number-width: ${lineNumbersWidth};
  --codice-code-padding: ${padding};
}
${baseCss(id)}
${headerCss(id)}
${lineNumbers ? lineNumbersCss(id) : ''}
`
}