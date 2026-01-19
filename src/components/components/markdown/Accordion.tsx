'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AccordionProps } from './types';

export const Accordion = ({ 
  title, 
  children, 
  defaultOpen = false 
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="my-4 md:my-6 border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between 
                   bg-secondary/30 hover:bg-secondary/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-left font-semibold text-sm md:text-base">
          {title}
        </span>
        <ChevronDown 
          className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div 
        className={`px-4 md:px-6 overflow-hidden transition-all duration-300 ${
          isOpen ? 'py-4 md:py-6' : 'max-h-0 py-0'
        }`}
      >
        <div className="text-sm md:text-base text-foreground/90">
          {children}
        </div>
      </div>
    </div>
  );
};