# Codice

Codice is a lightweight, customizable code editor component for React applications. It provides a simple interface for users to input code with syntax highlighting.

## Installation

To install the package, run the following command:

npm install codice

## Usage

To use the `Editor` component from the Codice package, follow these steps:

1. Import the `Editor` component:

```tsx
import { Editor } from 'codice'
```

2. Use the `Editor` component in your React application:

```tsx
<Editor
  title="My Code Editor"
  value="const hello = 'world';"
  onChange={(code) => console.log(code)}
  highlight={(code) => code}
/>
```

## Props

The following props are supported by the `Editor` component:

- `title` (optional): A string representing the title of the editor.
- `value` (optional): A string representing the initial code value of the editor.
- `onChange` (optional): A function called when the code in the editor changes. The function will receive the updated code as its argument.
- `highlight` (optional): A function used to provide syntax highlighting for the code. It should accept the code as an argument and return the highlighted code as an HTML string. You can use any syntax highlighting library (e.g., [Prism](https://prismjs.com/)) to implement this functionality.

Additionally, you can pass any other props to the `Editor` component, which will be applied to the root `div` element.

## Customization

To customize the appearance of the editor, you can modify the CSS variables used in the `styles` object in the provided code:

- `--editor-text-color`: The color of the editor text.
- `--editor-background-color`: The background color of the editor.
- `--editor-control-color`: The color of the editor controls.

For example, you can set the following CSS in your application:

```css
:root {
  --editor-text-color: #333;
  --editor-background-color: #f5f5f5;
  --editor-control-color: #ccc;
}
```

This will style the editor with a light gray background, darker gray text, and even lighter gray controls.

### License

Codice is released under the MIT License. For more details, see the LICENSE file included in this repository.