"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Copy, ChevronDown, ChevronUp } from 'lucide-react'

interface MarkdownPreviewProps {
  markdown: string
}

export function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Get preview of markdown (first 5 lines)
  const previewLines = markdown.split('\n').slice(0, 5).join('\n')
  const hasMoreContent = markdown.split('\n').length > 5

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="relative w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <div className="absolute right-2 sm:right-4 top-2 sm:top-4 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            className="h-7 w-7 sm:h-8 sm:w-8 bg-white dark:bg-zinc-800"
          >
            {copied ? (
              <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
            ) : (
              <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
          </Button>
          {hasMoreContent && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-7 w-7 sm:h-8 sm:w-8 bg-white dark:bg-zinc-800"
            >
              {isExpanded ? (
                <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : (
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </Button>
          )}
        </div>
        <div className="w-full overflow-auto p-4 sm:p-8 font-mono text-xs sm:text-sm">
          <pre className="whitespace-pre-wrap break-words text-left text-slate-800 dark:text-slate-200">
            {isExpanded ? markdown : previewLines}
            {!isExpanded && hasMoreContent && (
              <div className="mt-2 text-zinc-500 dark:text-zinc-400">
                ... {markdown.split('\n').length - 5} more lines
              </div>
            )}
          </pre>
        </div>
      </div>
    </div>
  )
} 