"use client"

import { useState, useEffect } from "react"
import { GripHorizontal } from "lucide-react"
import { motion, AnimatePresence, useSpring } from "framer-motion"

interface MarkdownComparisonProps {
  leftContent: React.ReactNode
  rightContent: React.ReactNode
  className?: string
}

export function MarkdownComparison({
  leftContent,
  rightContent,
  className,
}: MarkdownComparisonProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const springValue = useSpring(50, {
    stiffness: 300,
    damping: 30,
    mass: 0.5
  })

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return

    const rect = e.currentTarget.getBoundingClientRect()
    let y = 0

    if ("touches" in e && e.touches.length > 0) {
      y = e.touches[0].clientY - rect.top
    } else if ("clientY" in e) {
      y = e.clientY - rect.top
    }
    
    const percentage = Math.min(Math.max((y / rect.height) * 100, 0), 100)
    springValue.set(percentage)
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-background ${className}`}
      onMouseMove={onMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={onMouseMove}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* Content Container */}
      <motion.div className="absolute inset-0">
        {/* Top Content */}
        <motion.div
          className="absolute inset-0 overflow-auto"
          style={{ height: springValue.get() + "%" }}
        >
          {leftContent}
        </motion.div>

        {/* Bottom Content */}
        <motion.div
          className="absolute inset-0 overflow-auto"
          style={{ 
            top: springValue.get() + "%",
            height: (100 - springValue.get()) + "%"
          }}
        >
          {rightContent}
        </motion.div>
      </motion.div>

      {/* Simple Line Divider */}
      <motion.div
        className="absolute left-0 right-0 z-30"
        style={{ top: springValue.get() + "%" }}
      >
        <div className="absolute inset-x-0 -top-px h-px bg-border/50" />
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-8 w-8 items-center justify-center rounded-full border bg-background/95 shadow-sm backdrop-blur-sm"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            <GripHorizontal className="h-4 w-4 text-muted-foreground" />
          </motion.button>
        </div>
      </motion.div>

      {/* Labels */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <AnimatePresence>
          {springValue.get() > 15 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-6 top-6"
            >
              <div className="rounded-md bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                Raw Markdown
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {springValue.get() < 85 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-6 bottom-6"
            >
              <div className="rounded-md bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                Preview
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 