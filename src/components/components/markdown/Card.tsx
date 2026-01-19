// components/markdown/Card.tsx
import { CardProps } from './types';

export const Card = ({ 
  title, 
  icon, 
  variant = 'default', 
  children 
}: CardProps) => {
  const variants = {
    default: 'bg-card shadow-sm',
    bordered: 'border-2 border-border bg-transparent',
    filled: 'bg-secondary/30',
  };

  return (
    <div className={`
      my-6 md:my-8 rounded-xl p-4 md:p-6
      ${variants[variant]}
    `}>
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && <div className="w-6 h-6">{icon}</div>}
          {title && (
            <h3 className="text-lg md:text-xl font-semibold">
              {title}
            </h3>
          )}
        </div>
      )}
      <div className="text-foreground/90">
        {children}
      </div>
    </div>
  );
};