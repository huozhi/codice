export const css = `
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
`