import { cn } from "../../lib/cn";

export const EmptyState = ({
  icon,
  title = "Nothing here yet",
  description,
  action,
  className,
}) => (
  <div
    className={cn(
      "w-full text-center py-16 px-6 rounded-3xl border border-dashed border-gray-200 bg-gray-50/40",
      className
    )}
  >
    {icon ? (
      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 text-orange-500">
        {icon}
      </div>
    ) : null}
    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    {description ? (
      <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
        {description}
      </p>
    ) : null}
    {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
  </div>
);

export default EmptyState;
