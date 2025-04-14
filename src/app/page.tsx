import { Tiles } from "@/components/ui/tiles"
import { UrlToMarkdown } from "@/components/url-to-markdown"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-zinc-950" /> */}
        <Tiles 
          className="absolute inset-0 opacity-75"
          rows={10}
          cols={10}
          tileSize="lg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 dark:to-black/50" />
        {/* <div className="absolute inset-0 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-[1px]" /> */}
      </div>

      {/* Header */}
      <header className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link 
            href="https://wetrocloud.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/Logo-wetrocloud.svg"
              alt="Wetrocloud"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-lg font-semibold">
              Wetrocloud
            </span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center pt-12 sm:pt-20 pb-12">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 px-4 sm:px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] sm:leading-[1.1]">
              Turn websites into{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                Markdown
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground/80 max-w-lg mx-auto">
              Convert your website into clean Markdown, perfect for powering your LLM applications.
            </p>
          </div>

          {/* URL Input Section */}
          <div className="w-full mt-12 sm:mt-16">
            <UrlToMarkdown />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 px-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Powered by{" "}
          <Link 
            href="https://wetrocloud.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center font-medium hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            <Image
              src="/icon.svg"
              alt="WetroCloud"
              width={16}
              height={16}
              className="w-4 h-4 mr-1"
            />
            WetroCloud
          </Link>
        </footer>
      </div>
    </main>
  )
}
