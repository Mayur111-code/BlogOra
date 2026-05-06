import { cn } from "../../lib/cn";

export const Skeleton = ({ className, ...rest }) => (
  <div
    className={cn(
      "relative overflow-hidden bg-gray-100 rounded-xl",
      "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite]",
      "before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
      className
    )}
    {...rest}
  />
);

export default Skeleton;
