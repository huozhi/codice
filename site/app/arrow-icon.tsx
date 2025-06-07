'use client'

import { useState } from 'react'

interface ArrowButtonProps {
  direction: 'left' | 'right'
  onClick?: () => void
  className?: string
  size: number
}

function ArrowIcon({ direction, onClick, className = '', size }: ArrowButtonProps) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 200)
    onClick?.()
  }

  const strokeWidth = 1.5

  return (
    <button
      onClick={handleClick}
      className={`
        w-[${size}px]
        h-[${size}px]
        relative
        rounded-full
        transition-all
        duration-200
        ease-out
        focus:outline-none
        group
        ${isClicked ? 'scale-90' : ''}
        ${className}
      `}
    >
      <svg
        viewBox="0 0 24 24"
        className={`
          w-full
        h-full
          transition-all
          duration-200
          ease-out
        `}
        fill="currentColor"
      >
        {direction === 'left' ? (
          <g>
            {/* Top line of the arrow */}
            <line
              x1="15"
              y1="8"
              x2="9"
              y2="12"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="
                transition-all
                duration-200
                ease-out
                origin-[9px_12px]
                group-hover:rotate-[-8deg]
              "
            />
            {/* Bottom line of the arrow */}
            <line
              x1="15"
              y1="16"
              x2="9"
              y2="12"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="
                transition-all
                duration-200
                ease-out
                origin-[9px_12px]
                group-hover:rotate-[8deg]
              "
            />
          </g>
        ) : (
          <g>
            {/* Top line of the arrow */}
            <line
              x1="9"
              y1="8"
              x2="15"
              y2="12"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="
                transition-all
                duration-200
                ease-out
                origin-[15px_12px]
                group-hover:rotate-[8deg]
              "
            />
            {/* Bottom line of the arrow */}
            <line
              x1="9"
              y1="16"
              x2="15"
              y2="12"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="
                transition-all
                duration-200
                ease-out
                origin-[15px_12px]
                group-hover:rotate-[-8deg]
              "
            />
          </g>
        )}
      </svg>
    </button>
  )
}

export { ArrowIcon }
