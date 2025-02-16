import { fontSizeCss } from '../style'

export const css = (id: string, {
  fontSize,
  lineNumbersWidth = '2.5rem',
  padding = '1rem',
}: {
  fontSize?: string | number
  lineNumbersWidth: string
  padding: string
}) => {
  const R = `[data-codice-editor="${id}"]`
  return `\
${R} {
  --codice-text-color: transparent;
  --codice-background-color: transparent;
  --codice-caret-color: inherit;
  --codice-font-size: ${fontSizeCss(fontSize)};
  --codice-code-line-number-width: ${lineNumbersWidth};
  --codice-code-padding: ${padding};

  position: relative;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  scrollbar-width: none;
}
${R} code,
${R} textarea {
  font-family: Consolas, Monaco, monospace;
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
${R} code {
  display: inline-block;
  width: 100%;
}
${R} textarea::-webkit-scrollbar,
${R} textarea:focus::-webkit-scrollbar,
${R} textarea:hover::-webkit-scrollbar {
  width: 0;
}
${R} [data-codice-content] {
  position: relative;
}
${R} textarea {
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
${R}[data-codice-line-numbers="true"] textarea {
  padding-left: calc(var(--codice-code-line-number-width) + var(--codice-code-padding));
}
`
// line number padding-left is [[width 24px] margin-right 16px] + 15px
}