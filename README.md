# Codice

Codice is a slim React components suite for code editing and displaying story. It provides an editor component and a code block component with syntax highlighting.

## Installation

```bash
npm install codice
```

## Usage

### Editor

```tsx
import { Editor } from 'codice'

<Editor
  title="My Code Editor"
  value="const hello = 'world';"
  onChange={(code) => console.log(code)}
  highlight={(code) => code}
/>
```


#### Props

The following props are supported by the `Editor` component:

- `title` (optional): A string representing the title of the editor.
- `value` (optional): A string representing the initial code value of the editor.
- `onChange` (optional): A function called when the code in the editor changes. The function will receive the updated code as its argument.
- `highlight` (optional): A function used to provide syntax highlighting for the code. It should accept the code as an argument and return the highlighted code as an HTML string. You can use any syntax highlighting library (e.g., [Prism](https://prismjs.com/)) to implement this functionality.

Additionally, you can pass any other props to the `Editor` component, which will be applied to the root `div` element.


### Code Block

```tsx
import { Code } from 'codice'

<Code controls filename="app/index.js">
  {'<div>Hello World</div>'}
</Code>
```

#### Props

- `controls` (optional): A boolean value indicating whether to display the controls for the code block.
- `filename` (optional): A string representing the filename of the code block.

### Styling

#### CSS Variables

To customize the appearance of the editor, you can modify the CSS variables used in the `styles` object in the provided code:

- `--codice-editor-text-color`: The color of the editor text.
- `--codice-editor-background-color`: The background color of the editor.
- `--codice-editor-caret-color`: The color of the caret in the editor.

For example, you can set the following CSS in your application:

```css
:root {
  --codice-editor-text-color: #333;
  --codice-editor-background-color: #f5f5f5;
  --codice-editor-caret-color: #d5efea;
}
```

This will style the editor with a light gray background, darker gray text, and even lighter gray controls.

#### CSS Attributes

You can also customize the appearance of the editor by overriding the CSS attributes of the code block:

- `[data-codice-editor-controls]`: The class name for the controls in the editor.
  - `[data-codice-editor-controls-close]`: The class name for the close button.
  - `[data-codice-editor-controls-minimize]`: The class name for the minimize button.
  - `[data-codice-editor-controls-maximize]`: The class name for the maximize button.


## License

Codice is released under the MIT License. For more details, see the LICENSE file included in this repository.