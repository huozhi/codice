const R = '[data-codice-editor]'
export const css = `\
${R} {
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
  padding: 24px 36px;
  font-size: 16px;
  line-height: 20px;
  caret-color: var(--codice-editor-caret-color);
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
${R} textarea:focus {
  border: 1px solid hsla(137, 100.00%, 94.30%, 0.30);
}
${R} [data-codice-editor-content] {
  position: relative;
}
${R} textarea {
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
`