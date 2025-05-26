"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

import { Highlight, Language } from "prism-react-renderer";
import { themes } from "prism-react-renderer";

export interface CodeSnippet {
  title: string; // Tab title e.g. "Python"
  language?: string; // Reserved for syntax highlighting libraries
  code: string;
}

interface CodeBlockSnippetProps {
  windowTitle?: string;
  snippets?: CodeSnippet[];
}

// Default example snippets (fallback)
const defaultSnippets: CodeSnippet[] = [
  {
    title: "Python",
    language: "python",
    code: `# pip install wetro
import requests

url = "https://api.wetrocloud.com/v2/markdown-converter/"

payload = {
  'link': 'https://docs.wetrocloud.com/quickstart',
  'resource_type': 'web'
}
headers = {
  'Authorization': 'Token <YOUR_API_KEY>'
}

response = requests.post(url, headers=headers, data=payload)
print(response.text)`,
  },
  {
    title: "Node.js",
    language: "javascript",
    code: `//npm install wetro-sdk
import Wetrocloud from "wetro-sdk";

// Initialize the Wetrocloud client
const client = new Wetrocloud({
  apiKey: "your_api_key"
});

// Insert a file into a Collection
const response = await client.markDownConverter({
  resource: "https://docs.wetrocloud.com/quickstart",
  resource_type: "web"
});

console.log("converted to markdown", response);`,
  },
  {
    title: "cURL",
    language: "bash",
    code: `curl --location 'https://api.wetrocloud.com/v2/markdown-converter/' \\
--header 'Authorization: Token <YOUR_API_KEY>' \\
--form 'link="https://docs.wetrocloud.com/quickstart"' \\
--form 'resource_type="web"'`,
  },
];

export default function CodeBlockSnippet({
  windowTitle = "Code Example",
  snippets = defaultSnippets,
}: CodeBlockSnippetProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      /* eslint-disable no-console */
      console.error("Failed to copy: ", err);
    }
  };

  // Use the first snippet title as default tab value
  const defaultValue = snippets[0]?.title ?? "";

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-semibold tracking-tighter mb-3 text-center">
        Get Started with our{" "}
        <span className="text-blue-500 dark:text-blue-400 italic">SDKs</span>
      </h2>
      <p className="text-center tracking-tighter text-gray-600 mb-8">
        We offer SDKs for popular programming languages to help you get started
        with data extraction quickly.
      </p>
      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue={defaultValue} className="w-full">
          {/* macOS window frame */}
          <div className="rounded-lg shadow-lg border bg-background overflow-hidden">
            {/* Window bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-100 dark:bg-zinc-800">
              <div className="flex items-center gap-2">
                {/* Traffic lights */}
                <span className="size-3 rounded-full bg-red-500 inline-block" />
                <span className="size-3 rounded-full bg-yellow-500 inline-block" />
                <span className="size-3 rounded-full bg-green-500 inline-block" />
                {windowTitle && (
                  <span className="ml-4 text-xs font-medium text-muted-foreground select-none">
                    {windowTitle}
                  </span>
                )}
              </div>
              {/* Tab triggers */}
              <TabsList className="bg-transparent p-0 gap-2 shadow-none">
                {snippets.map((snip) => (
                  <TabsTrigger
                    key={snip.title}
                    value={snip.title}
                    className="rounded-md px-3 py-1.5 text-xs font-medium data-[state=active]:bg-white/80 dark:data-[state=active]:bg-zinc-700"
                  >
                    {snip.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Code panes */}
            {snippets.map((snip, idx) => (
              <TabsContent
                key={snip.title}
                value={snip.title}
                className="p-4 md:p-6"
              >
                <div className="relative">
                  {/* Copy button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(snip.code, idx)}
                    className="absolute right-2 top-2 h-7 w-7 bg-white dark:bg-zinc-800"
                  >
                    {copiedIndex === idx ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                  <Highlight
                    theme={themes.nightOwlLight}
                    code={snip.code.trim()}
                    language={(snip.language || "bash") as Language}
                  >
                    {({
                      className,
                      style,
                      tokens,
                      getLineProps,
                      getTokenProps,
                    }: any) => (
                      <pre
                        className={`${className} text-xs md:text-sm font-mono leading-relaxed overflow-auto p-4`}
                        style={style}
                      >
                        {tokens.map((line: any, i: number) => {
                          const lineProps = getLineProps({ line });

                          // Remove key from spread and pass it directly
                          const { key: _lineKey, ...cleanLineProps } =
                            lineProps;

                          return (
                            <div key={i} {...cleanLineProps}>
                              {line.map((token: any, key: number) => {
                                const { key: _tokenKey, ...tokenProps } =
                                  getTokenProps({ token, key });
                                return <span key={key} {...tokenProps} />;
                              })}
                            </div>
                          );
                        })}
                      </pre>
                    )}
                  </Highlight>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
