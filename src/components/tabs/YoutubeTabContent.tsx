"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, MessageSquare, FileText, Copy, Check } from "lucide-react";
import { extractVideoId } from "@/lib/youtubeTabHelpers";
import { cn } from "@/lib/utils";

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
  isInsertComplete?: boolean;
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
  isInsertComplete = false,
  onChatSubmit,
  messages = [],
  isChatLoading = false,
}: YoutubeTabContentProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'transcript'>('chat');
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const transcriptRef = useRef<HTMLPreElement>(null);
  const videoId = url ? extractVideoId(url) : null;

  const copyToClipboard = () => {
    if (!transcriptRef.current) return;
    
    navigator.clipboard.writeText(transcriptRef.current.innerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userQuery = query.trim();
    if (!userQuery || !onChatSubmit) return;
    
    setQuery('');
    try {
      await onChatSubmit(userQuery);
    } catch (err) {
      console.error('Error submitting chat:', err);
    }
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
                  {'Processing...'}
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
      
      {/* Video preview - Only show after insert is complete */}
      {videoId && collectionId && isInsertComplete && (
        <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="w-32 h-20 flex-shrink-0 rounded overflow-hidden relative">
            <Image 
              src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} 
              alt="Video thumbnail"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" title={url}>
              {url}
            </p>
          </div>
        </div>
      )}
      
      {/* Processing indicator - Only show while loading */}
      {isLoading && !collectionId && (
        <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          <span>{status || 'Processing video...'}</span>
        </div>
      )}
      
      {/* Tabs - Only show after insert is complete */}
      {collectionId && isInsertComplete && (
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

      {activeTab === 'chat' && collectionId && (
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
      )}

      {activeTab === 'transcript' && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Transcript</h3>
            {transcript && (
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            )}
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md max-h-[500px] overflow-y-auto">
            {transcript ? (
              <pre ref={transcriptRef} className="whitespace-pre-wrap text-sm">{transcript}</pre>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No transcript available for this video
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
