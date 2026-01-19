import { HeadingLevel, MarkdownComponentProps } from './types';
import { ReactNode } from 'react';

interface HeadingProps extends MarkdownComponentProps {
  level: HeadingLevel;
  id?: string;
  children?: ReactNode;
}

const levelClasses = {
  1: "mt-8 mb-6 text-3xl md:text-4xl lg:text-5xl",
  2: "mt-10 mb-5 text-2xl md:text-3xl lg:text-4xl",
  3: "mt-8 mb-4 text-xl md:text-2xl lg:text-3xl",
  4: "mt-6 mb-3 text-lg md:text-xl lg:text-2xl",
  5: "mt-5 mb-2 text-base md:text-lg lg:text-xl",
  6: "mt-4 mb-2 text-sm md:text-base lg:text-lg",
} as const;

export const Heading = ({ level, children, id }: HeadingProps) => {
  const baseClasses = "font-display font-bold scroll-mt-20 pt-2";
  const className = `${baseClasses} ${levelClasses[level]}`;

  switch (level) {
    case 1:
      return <h1 id={id} className={className}>{children}</h1>;
    case 2:
      return <h2 id={id} className={className}>{children}</h2>;
    case 3:
      return <h3 id={id} className={className}>{children}</h3>;
    case 4:
      return <h4 id={id} className={className}>{children}</h4>;
    case 5:
      return <h5 id={id} className={className}>{children}</h5>;
    case 6:
      return <h6 id={id} className={className}>{children}</h6>;
    default:
      return <h1 id={id} className={className}>{children}</h1>;
  }
};