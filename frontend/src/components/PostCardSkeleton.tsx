import { Skeleton } from "./ui/skeleton";

export default function PostCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 shrink-0 rounded-full bg-slate-200" />
        <Skeleton className="h-4 w-28 bg-slate-200" />
      </div>
      <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
        <Skeleton className="h-6 w-full max-w-[85%] rounded-md bg-slate-200" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md bg-slate-200" />
          <Skeleton className="h-4 w-full rounded-md bg-slate-200" />
          <Skeleton className="h-4 w-4/5 rounded-md bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
