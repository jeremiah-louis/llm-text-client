"use client";
import React, { useState, FormEvent } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WebTabContent } from "../tabs/WebTabContent";
import { YoutubeTabContent } from "../tabs/YoutubeTabContent";
import { triggerConfetti, handleGenerate as handleGenerateHelper, handleStructuredGenerate } from "@/lib/webTabHelpers";
import { fetchYoutubeTranscript } from "@/lib/youtubeTabHelpers";

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
  // State for active tab and structured output toggle
  const [activeTab, setActiveTab] = useState("web");
  const [structured, setStructured] = useState(false);
  const [url, setUrl] = useState("");
  const [structuredText, setStructuredText] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // structured output results
  const [structuredData, setStructuredData] = useState("");
  const [isStructuredLoading, setIsStructuredLoading] = useState(false);
  const [youtubeTranscript, setYoutubeTranscript] = useState("");

  /**
   * Handles the YouTube transcript generation
   */
  const handleYoutubeGenerate = async (e: FormEvent) => {
    e.preventDefault();
    await fetchYoutubeTranscript(
      url,
      setError,
      setIsLoading,
      setYoutubeTranscript
    );
  };

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
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-2xl mx-auto mt-8">
      {/* Mobile dropdown */}
      <div className="mb-4 md:hidden">
        <select
          value={activeTab}
          onChange={(e)=>setActiveTab(e.target.value)}
          className="w-full rounded-md border bg-background py-2 px-3 text-sm"
        >
          <option value="web">Web</option>
          <option value="youtube">Youtube</option>
          <option value="files">Files & Images</option>
          <option value="audio">Audio</option>
        </select>
      </div>
      {/* Desktop tab list */}
      <TabsList className="hidden md:flex mb-4 py-7 gap-2">
        <TabsTrigger value="web">Web</TabsTrigger>
        <TabsTrigger value="youtube">Youtube</TabsTrigger>
        <TabsTrigger value="files">Files & Images</TabsTrigger>
        <TabsTrigger value="audio">Audio</TabsTrigger>
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
          structuredData={structuredData}
          isStructuredLoading={isStructuredLoading}
          handleGenerate={handleGenerate}
          handleStructuredGenerate={handleStructured}
        />
      </TabsContent>
      <TabsContent value="youtube">
        <YoutubeTabContent
          url={url}
          setUrl={setUrl}
          isLoading={isLoading}
          error={error}
          transcript={youtubeTranscript}
          handleGenerate={handleYoutubeGenerate}
        />
      </TabsContent>
      <TabsContent value="audio">
        <div className="text-center">Audio tab coming soon...</div>
      </TabsContent>
    </Tabs>
  );
}
