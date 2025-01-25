export const keywords = new Set([
  'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif',
  'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda',
  'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
])

export const onCommentStart = (currentChar, _nextChar) => {
  return currentChar === '#'
}

export const onCommentEnd = (_prevChar, currChar) => {
  return currChar === '\n'
}
