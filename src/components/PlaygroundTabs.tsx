"use client";
import React, { useState, FormEvent, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WebTabContent } from "@/components/tabs/WebTabContent";
import { YoutubeTabContent } from "@/components/tabs/YoutubeTabContent";
import { triggerConfetti, handleGenerate as handleGenerateHelper, handleStructuredGenerate } from "@/lib/webTabHelpers";
import { fetchYoutubeTranscript, extractVideoId, isValidYoutubeUrl } from "@/lib/youtubeTabHelpers";
import { generateCollectionId } from "@/lib/utils";

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
export function PlaygroundTabs() {
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
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeTranscript, setYoutubeTranscript] = useState("");
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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
    // Clear previous state
    setError(null);
    setMessages([]);
    setStatus('Initializing...');
    setIsProcessing(true);
    
    try {
      // Validate URL first
      if (!isValidYoutubeUrl(videoUrl)) {
        throw new Error('Please enter a valid YouTube URL. Example: https://www.youtube.com/watch?v=...');
      }
      
      const newCollectionId = generateCollectionId();
      
      // Step 1: Create collection
      setStatus('Creating collection...');
      const collectionResponse = await fetch('/api/collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection_id: newCollectionId }),
      });
      
      if (!collectionResponse.ok) {
        const errorData = await collectionResponse.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create collection');
      }
      
      // Step 2: Insert YouTube video
      setStatus('Processing video... This may take a moment...');
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
        const errorData = await insertResponse.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to process video');
      }
      
      // Step 3: Fetch transcript
      setStatus('Fetching transcript...');
      
      // Fetch transcript and handle errors
      try {
        const transcript = await fetchYoutubeTranscript(videoUrl);
        setYoutubeTranscript(transcript);
      } catch (error) {
        console.error('Transcript error:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch transcript');
      }
      
      // Only complete the process if all steps succeeded
      setCollectionId(newCollectionId);
      setStatus(null);
      
      // Focus the chat input in the next tick to ensure the input is rendered
      requestAnimationFrame(() => {
        const chatInput = document.querySelector('input[type="text"]') as HTMLInputElement | null;
        chatInput?.focus();
      });
      
    } catch (error) {
      console.error('Error processing video:', error);
      setError(error instanceof Error ? error.message : 'Failed to process video');
      setCollectionId(null);
    } finally {
      setIsProcessing(false);
      setStatus(null);
    }
  };

  /**
   * Handles the YouTube video processing
   */
  const handleYoutubeGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return; // Prevent multiple submissions
    await processYoutubeVideo(youtubeUrl);
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
          url={youtubeUrl}
          setUrl={setYoutubeUrl}
          isLoading={activeTab === 'youtube' && (isLoading || isProcessing)}
          error={activeTab === 'youtube' ? error : null}
          status={activeTab === 'youtube' ? status : undefined}
          isInsertComplete={!!collectionId && !isProcessing}
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
