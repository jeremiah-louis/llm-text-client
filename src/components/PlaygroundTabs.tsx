"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WebTabContent } from "./tabs/WebTabContent";
import {
  triggerConfetti,
  handleGenerate as handleGenerateHelper,
  handleStructuredGenerate,
} from "@/lib/webTabHelpers";

/**
 * FileTabs: Main tabbed interface for file, web, audio, and youtube content.
 * Delegates Web tab UI to WebTabContent and uses shared helpers for API interactions.
 */
export function PlaygroundTabs() {
  // Shared state for Web tab
  const [structured, setStructured] = useState(false);
  const [url, setUrl] = useState("");
  const [structuredText, setStructuredText] = useState("");

  // Unstructured markdown result state
  const [markdown, setMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Structured data result state
  const [structuredData, setStructuredData] = useState("");
  const [isStructuredLoading, setIsStructuredLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  /**
   * Handles markdown generation for unstructured mode.
   */
  const handleGenerate = (e: React.FormEvent) => {
    handleGenerateHelper(e, url, setError, setIsLoading, setMarkdown, triggerConfetti);
  };

  /**
   * Handles structured data extraction when structured mode is enabled.
   */
  const handleStructured = (e: React.FormEvent) => {
    handleStructuredGenerate(
      e,
      url,
      structuredText,
      setError,
      setIsStructuredLoading,
      setStructuredData,
      triggerConfetti,
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
        <div className="text-center text-gray-400 py-12 text-lg font-medium">
          Files & Images tab coming soon...
        </div>
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
          structuredData={structuredData}
          isStructuredLoading={isStructuredLoading}
          handleGenerate={handleGenerate}
          handleStructuredGenerate={handleStructured}
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