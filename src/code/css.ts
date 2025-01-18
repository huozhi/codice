export const css = `
[data-codice-code] pre {
  white-space: pre-wrap;
  margin: 0;
  padding: 16px;
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
[data-codice-editor-controls] span {
  display: flex;
  width: 11px;
  height: 11px;
  margin: 3px;
  border-radius: 50%;
}
`