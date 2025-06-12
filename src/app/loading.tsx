'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        // Simulate progress with a slight random variation
        const increment = Math.random() * 15;
        const newProgress = Math.min(prevProgress + increment, 100);
        
        if (newProgress >= 100) {
          clearInterval(timer);
        }
        return newProgress;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <div className="mb-2 flex justify-between text-sm text-muted-foreground">
          <span>Loading...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
          />
        </div>
      </div>
    </div>
  );
} 