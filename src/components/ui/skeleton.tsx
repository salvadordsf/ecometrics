import clsx from "clsx";

export const Skeleton = ({ className }: { className: string }) => {
  return (
    <div className={clsx("relative overflow-hidden rounded-xl bg-surface/50", className)}>
      <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/20 to-transparent bg-size-[200%_100%]" />
    </div>
  );
};