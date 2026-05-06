import { HiOutlineExclamation } from "react-icons/hi";
import Button from "./Button";

export const ErrorState = ({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
}) => (
  <div className="w-full text-center py-16 px-6 rounded-3xl border border-red-100 bg-red-50/40">
    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-red-100 text-red-500">
      <HiOutlineExclamation size={28} />
    </div>
    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">{description}</p>
    {onRetry ? (
      <div className="mt-6 flex justify-center">
        <Button variant="accent" size="md" onClick={onRetry}>
          Try again
        </Button>
      </div>
    ) : null}
  </div>
);

export default ErrorState;
