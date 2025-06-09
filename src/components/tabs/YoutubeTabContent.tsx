"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, MessageSquare, FileText } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface YoutubeTabContentProps {
  url: string;
  setUrl: (url: string) => void;
  isLoading: boolean;
  error: string | null;
  transcript: string;
  handleGenerate: (e: React.FormEvent) => void;
  status?: string;
  collectionId?: string;
  onChatSubmit?: (query: string) => Promise<void>;
  messages?: Message[];
  isChatLoading?: boolean;
}

export function YoutubeTabContent({
  url,
  setUrl,
  isLoading,
  error,
  transcript,
  handleGenerate,
  status,
  collectionId,
  onChatSubmit,
  messages = [],
  isChatLoading = false,
}: YoutubeTabContentProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'transcript'>('chat');
  const [query, setQuery] = useState('');

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !onChatSubmit) return;
    
    const userQuery = query;
    setQuery('');
    await onChatSubmit(userQuery);
  };



  return (
    <div className="space-y-4">
      <form onSubmit={handleGenerate} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="youtube-url" className="text-sm font-medium">
            YouTube Video URL
          </label>
          <div className="flex gap-2">
            <Input
              id="youtube-url"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" disabled={isLoading || !url.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {status || 'Processing...'}
                </>
              ) : (
                'Process Video'
              )}
            </Button>
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
      </form>
      
      {collectionId && (
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === 'chat' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare className="h-4 w-4" />
            Chat with Video
          </button>
          <button
            className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === 'transcript' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('transcript')}
          >
            <FileText className="h-4 w-4" />
            View Transcript
          </button>
        </div>
      )}

      {activeTab === 'chat' && collectionId ? (
        <div className="flex flex-col h-[400px] border rounded-lg overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                Ask questions about the video
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
            {isChatLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 rounded-bl-none">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div />
          </div>
          <form onSubmit={handleChatSubmit} className="border-t p-2">
            <div className="flex gap-2">
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question about the video..."
                className="flex-1"
                disabled={isChatLoading}
              />
              <Button type="submit" disabled={isChatLoading || !query.trim()}>
                {isChatLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Send'
                )}
              </Button>
            </div>
          </form>
        </div>
      ) : transcript ? (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Transcript</h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm">{transcript}</pre>
          </div>
        </div>
      ) : null}
    </div>
  );
}
