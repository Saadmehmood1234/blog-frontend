// components/markdown/Link.tsx
import { LinkProps } from './types';
import { ExternalLink } from 'lucide-react';

export const Link = ({ 
  href, 
  children, 
  className = '',
  ...props 
}: LinkProps) => {
  const isExternal = href?.startsWith('http');
  
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center gap-1 text-primary hover:text-primary/80 
                 underline underline-offset-4 transition-colors ${className}`}
      {...props}
    >
      {children}
      {isExternal && <ExternalLink size={14} className="inline" />}
    </a>
  );
};