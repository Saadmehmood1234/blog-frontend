"use client";

import { Suspense } from "react";
interface BlogContentProps {
  content: string;
}

export const BlogContent = ({ content }: BlogContentProps) => {
  return (
 <div className="prose prose-lg md:prose-xl prose-headings:font-display prose-headings:font-bold prose-p:leading-relaxed prose-img:rounded-xl prose-a:text-primary max-w-none">
      <Suspense fallback={<div>Loading content...</div>}>
        {/* <MarkdownRenderer content={content} /> */}
        <h1>Test</h1>
      </Suspense>
    </div>
  );
};
