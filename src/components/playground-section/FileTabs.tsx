"use client";
import React, { useState, FormEvent, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WebTabContent } from "../tabs/WebTabContent";
import { YoutubeTabContent } from "../tabs/YoutubeTabContent";
import { triggerConfetti, handleGenerate as handleGenerateHelper, handleStructuredGenerate } from "@/lib/webTabHelpers";
import { fetchYoutubeTranscript } from "@/lib/youtubeTabHelpers";

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

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
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Generate a random 60-character collection ID
  const generateCollectionId = useCallback(() => {
    return Array.from({ length: 60 }, () => 
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[
        Math.floor(Math.random() * 62)
      ]
    ).join('');
  }, []);

  // Handle chat message submission
  const handleChatSubmit = async (query: string) => {
    if (!collectionId) return;
    
    const userMessage: Message = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setIsChatLoading(true);
    
    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collection_id: collectionId,
          request_query: query,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || 'No response from assistant' }]);
    } catch (error) {
      console.error('Error querying collection:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request.' 
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Process YouTube video and create collection
  const processYoutubeVideo = async (videoUrl: string) => {
    setStatus('Creating collection...');
    const newCollectionId = generateCollectionId();
    
    try {
      // Create collection
      const collectionResponse = await fetch('/api/collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection_id: newCollectionId }),
      });
      
      if (!collectionResponse.ok) {
        throw new Error('Failed to create collection');
      }
      
      setCollectionId(newCollectionId);
      setStatus('Processing video...');
      
      // Insert YouTube video
      const insertResponse = await fetch('/api/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collection_id: newCollectionId,
          resource: videoUrl,
          resource_type: 'youtube',
        }),
      });
      
      if (!insertResponse.ok) {
        throw new Error('Failed to process video');
      }
      
      setStatus('Video processed successfully');
      setTimeout(() => setStatus(null), 2000);
      
    } catch (error) {
      console.error('Error processing video:', error);
      setError(error instanceof Error ? error.message : 'Failed to process video');
      setStatus(null);
    }
  };

  /**
   * Handles the YouTube video processing
   */
  const handleYoutubeGenerate = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      // First get the transcript
      await fetchYoutubeTranscript(
        url,
        setError,
        setIsLoading,
        setYoutubeTranscript
      );
      
      // Then process the video for chat
      await processYoutubeVideo(url);
    } catch (error) {
      console.error('Error in YouTube generation:', error);
      setError('Failed to process YouTube video');
    } finally {
      setIsLoading(false);
    }
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
          status={status || undefined}
          transcript={youtubeTranscript}
          handleGenerate={handleYoutubeGenerate}
          collectionId={collectionId || undefined}
          onChatSubmit={handleChatSubmit}
          messages={messages}
          isChatLoading={isChatLoading}
        />
      </TabsContent>
      <TabsContent value="audio">
        <div className="text-center">Audio tab coming soon...</div>
      </TabsContent>
    </Tabs>
  );
}
