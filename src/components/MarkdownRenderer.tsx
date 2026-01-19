// components/markdown/MarkdownRenderer.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Components } from 'react-markdown';
import { Heading } from './components/markdown/Heading';
import { CodeBlock } from './components/markdown/CodeBlock';
import { MarkdownImage } from './components/markdown/Image';
import { Link } from './components/markdown/Link';
import { Callout } from './components/markdown/Callout';
import { Table } from './components/markdown/Table';
import { ImageProps,isValidCalloutType } from './components/markdown/types';

interface MarkdownRendererProps {
  content: string;
}

// Custom remark plugin for custom components
const remarkCustomComponents = () => {
  return (tree: unknown) => {
    // Process custom component syntax
    if (typeof tree === 'object' && tree !== null) {
      // Process the AST tree here
    }
  };
};

const markdownComponents: Components = {
  // Headings - pass all props including HTML attributes
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  h4: (props) => <Heading level={4} {...props} />,
  h5: (props) => <Heading level={5} {...props} />,
  h6: (props) => <Heading level={6} {...props} />,

  // Paragraph
  p: ({ children, ...props }) => (
    <p 
      className="mb-4 md:mb-6 leading-relaxed text-foreground/90 text-sm md:text-base"
      {...props}
    >
      {children}
    </p>
  ),

  // Lists
  ul: ({ children, ...props }) => (
    <ul 
      className="list-disc pl-5 md:pl-6 mb-4 md:mb-6 space-y-2 md:space-y-3"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol 
      className="list-decimal pl-5 md:pl-6 mb-4 md:mb-6 space-y-2 md:space-y-3"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-2 text-sm md:text-base" {...props}>
      {children}
    </li>
  ),

  // Link
  a: (props) => <Link {...props} />,

  // Image
// In your markdownComponents in MarkdownRenderer.tsx
img: (props) => {
  // Create a filtered object without the node property
  const filteredProps: Record<string, unknown> = { ...props };
  delete filteredProps.node;
  
  return <MarkdownImage {...(filteredProps as ImageProps)} />;
},

  // Code
  code: ({ className, children, ...props }) => {
    const classString = className || '';
    const match = /language-(\w+)/.exec(classString);
    const language = match?.[1];
    const isInline = !classString.includes('language-');

    return (
      <CodeBlock
        className={classString}
        inline={isInline}
        language={language}
        {...props}
      >
        {String(children)}
      </CodeBlock>
    );
  },

  // Blockquote (Custom Callout)
  blockquote: ({ children, ...props }) => {
    const content = String(children);
    const calloutMatch = content.match(/^:::(\w+)(?:\[(.*?)\])?\n/);
    
    if (calloutMatch) {
      const type = calloutMatch[1];
      const title = calloutMatch[2];
      const calloutContent = content.replace(calloutMatch[0], '').replace(/\n:::$/, '');
      
      // Validate callout type
      const validType = isValidCalloutType(type) ? type : 'note';
      
      return (
        <Callout type={validType} title={title} {...props}>
          {calloutContent}
        </Callout>
      );
    }

    // Default blockquote
    return (
      <blockquote 
        className="my-4 md:my-6 pl-4 md:pl-6 border-l-4 border-border italic"
        {...props}
      >
        {children}
      </blockquote>
    );
  },

  // Table components
  table: (props) => <Table {...props} />,
  thead: ({ children, ...props }) => (
    <thead className="bg-secondary/30" {...props}>
      {children}
    </thead>
  ),
  tbody: (props) => <tbody {...props} />,
  tr: ({ children, ...props }) => (
    <tr 
      className="even:bg-secondary/20 hover:bg-secondary/30 transition-colors"
      {...props}
    >
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th 
      className="px-3 md:px-4 py-2 md:py-3 border border-border font-semibold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td 
      className="px-3 md:px-4 py-2 md:py-3 border border-border"
      {...props}
    >
      {children}
    </td>
  ),
};

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="markdown-content max-w-none">
      <div className="prose-sm md:prose-base lg:prose-lg prose-headings:font-display 
                    prose-headings:font-bold prose-a:text-primary 
                    prose-blockquote:border-primary/50 prose-blockquote:bg-primary/5
                    prose-table:border prose-table:border-border
                    prose-th:bg-secondary/30 prose-img:rounded-lg
                    prose-pre:bg-transparent max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkCustomComponents]}
          rehypePlugins={[rehypeHighlight]}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      </div>
      
      {/* Mobile responsive adjustments */}
      <style jsx>{`
        @media (max-width: 640px) {
          .markdown-content {
            font-size: 0.9375rem;
            line-height: 1.7;
          }
          
          .markdown-content pre {
            font-size: 0.8125rem;
            padding: 0.75rem;
          }
          
          .markdown-content table {
            display: block;
          }
          
          .markdown-content table tr {
            display: flex;
            flex-direction: column;
            margin-bottom: 1rem;
            border: 1px solid var(--border);
            border-radius: 0.5rem;
            padding: 0.75rem;
          }
          
          .markdown-content table td,
          .markdown-content table th {
            display: block;
            padding: 0.375rem 0;
            border: none;
            text-align: left;
          }
          
          .markdown-content table td::before,
          .markdown-content table th::before {
            content: attr(data-label);
            font-weight: 600;
            display: block;
            margin-bottom: 0.25rem;
            color: var(--muted-foreground);
          }
        }
      `}</style>
    </div>
  );
};

export {
  Heading,
  CodeBlock,
  MarkdownImage,
  Link,
  Callout,
  Table,
};