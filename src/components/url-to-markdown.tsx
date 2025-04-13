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
    <div className="w-full max-w-3xl mx-auto">
      {/* Input Form */}
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full h-12 sm:h-14 text-base sm:text-lg rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="h-12 sm:h-14 px-8 text-base sm:text-lg font-medium rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
          >
            {isLoading ? 'Generating...' : 'Generate 🫧'}
          </Button>
        </form>

        {error && (
          <div className="mt-4 text-red-500 rounded-xl border border-red-200 p-4 bg-red-50 dark:bg-red-950/50 dark:border-red-800">
            <p className="text-sm sm:text-base font-medium">{error}</p>
          </div>
        )}
      </div>

      {/* Results */}
      {(isLoading || markdown) && (
        <div className="mt-12 sm:mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-8 sm:pt-10">
          {isLoading ? (
            <div className="space-y-4 px-4 sm:px-6">
              <h2 className="text-lg sm:text-xl font-semibold text-center">Generating Markdown...</h2>
              <div className="w-full p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
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
              <h2 className="text-lg sm:text-xl font-semibold text-center px-4">Generated Markdown</h2>
              <MarkdownPreview markdown={markdown} />
            </div>
          )}
        </div>
      )}
    </div>
  );
} 