import { StepProps } from "./types";

interface StepsContainerProps {
  children: React.ReactNode;
}

export const Steps = ({ children }: StepsContainerProps) => {
  return (
    <div className="my-8 md:my-12 space-y-8 md:space-y-12">{children}</div>
  );
};

export const Step = ({ number, title, children }: StepProps) => {
  return (
    <div className="relative flex gap-4 md:gap-6">
      <div className="shrink-0">
        <div
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary 
                      text-primary-foreground flex items-center justify-center
                      text-sm md:text-base font-bold"
        >
          {number}
        </div>
      </div>

      <div className="flex-1 pt-1">
        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
          {title}
        </h3>
        <div className="text-foreground/90 text-sm md:text-base">
          {children}
        </div>
      </div>
    </div>
  );
};
