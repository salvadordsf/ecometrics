import { Skeleton } from "@/src/components/ui/skeleton";

export const TotalPrivateDebtSkeleton = () => {
  return (
    <div className="p-4 border border-border rounded bg-surface-2 divider">
      <h3 className="text-2xl text-center mb-3 text-text-primary">
        Financiamiento total al sector privado
      </h3>

      <div className="flex flex-col md:flex-row items-center text-center ">
        <Skeleton className="h-7 w-48 mx-3" />

        <span className="text-2xl">+</span>

        <Skeleton className="h-7 w-48 mx-3" />

        <span className="text-2xl">=</span>

        <Skeleton className="h-7 w-48 mx-3" />
      </div>
    </div>
  );
};
