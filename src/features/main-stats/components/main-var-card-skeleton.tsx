import { Skeleton } from "@/src/components/ui/skeleton";

export const MainVarCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-1 w-90 p-4 border rounded-xl bg-neutral-500/20 border-neutral-500">
      <Skeleton className="w-[90%] h-5" />
      <Skeleton className="w-[30%] h-7" />
      <Skeleton className="w-[70%] h-3" />
    </div>
  );
};
