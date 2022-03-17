import React, { forwardRef, ReactNode } from 'react'

interface Props {
  className?: string
  children: ReactNode
}

export const PaperSlide = forwardRef<HTMLDivElement, Props>(({ children, className = '' }, ref) => {
  return (
    <div ref={ref} className={`keen-slider__slide ${className}`}>
      {children}
    </div>
  )
})
