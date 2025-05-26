import {
  CodeBlock,
  CodeBlockGroup,
  CodeBlockCode,
} from "@/components/ui/code-block";

export default function CodeBlockSnippet() {
  return (
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
  );
}
