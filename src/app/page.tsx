import { UrlToMarkdown } from "@/components/url-to-markdown"
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/animated-hero"
import Background from "@/components/background"
import Header from "@/components/header"
import CodeBlockSnippet from "@/components/code-block-snippet"
import { Footer } from "@/components/footer"
import { FileTabs } from "@/components/FileTabs"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <Background />
      <Header />
      <div className="flex-1 flex flex-col">
        <Hero />
        {/* <CodeBlockSnippet /> */}
        {/* <UrlToMarkdown /> */}
        <div className="bg-[#F7F7F7] dark:bg-black/10 rounded-3xl p-8 mx-16 my-10">
          <h1 className="text-4xl font-semibold tracking-tighter text-center mb-3">Start <span className="text-blue-500 dark:text-blue-400 italic">Scraping</span> your data now</h1>
          <p className="text-center text-gray-600 mb-8">Scraping your data with AI shouldn't be hard. We make it easy.</p>
          <FileTabs />
        </div>
        <Footer />
      </div>
    </main>
  )
}
