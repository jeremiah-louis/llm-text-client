import confetti from "canvas-confetti";
import { generateMarkdown } from "@/lib/api";

/**
 * Triggers confetti animation on successful markdown generation.
 */
export function triggerConfetti() {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 30,
  } as const;
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  function shoot() {
    confetti({
      ...defaults,
      particleCount: 50,
      scalar: 1.2,
      colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
    });
    confetti({
      ...defaults,
      particleCount: 30,
      scalar: 0.75,
      colors: ["#ffffff", "#f0f0f0"],
    });
  }
  for (let i = 0; i < 5; i++) {
    setTimeout(shoot, randomInRange(0, 250));
  }
}

/**
 * Validate a string and ensure it is a proper http/https URL.
 * Returns the normalized URL instance or an error message string.
 */
export function validateUrl(raw: string): URL | string {
  if (!raw) return "Please enter a URL";
  try {
    const candidate = new URL(raw);
    if (!candidate.protocol.startsWith("http")) {
      return "URL must start with http:// or https://";
    }
    return candidate;
  } catch {
    return "Please enter a valid URL (e.g., https://example.com)";
  }
}

/**
 * Handles the markdown generation process for the Web tab.
 * Updates state via provided setters.
 */
export async function handleGenerate(
  e: React.FormEvent,
  url: string,
  setError: (msg: string | null) => void,
  setIsLoading: (v: boolean) => void,
  setMarkdown: (v: string) => void,
  triggerConfetti: () => void
) {
  e.preventDefault();
  const validation = validateUrl(url);
  if (typeof validation === "string") {
    setError(validation);
    return;
  }
  const validUrl = validation;
  setIsLoading(true);
  setError(null);
  setMarkdown("");
  try {
    const generatedMarkdown = await generateMarkdown(validUrl.toString());
    if (generatedMarkdown) {
      setMarkdown(generatedMarkdown);
      triggerConfetti();
    } else {
      throw new Error("Failed to generate markdown content");
    }
  } catch (err: any) {
    console.error("Error:", err);
    setError(err instanceof Error ? err.message : "Failed to generate markdown. Please try again.");
    setMarkdown("");
  } finally {
    setIsLoading(false);
  }
} 