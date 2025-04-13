import { generateMarkdown } from './api';

async function testGenerateMarkdown() {
  try {
    const testUrl = 'https://example.com';
    console.log('Testing with URL:', testUrl);
    
    const markdown = await generateMarkdown(testUrl);
    console.log('Generated Markdown:', markdown);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testGenerateMarkdown(); 