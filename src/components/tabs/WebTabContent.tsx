import React from "react";
import { Input } from "@/components/ui/input";
import { WetroButton } from "../ui/wetro-button";
import { MarkdownPreview } from "@/components/playground-section/markdown-preview";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Toggle } from "./Toggle";

/**
 * Props for the WebTabContent component.
 */
export interface WebTabContentProps {
  structured: boolean;
  setStructured: (v: boolean) => void;
  url: string;
  setUrl: (v: string) => void;
  structuredText: string;
  setStructuredText: (v: string) => void;
  isLoading: boolean;
  error: string | null;
  markdown: string;
  handleGenerate: (e: React.FormEvent) => void;
}

/**
 * Renders the content for the Web tab, including structured/unstructured modes.
 */
export function WebTabContent({
  structured,
  setStructured,
  url,
  setUrl,
  structuredText,
  setStructuredText,
  isLoading,
  error,
  markdown,
  handleGenerate,
}: WebTabContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Toggle checked={structured} onChange={setStructured} label="Structured Output" />
      </div>
      {structured ? (
        <>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">URL</label>
            <Input
              className="h-11"
              placeholder="https://wetrocloud.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Schema</label>
            <Input
              className="h-11"
              placeholder="Enter structured output details..."
              value={structuredText}
              onChange={(e) => setStructuredText(e.target.value)}
            />
          </div>
          <WetroButton />
        </>
      ) : (
        <>
          <form onSubmit={handleGenerate} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">URL</label>
              <Input
                className="h-11"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <WetroButton isLoading={isLoading} />
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/50 dark:border-red-800"
              >
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {(isLoading || markdown) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  opacity: { duration: 0.2 },
                }}
                className="mt-8 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 }}
                  className="border-t border-zinc-200 dark:border-zinc-800 pt-8"
                >
                  {isLoading ? (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-semibold tracking-tighter text-center">Generating Markdown...</h2>
                      <div className="w-full p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                        <div className="space-y-3">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-semibold tracking-tighter text-center">Generated Markdown</h2>
                      <MarkdownPreview markdown={markdown} />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
} 