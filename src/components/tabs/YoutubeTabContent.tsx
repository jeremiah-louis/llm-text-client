"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface YoutubeTabContentProps {
  url: string;
  setUrl: (url: string) => void;
  isLoading: boolean;
  error: string | null;
  transcript: string;
  handleGenerate: (e: React.FormEvent) => void;
}

export function YoutubeTabContent({
  url,
  setUrl,
  isLoading,
  error,
  transcript,
  handleGenerate,
}: YoutubeTabContentProps) {
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
                  Processing...
                </>
              ) : (
                "Get Transcript"
              )}
            </Button>
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
      </form>
      
      {transcript && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Transcript</h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm">{transcript}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
