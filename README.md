# Codice (deprecated)

Codice has moved to the Sugar High project and is no longer maintained as a separate package.

For React code blocks and editors, use **[`@sugar-high/react`](https://www.npmjs.com/package/@sugar-high/react)**. For framework-independent syntax highlighting, use **[`sugar-high`](https://www.npmjs.com/package/sugar-high)**.

See the [Sugar High React documentation](https://sugar-high.vercel.app/react) for the latest API and examples.

## Installation

```bash
npm install @sugar-high/react sugar-high
```

`sugar-high` is a peer dependency of `@sugar-high/react`.

## Usage

### Editor

```tsx
import { Editor } from '@sugar-high/react'

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
- `lineNumbersWidth` (optional): A string representing the width of the line numbers column. The default value is `2.5rem`.
- `padding` (optional): A string representing the padding of the code block. The default value is `1rem`.
- `fontSize` (optional): A string representing the font size of the editor. The default value is `inherit`.
- `textareaRef` (optional): A React ref object to access the underlying textarea element directly for advanced use cases.

Additionally, you can pass any other props to the `Editor` component, which will be applied to the root `div` element.


### Code Block

```tsx
import { Code } from '@sugar-high/react'

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
- `preformatted` (optional): A boolean value indicating whether the code should be displayed as preformatted text. If `true`, the code will be displayed in a `pre` and a `code` element. If `false`, the code will be displayed in a `div` element.
- `asMarkup` (optional): A boolean value indicating whether the code should be displayed as markup. If `true`, the code will be displayed with HTML entities escaped. If `false`, the code will be displayed as plain text. default is `false`.
- `fontSize` (optional): A string representing the font size of the editor. The default value is `inherit`.
- `lineNumbers` (optional): A boolean value indicating whether to display line numbers in the code block.
- `lineNumbersWidth` (optional): A string representing the width of the line numbers column. The default value is `2.5rem`.
- `padding` (optional): A string representing the padding of the code block. The default value is `1rem`.
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

## Migrating from Codice

Replace the package dependency and update imports:

```bash
npm uninstall codice
npm install @sugar-high/react sugar-high
```

```diff
- import { Code, Editor } from 'codice'
+ import { Code, Editor } from '@sugar-high/react'
```

The `Code` and `Editor` components retain the Codice API and existing `data-codice-*` styling hooks, so most applications only need to change their dependency and import path.

## License

Codice is released under the MIT License. For more details, see the LICENSE file included in this repository.
