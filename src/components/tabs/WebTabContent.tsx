import React from "react";
import { Input } from "@/components/ui/input";
import { WetroButton } from "../ui/wetro-button";
import { MarkdownPreview } from "@/components/playground-section/markdown-preview";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Toggle } from "./Toggle";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useCyclingMessage } from "../../hooks/useCyclingMessage";

const structuredMessages = [
  "🧠 Downloading braincells...",
  "💅 Formatting that info real cute...",
  "🛠️ Hacking into the matrix (legally)...",
  "👾 Extracting stats like it's a speedrun...",
  "👨‍🍳 Cooking up results...",
];
const unstructuredMessages = [
  "🧠 Downloading braincells...",
  "💅 Formatting that info real cute...",
  "🛠️ Hacking into the matrix (legally)...",
  "👾 Extracting stats like it's a speedrun...",
  "👨‍🍳 Cooking up results...",
];

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
  structuredData: string;
  isStructuredLoading: boolean;
  handleGenerate: (e: React.FormEvent) => void;
  handleStructuredGenerate: (e: React.FormEvent) => void;
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
  structuredData,
  isStructuredLoading,
  handleGenerate,
  handleStructuredGenerate,
}: WebTabContentProps) {
  const cyclingStructuredMessage = useCyclingMessage(structuredMessages);
  const cyclingUnstructuredMessage = useCyclingMessage(unstructuredMessages);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Toggle
          checked={structured}
          onChange={setStructured}
          label="Structured Output"
        />
      </div>
      {structured ? (
        <>
          <form
            onSubmit={handleStructuredGenerate}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium flex items-center gap-1">
                Website URL
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0} className="outline-none">
                      <InfoCircledIcon className="w-4 h-4 text-zinc-400 cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Enter the full URL of the website you want to extract data
                    from.
                  </TooltipContent>
                </Tooltip>
              </label>
              <Input
                className="h-11"
                placeholder="https://wetrocloud.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium flex items-center gap-1">
                JSON Schema
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0} className="outline-none">
                      <InfoCircledIcon className="w-4 h-4 text-zinc-400 cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Provide a valid JSON schema describing the structure of the
                    data you want to extract.
                  </TooltipContent>
                </Tooltip>
              </label>
              <textarea
                style={{ resize: "vertical" }}
                className="h-40 font-mono text-sm w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder={`[
  {
    "name": "<name of rich man>",
    "networth": "<amount worth>"
  }
]`}
                value={structuredText}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  e.target.style.height = "150px";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                  setStructuredText(e.target.value);
                }}
              />
            </div>
            <WetroButton isLoading={isStructuredLoading} />
          </form>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 rounded-lg border border-red-200 bg-red-50"
              >
                <p className="text-sm text-red-600">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!error && (isStructuredLoading || structuredData) && (
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
                  className="border-t border-zinc-200 pt-8"
                >
                  {isStructuredLoading ? (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-semibold tracking-tighter text-center">
                        {cyclingStructuredMessage}
                      </h2>
                      <div className="w-full p-6 rounded-lg border border-zinc-200 bg-white/80 backdrop-blur-sm">
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
                      <h2 className="text-2xl font-semibold tracking-tighter text-center">
                        Structured Data
                      </h2>
                      <MarkdownPreview markdown={structuredData} />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          <form onSubmit={handleGenerate} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium flex items-center gap-1">
                Website URL
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0} className="outline-none">
                      <InfoCircledIcon className="w-4 h-4 text-zinc-400 cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Enter the full URL of the website you want to extract
                    markdown from.
                  </TooltipContent>
                </Tooltip>
              </label>
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
                className="mt-4 p-4 rounded-lg border border-red-200 bg-red-50"
              >
                <p className="text-sm text-red-600">{error}</p>
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
                  className="border-t border-zinc-200 pt-8"
                >
                  {isLoading ? (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-semibold tracking-tighter text-center">
                        {cyclingUnstructuredMessage}
                      </h2>
                      <div className="w-full p-6 rounded-lg border border-zinc-200 bg-white/80 backdrop-blur-sm">
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
                      <h2 className="text-2xl font-semibold tracking-tighter text-center">
                        Generated Markdown
                      </h2>
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
