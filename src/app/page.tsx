import { Tiles } from "@/components/ui/tiles"
import { UrlToMarkdown } from "@/components/url-to-markdown"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start py-24 gap-24">
      <Tiles className="absolute inset-0" />
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 sm:gap-8 max-w-2xl mx-auto text-center px-4">
        <div className="space-y-2">
          <h1 className="text-6xl sm:text-6xl md:text-7xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
            Turn websites into{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Markdown
            </span>
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-muted-foreground/80 max-w-lg">
          Generate clean markdown from any website and use it in your LLM apps.
        </p>
        <UrlToMarkdown />
      </div>
    </main>
  )
}
