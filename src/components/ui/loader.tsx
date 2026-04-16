// src/components/ui/loader.tsx
export const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-zinc-800" />
          {/* Spinning arc */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-600 animate-spin" />
          {/* Inner dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-zinc-200 text-sm font-medium tracking-widest uppercase">
            Cargando
          </p>
          {/* Animated dots */}
          <div className="flex gap-1">
            <span
              className="w-1 h-1 rounded-full bg-zinc-500 animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-1 h-1 rounded-full bg-zinc-500 animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-1 h-1 rounded-full bg-zinc-500 animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
