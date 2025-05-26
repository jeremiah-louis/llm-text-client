'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateMarkdown } from '@/lib/api';
import { MarkdownPreview } from '@/components/markdown-preview';
import { Skeleton } from '@/components/ui/skeleton';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export function UrlToMarkdown() {
  const [url, setUrl] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle viewport height for mobile browsers
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

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
    <div className="w-full">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        {/* Input Form */}
        <div className="w-full max-w-xl mx-auto">
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1">
              <Input
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full h-12 text-base bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className={`
                relative w-full sm:w-auto h-12 px-6 text-base font-medium rounded-lg
                transition-all duration-200 ease-out
                bg-gradient-to-r from-blue-600 to-blue-500
                dark:from-blue-500 dark:to-blue-400
                hover:from-blue-500 hover:to-blue-400
                dark:hover:from-blue-400 dark:hover:to-blue-300
                text-white dark:text-white
                shadow-lg shadow-blue-500/20 dark:shadow-blue-400/20
                hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-400/30
                disabled:opacity-70 disabled:cursor-not-allowed
                disabled:hover:shadow-lg disabled:hover:from-blue-600 disabled:hover:to-blue-500
                dark:disabled:hover:from-blue-500 dark:disabled:hover:to-blue-400
                overflow-hidden
              `}
            >
              <span className="relative z-10">
                {isLoading ? 'Generating...' : 'Generate'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 dark:from-blue-300 dark:to-blue-200 opacity-0 hover:opacity-20 transition-opacity duration-200" />
            </Button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/50 dark:border-red-800"
              >
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {(isLoading || markdown) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                opacity: { duration: 0.2 }
              }}
              className="mt-8 sm:mt-12 overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 }}
                className="border-t border-zinc-200 dark:border-zinc-800 pt-8"
              >
                {isLoading ? (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-center">Generating Markdown...</h2>
                    <div className="w-full p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
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
                    <h2 className="text-lg font-semibold text-center">Generated Markdown</h2>
                    <MarkdownPreview markdown={markdown} />
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 