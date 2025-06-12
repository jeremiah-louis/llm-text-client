import { Hero } from "@/components/hero-section/animated-hero"
import Header from "@/components/header"
import CodeBlockSnippet from "@/components/code-block-snippet"
import { Footer } from "@/components/footer"
import { PlaygroundTabs } from "@/components/PlaygroundTabs"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col">
        <Hero />
        <div className="bg-[#F7F7F7] rounded-3xl p-6 sm:p-8 sm:mx-16 my-10">
          <h1 className="text-4xl font-semibold tracking-tighter text-center mb-3">Start <span className="text-blue-500 italic">Scraping</span> your data now</h1>
          <p className="text-center tracking-tighter text-gray-600 mb-8">Scraping your data with AI shouldn't be hard. We make it easy.</p>
          <PlaygroundTabs />
        </div>
        <div className="bg-[#E6F0FF] rounded-3xl p-6 sm:p-8 sm:mx-16 my-10">
        <CodeBlockSnippet />
        </div>
        <Footer />
      </div>
    </main>
  )
}
