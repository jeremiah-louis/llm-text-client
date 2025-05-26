import { UrlToMarkdown } from "@/components/url-to-markdown"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/animated-hero"
import { CodeBlock, CodeBlockGroup, CodeBlockCode } from "@/components/ui/code-block"
import Background from "@/components/background"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background */}
      <Background />
      {/* Header */}
      <header className="w-full py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link 
            href="https://wetrocloud.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative w-8 h-8">
              <Image
                src="/Logo-wetrocloud.svg"
                alt="Wetrocloud"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400">
              Wetrocloud
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <Hero />
        {/* URL Input Section */}
        <UrlToMarkdown />
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Get Started with Our SDK
            </h2>
            <CodeBlock>
              <CodeBlockGroup>
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  npm install @wetrocloud/url-to-markdown
                </div>
              </CodeBlockGroup>
              <CodeBlockCode
                code={`import { WetrocloudClient } from '@wetrocloud/url-to-markdown';

// Initialize the client with your API key
const client = new WetrocloudClient({
  apiKey: 'your-api-key-here'
});

// Convert a URL to markdown
async function convertToMarkdown() {
  try {
    const result = await client.convert({
      url: 'https://example.com/article',
      options: {
        includeImages: true,
        includeLinks: true,
        format: 'markdown'
      }
    });
    
    console.log(result.markdown);
  } catch (error) {
    console.error('Error:', error);
  }
}`}
                language="typescript"
              />
            </CodeBlock>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-4 px-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Powered by{" "}
          <Link 
            href="https://wetrocloud.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center font-medium hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            <div className="relative w-4 h-4 mr-1">
              <Image
                src="/Logo-wetrocloud.svg"
                alt="Wetrocloud"
                fill
                className="object-contain mt-1"
              />
            </div>
            <span className="mt-2">Wetrocloud</span>
          </Link>
        </footer>
      </div>
    </main>
  )
}
