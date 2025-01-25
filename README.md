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
/>
```


#### Props

The following props are supported by the `Editor` component:

- `value` (optional): A string representing the initial code value of the editor.
- `onChange` (optional): A function called when the code in the editor changes. The function will receive the updated code as its argument.
- `title` (optional): A string representing the title of the editor.
- `controls` (optional): A boolean value indicating whether to display the controls for the editor.
- `lineNumbers` (optional): A boolean value indicating whether to display line numbers in the editor.

Additionally, you can pass any other props to the `Editor` component, which will be applied to the root `div` element.


### Code Block

```tsx
import { Code } from 'codice'

<Code controls title="app/index.js">
  {'<div>Hello World</div>'}
</Code>
```

#### Props

- `title` (optional): A string representing the title of the code block.
- `controls` (optional): A boolean value indicating whether to display the controls for the code block.
- `lineNumbers` (optional): A boolean value indicating whether to display line numbers in the code block.
- `preformatted` (optional): A boolean value indicating whether the code should be displayed as preformatted text. If `true`, the code will be displayed in a `pre` and a `code` element. If `false`, the code will be displayed in a `div` element.

### Styling

#### CSS Variables

To customize the appearance of the editor, you can modify the CSS variables used in the `styles` object in the provided code:

- `--codice-editor-text-color`: The color of the editor text.
- `--codice-editor-background-color`: The background color of the editor.
- `--codice-editor-caret-color`: The color of the caret in the editor.
- `--codice-editor-control-color`: The color of the control items in the editor.

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
- `[data-codice-editor-control]`: The class name of control items, there're 3 of them.

### **Projects Powered by Codice**

Codice serves as the backbone for a growing ecosystem of packages that rely on its code editing and presenting capabilities. These projects showcase the versatility and performance Codice brings to modern development workflows:

- **[sugar-high](https://sugar-high.vercel.app/)**: A fast and lightweight syntax highlighter, leveraging Codice for live editing integration on website.
- **[remark-sugar-high](https://remark-sugar-high.vercel.app/)**: A Remark plugin for adding syntax-highlighted code blocks to Markdown content, powered by Codice for precise and visually appealing outputs.  
- **[devjar](https://devjar.vercel.app/)**: A tool for bundling interactive React code sandbox, using Codice to running the editor experience on website..  

These projects and many more are built on Codice, demonstrating its ability to adapt to a wide range of use cases, from syntax highlighting in Markdown to powering interactive coding experiences. Codice isn’t just a library—it’s a foundation for modern, code-first solutions.

## License

Codice is released under the MIT License. For more details, see the LICENSE file included in this repository.