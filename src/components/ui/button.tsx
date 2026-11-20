import React from 'react';

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'glass'
  | 'ink'
  | 'light'
  | 'signal'
  | 'outlineLight';

export type ButtonSize = 'default' | 'xl' | 'sm' | 'lg' | 'icon';

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
  outline:
    'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
  glass: 'glass text-ink-foreground hover:bg-glass-strong',
  ink: 'bg-ink text-ink-foreground hover:bg-ink-soft',
  light: 'bg-background text-foreground hover:bg-accent',
  signal: 'bg-signal text-signal-foreground hover:bg-signal/90',
  outlineLight: 'border border-glass-border text-ink-foreground hover:bg-glass',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-9 px-4 py-2',
  xl: 'h-12 rounded-lg px-6 text-base font-normal',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-10 rounded-md px-8',
  icon: 'h-9 w-9',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        ...(props as Record<string, unknown>),
        className: `${combinedClassName} ${child.props.className || ''}`.trim(),
      });
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
