# Codice

Codice is a slim React components suite for code editing and displaying story. It provides an editor component and a code block component with syntax highlighting. Styling customization is enabled through CSS variables and HTML attributes.


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
- `fontSize` (optional): A string representing the font size of the editor. The default value is `inherit`.

Additionally, you can pass any other props to the `Editor` component, which will be applied to the root `div` element.


### Code Block

```tsx
import { Code } from 'codice'

<Code 
  title="app/index.js"
  controls 
  lineNumbers
  preformatted
>
  {'<div>Hello World</div>'}
</Code>
```

#### Props

- `title` (optional): A string representing the title of the code block.
- `controls` (optional): A boolean value indicating whether to display the controls for the code block.
- `lineNumbers` (optional): A boolean value indicating whether to display line numbers in the code block.
- `preformatted` (optional): A boolean value indicating whether the code should be displayed as preformatted text. If `true`, the code will be displayed in a `pre` and a `code` element. If `false`, the code will be displayed in a `div` element.
- `asMarkup` (optional): A boolean value indicating whether the code should be displayed as markup. If `true`, the code will be displayed with HTML entities escaped. If `false`, the code will be displayed as plain text. default is `false`.
- `fontSize` (optional): A string representing the font size of the editor. The default value is `inherit`.
- `children`: The code content to be displayed in the code block.

### Styling

#### CSS Variables

Usually you don't need to style the editor, it comes with a default theme. However, you can customize the appearance of the editor by overriding the CSS variables used in the provided code.

- `--codice-text-color`: The color of the editor text. (default: `transparent`)
- `--codice-background-color`: The background color of the editor. (default: `transparent`)
- `--codice-caret-color`: The color of the caret in the editor. (default: `inherit`)
- `--codice-control-color`: The color of the control items in the code frame and editor. (default: `#8d8989`)


For example, you can define the following CSS variables in your stylesheet to customize the appearance:
```css
:root {
  --codice-text-color: transparent;
  --codice-background-color: transparent;
  --codice-caret-color: #d5efea;
  --codice-control-color: #8d8989;
}
```

This will style the code frame with a light gray background, darker gray text, and even lighter gray controls.

#### CSS Attributes

You can also customize the appearance of the code frame by overriding the CSS attributes of the code block:

- `[data-codice-controls]`: The class name for the controls wrapper in the code frame.
- `[data-codice-control]`: The class name of control items, there're 3 of them.
  - `[data-codice-control]:nth-child(<number>) { background-color: <color> }` can be used to style each control item.

### **Projects Powered by Codice**

Codice serves as the backbone for a growing ecosystem of packages that rely on its code editing and presenting capabilities. These projects showcase the versatility and performance Codice brings to modern development workflows:

- **[sugar-high](https://sugar-high.vercel.app/)**: A fast and lightweight syntax highlighter, leveraging Codice for live editing integration on website.
- **[remark-sugar-high](https://remark-sugar-high.vercel.app/)**: A Remark plugin for adding syntax-highlighted code blocks to Markdown content, powered by Codice for precise and visually appealing outputs.  
- **[devjar](https://devjar.vercel.app/)**: A tool for bundling interactive React code sandbox, using Codice to running the editor experience on website..  

These projects and many more are built on Codice, demonstrating its ability to adapt to a wide range of use cases, from syntax highlighting in Markdown to powering interactive coding experiences. Codice isn’t just a library—it’s a foundation for modern, code-first solutions.

## License

Codice is released under the MIT License. For more details, see the LICENSE file included in this repository.