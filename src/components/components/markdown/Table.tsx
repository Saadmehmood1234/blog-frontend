'use client';

import { 
  TableProps, 
  TableRowProps, 
  TableCellProps, 
  TableHeaderProps, 
  TableBodyProps 
} from './types';
import { useState } from "react";

export const Table = ({ children, className = '', ...props }: TableProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <div className="relative my-8">
      <div
        className="overflow-x-auto scrollbar-hide"
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
      >
        <table 
          className={`w-full border-collapse text-sm md:text-base ${className}`}
          {...props}
        >
          {children}
        </table>
      </div>

      {/* Scroll indicators */}
      {scrollPosition > 0 && (
        <div
          className="absolute inset-y-0 left-0 w-4 bg-linear-to-r from-background to-transparent 
                    opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
        />
      )}
      <div
        className="absolute inset-y-0 right-0 w-4 bg-linear-to-l from-background to-transparent 
                    opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
      />
    </div>
  );
};

export const TableCell = ({ 
  as: Component = 'td', 
  children, 
  className = '', 
  ...props 
}: TableCellProps) => {
  const isHeader = Component === 'th';
  
  return (
    <Component
      className={`
        px-3 md:px-4 py-2 md:py-3 border border-border 
        text-sm md:text-base
        ${isHeader ? 'font-semibold bg-secondary/30' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export const TableRow = ({ 
  children, 
  className = '', 
  ...props 
}: TableRowProps) => {
  return (
    <tr 
      className={`even:bg-secondary/20 hover:bg-secondary/30 transition-colors ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
};

export const TableHeader = ({ 
  children, 
  className = '', 
  ...props 
}: TableHeaderProps) => {
  return (
    <thead 
      className={`bg-secondary/30 ${className}`}
      {...props}
    >
      {children}
    </thead>
  );
};

export const TableBody = ({ 
  children, 
  className = '', 
  ...props 
}: TableBodyProps) => {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
};