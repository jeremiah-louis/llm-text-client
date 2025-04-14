import { Tiles } from "@/components/ui/tiles"
import { UrlToMarkdown } from "@/components/url-to-markdown"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent dark:from-zinc-950/50 dark:to-transparent" />
        <Tiles 
          className="absolute inset-0 opacity-75 dark:opacity-75"
          rows={10}
          cols={10}
          tileSize="lg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 dark:to-black/50" />
      </div>

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
        <section className="flex flex-col items-center justify-center py-8 sm:py-12">
          <div className="max-w-3xl mx-auto text-center space-y-4 px-4 sm:px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] sm:leading-[1.1]">
              Turn websites into{" "}
              <span className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-600 blur-2xl opacity-20" />
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-600">
                  Markdown
                </span>
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
              Convert your website into clean Markdown, perfect for powering your LLM applications.
            </p>
          </div>

          {/* URL Input Section */}
          <div className="w-full mt-8 sm:mt-12">
            <UrlToMarkdown />
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
                className="object-contain"
              />
            </div>
            Wetrocloud
          </Link>
        </footer>
      </div>
    </main>
  )
}
