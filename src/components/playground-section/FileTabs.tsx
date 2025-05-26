"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WebTabContent } from "../tabs/WebTabContent";
import { triggerConfetti, validateUrl, handleGenerate as handleGenerateHelper } from "@/lib/webTabHelpers";

// Simple Toggle Switch
function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <span>{label}</span>
      <span className="relative inline-block w-10 h-6">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span
          className={`block w-10 h-6 rounded-full transition-colors duration-200 ${
            checked ? "bg-blue-500" : "bg-gray-300"
          }`}
        ></span>
        <span
          className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-4" : ""
          }`}
        ></span>
      </span>
    </label>
  );
}

/**
 * FileTabs: Main tabbed interface for file, web, audio, and youtube content.
 * Handles state and logic for the Web tab, delegates UI to WebTabContent.
 */
export function FileTabs() {
  // State for structured output toggle and form fields
  const [structured, setStructured] = useState(false);
  const [url, setUrl] = useState("");
  const [structuredText, setStructuredText] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the markdown generation process for the Web tab.
   * Delegates to the shared helper.
   */
  const handleGenerate = (e: React.FormEvent) => {
    handleGenerateHelper(
      e,
      url,
      setError,
      setIsLoading,
      setMarkdown,
      triggerConfetti
    );
  };

  return (
    <Tabs defaultValue="web" className="w-full max-w-2xl mx-auto mt-8">
      <TabsList className="mb-4 py-7">
        <TabsTrigger value="web">Web</TabsTrigger>
        <TabsTrigger value="files">Files & Images</TabsTrigger>
        <TabsTrigger value="audio">Audio</TabsTrigger>
        <TabsTrigger value="youtube">Youtube</TabsTrigger>
      </TabsList>
      <TabsContent value="files">
        <div className="text-center text-gray-400 py-12 text-lg font-medium">Files & Images tab coming soon...</div>
      </TabsContent>
      <TabsContent value="web">
        <WebTabContent
          structured={structured}
          setStructured={setStructured}
          url={url}
          setUrl={setUrl}
          structuredText={structuredText}
          setStructuredText={setStructuredText}
          isLoading={isLoading}
          error={error}
          markdown={markdown}
          handleGenerate={handleGenerate}
        />
      </TabsContent>
      <TabsContent value="audio">
        <div className="text-center">Audio tab coming soon...</div>
      </TabsContent>
      <TabsContent value="youtube">
        <div className="text-center">Youtube tab coming soon...</div>
      </TabsContent>
    </Tabs>
  );
}
