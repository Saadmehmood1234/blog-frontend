'use client';

import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { ImageProps } from './types';

export const MarkdownImage = ({ 
  src, 
  alt = '', 
  title,
  className = '',
  ...props 
}: ImageProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!src) {
    return null;
  }

  return (
    <>
      <figure className={`my-6 md:my-10 relative group ${className}`}>
        <div className="relative overflow-hidden rounded-lg md:rounded-xl">
          <img
            src={src}
            alt={alt}
            title={title}
            className={`
              w-full h-auto object-contain
              transition-transform duration-300
              ${isZoomed ? 'scale-105' : 'hover:scale-[1.02]'}
            `}
            onClick={() => setIsZoomed(!isZoomed)}
            loading="lazy"
            {...props}
          />
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="absolute bottom-4 right-4 p-2 bg-black/50 text-white rounded-full 
                     opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
            type="button"
          >
            <ZoomIn size={20} />
          </button>
        </div>
        {(alt || title) && (
          <figcaption className="mt-3 text-center text-sm md:text-base text-muted-foreground">
            {title || alt}
          </figcaption>
        )}
      </figure>
      
      {/* Overlay for zoomed image */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </>
  );
};