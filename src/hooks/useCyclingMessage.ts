import { useState, useEffect } from "react";

export function useCyclingMessage(messages: string[], intervalMs: number = 1500) {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [messages, intervalMs]);

  return message;
} 