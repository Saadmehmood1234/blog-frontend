import { ReactNode, AnchorHTMLAttributes, ImgHTMLAttributes, HTMLAttributes, TableHTMLAttributes } from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

// Base interface for all markdown components
export interface MarkdownComponentProps {
  children?: ReactNode;
  className?: string;
  id?: string;
}

// ReactMarkdown specific types
export type ReactMarkdownNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: ReactMarkdownNode[];
  value?: string;
};

export interface ReactMarkdownComponentProps {
  node?: ReactMarkdownNode;
  children?: ReactNode;
  className?: string;
  [key: string]: unknown;
}

// Component-specific props
export interface CodeBlockProps {
  className?: string;
  children: string;
  inline?: boolean;
  language?: string;
}

// Image props - extend ImgHTMLAttributes for full compatibility
export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  title?: string;
}

// Link props - extend AnchorHTMLAttributes for full compatibility
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: ReactNode; // Make children optional
}

export interface CalloutProps {
  type?: 'note' | 'warning' | 'tip' | 'info';
  title?: string;
  children?: ReactNode; // Make children optional
}

export interface AccordionProps {
  title: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}

export interface StepProps {
  number: number;
  title: string;
  children?: ReactNode;
}

export interface CardProps {
  title?: string;
  icon?: ReactNode;
  variant?: 'default' | 'bordered' | 'filled';
  children?: ReactNode;
}

// Table props
export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children?: ReactNode;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
}

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  as?: 'td' | 'th';
  children?: ReactNode;
}


export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
}

// Callout types
export type CalloutType = 'note' | 'warning' | 'tip' | 'info';

// Type guard for callout types
export function isValidCalloutType(type: string): type is CalloutType {
  return ['note', 'warning', 'tip', 'info'].includes(type);
}

// MDX Content Rules
export const MDX_RULES = {
  HEADINGS: {
    h1: '# Heading 1 (single per page)',
    h2: '## Heading 2 (main sections)',
    h3: '### Heading 3 (subsections)',
    h4: '#### Heading 4',
    h5: '##### Heading 5',
    h6: '###### Heading 6',
  },
  CODE: {
    inline: '`code`',
    block: '```language\ncode\n```',
    supportedLanguages: ['javascript', 'typescript', 'python', 'bash', 'json', 'html', 'css', 'tsx', 'jsx'],
  },
  COMPONENTS: {
    callout: ':::note[Title]\nContent\n:::',
    card: ':::card[Title]\nContent\n:::',
    accordion: ':::accordion[Title]\nContent\n:::',
    steps: ':::steps\n1. Step 1\n2. Step 2\n:::',
    table: 'Use markdown table syntax',
  },
} as const;