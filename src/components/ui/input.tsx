import { cn } from '../../../lib/utils';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  svg?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, svg, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          svg && 'pl-9',
          className
        )}
        ref={ref}
        {...props}
      />
      {svg && <div className="absolute left-3 top-1/2 -translate-y-1/2">{svg}</div>}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
