import clsx from "clsx";

export const Skeleton = ({ className }: { className: string }) => {
  return (
    <div className={clsx("relative overflow-hidden rounded-xl bg-neutral-700/50", className)}>
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%]" />
    </div>
  );
};