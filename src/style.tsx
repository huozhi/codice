export function Style({ css }: { css: string }) {
  return (
    <style data-codice-style>
      {css}
    </style>
  )
}

export const fontSizeCss = (fontSize: string | number | undefined): string => {
  const fz = `${fontSize ?? 'inherit'}${typeof fontSize === 'number' ? 'px' : ''}`
  return fz
}
