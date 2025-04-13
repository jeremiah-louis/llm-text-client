import { Tiles } from "@/components/ui/tiles"
import { UrlToMarkdown } from "@/components/url-to-markdown"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-zinc-950" /> */}
        <Tiles 
          className="absolute inset-0 "
          rows={200}
          cols={200}
          tileSize="lg"
        />
        {/* <div className="absolute inset-0 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-[1px]" /> */}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center pt-20 sm:pt-28 pb-12">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 px-4 sm:px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] sm:leading-[1.1]">
              Turn websites into{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
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
        Built with ❤️ by <a href="https://wetrocloud.com" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">Wetrocloud</a>
        </footer>
      </div>
    </main>
  )
}
