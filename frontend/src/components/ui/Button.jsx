import { forwardRef } from "react";
import { cn } from "../../lib/cn";

const VARIANT = {
  primary:
    "bg-gray-900 text-white hover:bg-orange-600 shadow-lg shadow-gray-200/40",
  secondary:
    "bg-white text-gray-900 border border-gray-200 hover:border-orange-500 hover:text-orange-600",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  danger:
    "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200/40",
  accent:
    "bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-200/40",
};

const SIZE = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
  xl: "px-10 py-4 text-base",
};

const Button = forwardRef(
  (
    {
      as: Comp = "button",
      variant = "primary",
      size = "md",
      className,
      loading = false,
      disabled,
      children,
      ...rest
    },
    ref
  ) => (
    <Comp
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:ring-offset-2",
        VARIANT[variant],
        SIZE[size],
        className
      )}
      {...rest}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : null}
      {children}
    </Comp>
  )
);

Button.displayName = "Button";
export default Button;
