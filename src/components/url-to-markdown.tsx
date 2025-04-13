'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateMarkdown } from '@/lib/api';
import { MarkdownPreview } from '@/components/markdown-preview';
import { Skeleton } from '@/components/ui/skeleton';
import confetti from 'canvas-confetti';

export function UrlToMarkdown() {
  const [url, setUrl] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerConfetti = () => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0.8,
      decay: 0.94,
      startVelocity: 30,
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 50,
        scalar: 1.2,
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
      });

      confetti({
        ...defaults,
        particleCount: 30,
        scalar: 0.75,
        colors: ['#ffffff', '#f0f0f0'],
      });
    }

    for (let i = 0; i < 5; i++) {
      setTimeout(shoot, randomInRange(0, 250));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    let validUrl: URL;
    try {
      validUrl = new URL(url);
      if (!validUrl.protocol.startsWith('http')) {
        throw new Error('URL must start with http:// or https://');
      }
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMarkdown('');

    try {
      const generatedMarkdown = await generateMarkdown(validUrl.toString());
      if (generatedMarkdown) {
        setMarkdown(generatedMarkdown);
        triggerConfetti();
      } else {
        throw new Error('Failed to generate markdown content');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate markdown. Please try again.');
      setMarkdown('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md mx-auto items-center gap-2 sm:gap-3">
        <div className="relative w-full">
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-1 w-full h-10 sm:h-12 text-base sm:text-lg rounded-lg sm:rounded-xl"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-10 sm:h-12 text-base sm:text-lg rounded-lg sm:rounded-xl bg-zinc-900 hover:bg-zinc-800"
        >
          {isLoading ? 'Generating...' : 'Start for free'}
        </Button>
      </form>

      {error && (
        <div className="text-red-500 rounded-lg border border-red-200 p-3 sm:p-4 bg-red-50 dark:bg-red-950 dark:border-red-800">
          <p className="text-sm sm:text-base font-medium">{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Generating Markdown...</h2>
          <div className="w-full p-4 sm:p-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <div className="space-y-2 sm:space-y-3">
              <Skeleton className="h-3 sm:h-4 w-3/4" />
              <Skeleton className="h-3 sm:h-4 w-full" />
              <Skeleton className="h-3 sm:h-4 w-2/3" />
              <Skeleton className="h-3 sm:h-4 w-full" />
              <Skeleton className="h-3 sm:h-4 w-5/6" />
            </div>
          </div>
        </div>
      )}

      {!isLoading && markdown && (
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Generated Markdown</h2>
          <MarkdownPreview markdown={markdown} />
        </div>
      )}
    </div>
  );
} 