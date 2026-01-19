import { AlertCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react';
import { CalloutProps } from './types';

const calloutConfig = {
  note: {
    icon: Info,
    title: 'Note',
    className: 'border-blue-500/20 bg-blue-500/5',
  },
  warning: {
    icon: AlertTriangle,
    title: 'Warning',
    className: 'border-amber-500/20 bg-amber-500/5',
  },
  tip: {
    icon: Lightbulb,
    title: 'Tip',
    className: 'border-emerald-500/20 bg-emerald-500/5',
  },
  info: {
    icon: AlertCircle,
    title: 'Info',
    className: 'border-purple-500/20 bg-purple-500/5',
  },
} as const;

export const Callout = ({ 
  type = 'note', 
  title, 
  children 
}: CalloutProps) => {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div className={`
      my-6 md:my-8 rounded-xl border-l-4 px-4 md:px-6 py-4
      ${config.className}
    `}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 md:w-6 md:h-6 mt-0.5 shrink-0" />
        <div className="flex-1">
          <div className="font-semibold text-sm md:text-base mb-2">
            {title || config.title}
          </div>
          <div className="text-sm md:text-base text-foreground/90">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};