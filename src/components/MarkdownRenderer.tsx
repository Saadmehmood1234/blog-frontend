import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import Image from "next/image";
interface MarkdownRendererProps {
  content: string;
}
const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mt-12 mb-6 text-4xl font-display font-black">
      {" "}
      {children}{" "}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 text-3xl font-display font-bold"> {children} </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-2xl font-display font-semibold">
      {" "}
      {children}{" "}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-6 leading-relaxed text-foreground/90"> {children} </p>
  ),

  /* -------- Links -------- */
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-4 hover:opacity-80"
    >
      {" "}
      {children}{" "}
    </a>
  ),

  /* -------- Lists -------- */

  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>
  ),

  /* -------- Images -------- */

  img: ({ src, alt }) => {
    const imageSrc = src instanceof Blob ? URL.createObjectURL(src) : src;

    return (
      <figure className="my-10">
        <Image
          src={imageSrc || ""}
          alt={alt || ""}
          width={800}
          height={500}
          className="mx-auto rounded-xl shadow-lg max-w-full"
          priority
        />

        {alt && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },

  /* -------- Blockquote / Callouts -------- */

  blockquote: ({ children }) => (
    <div className="my-8 rounded-xl border-l-4 border-primary bg-primary/5 px-6 py-4">
      {" "}
      <div className="text-sm uppercase tracking-wide text-primary mb-2">
        {" "}
        Note{" "}
      </div>{" "}
      <div className="text-foreground/90">{children}</div>{" "}
    </div>
  ),

  /* -------- Code -------- */

  code({ className, children }) {
    const language = className?.replace("language-", "");

    // Inline code
    if (!language) {
      return (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    }

    // Code block
    return (
      <div className="relative my-8">
        {language && (
          <span className="absolute top-2 right-3 text-xs text-muted-foreground">
            {language.toUpperCase()}
          </span>
        )}
        <pre className="bg-[#0d1117] text-white p-5 rounded-xl overflow-x-auto text-sm shadow-lg">
          <code className={className}>{children}</code>
        </pre>
      </div>
    );
  },
};

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="prose prose-lg md:prose-xl max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
