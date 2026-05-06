import { useState } from "react";
import { cn } from "../../lib/cn";

export const Img = ({
  src,
  alt = "",
  fallback,
  className,
  loading = "lazy",
  decoding = "async",
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const finalSrc = error && fallback ? fallback : src;

  return (
    <img
      src={finalSrc}
      alt={alt}
      loading={loading}
      decoding={decoding}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      className={cn(
        "transition-opacity duration-500",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
      {...rest}
    />
  );
};

export default Img;
