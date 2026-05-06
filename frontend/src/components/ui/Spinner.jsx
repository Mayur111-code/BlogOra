import { cn } from "../../lib/cn";

const SIZE = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-[3px]",
};

export const Spinner = ({ size = "md", className }) => (
  <span
    role="status"
    aria-label="Loading"
    className={cn(
      "inline-block rounded-full border-orange-500/30 border-t-orange-500 animate-spin",
      SIZE[size],
      className
    )}
  />
);

export default Spinner;
