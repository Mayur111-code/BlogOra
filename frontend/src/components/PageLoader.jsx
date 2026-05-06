import Spinner from "./ui/Spinner";

const PageLoader = () => (
  <div
    role="status"
    aria-live="polite"
    className="min-h-[70vh] flex flex-col items-center justify-center gap-4"
  >
    <Spinner size="lg" />
    <p className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400">
      Loading
    </p>
  </div>
);

export default PageLoader;
