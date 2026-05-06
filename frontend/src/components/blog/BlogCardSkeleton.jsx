import { Skeleton } from "../ui/Skeleton";

const BlogCardSkeleton = () => (
  <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col h-full">
    <Skeleton className="aspect-[16/10] rounded-none" />
    <div className="p-5 flex flex-col flex-grow gap-3">
      <Skeleton className="h-5 w-3/4 rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-5/6 rounded-md" />
      <div className="pt-5 border-t border-gray-50 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-24 rounded-md" />
            <Skeleton className="h-3 w-16 rounded-md" />
          </div>
        </div>
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  </article>
);

export default BlogCardSkeleton;
