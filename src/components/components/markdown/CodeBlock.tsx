'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { CodeBlockProps } from './types';

export const CodeBlock = ({ 
  className, 
  children, 
  inline = false,
  language 
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(String(children));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) {
    return (
      <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono wrap-break-words">
        {children}
      </code>
    );
  }

  return (
    <div className="relative my-6 md:my-8 group">
      {language && (
        <div className="flex justify-between items-center px-4 py-2 bg-gray-900 text-gray-300 text-xs rounded-t-lg">
          <span className="uppercase">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 hover:text-white transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <pre className={`
        bg-[#0d1117] text-gray-100 p-4 md:p-6 
        rounded-lg md:rounded-xl overflow-x-auto 
        text-sm md:text-base leading-relaxed
        ${language ? 'rounded-t-none' : 'rounded-lg'}
      `}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};