import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full border-b border-gray-800/60 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="flex items-center justify-center w-8 h-8 rounded border border-amber-600/40 bg-amber-600/10 group-hover:bg-amber-600/20 group-hover:border-amber-600/60 transition-all duration-150">
            <span className="text-[10px] font-semibold text-amber-500 tracking-wider">
              EM
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold tracking-tight text-gray-50 group-hover:text-white transition-colors duration-150">
              ecometrics
            </span>
            <span className="text-[10px] text-gray-600 tracking-[0.15em] uppercase hidden sm:inline">
              arg
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-0.5">
          <Link
            href="/calculadoras"
            className="
              relative min-w-24 sm:min-w-28 px-3 sm:px-4 py-2 rounded
              text-[10px] sm:text-[11px] tracking-[0.12em] uppercase font-medium
              text-center
              text-gray-400 hover:text-gray-50
              hover:bg-gray-800/50
              transition-all duration-150
              group
            "
          >
            <span>Calculadoras</span>
            <span className="absolute inset-x-4 bottom-1 h-px bg-amber-600/0 group-hover:bg-amber-600/40 transition-all duration-150" />
          </Link>

          <Link
            href="/autor"
            className="
              min-w-20 sm:min-w-24 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded
              text-[10px] sm:text-[11px] tracking-[0.12em] uppercase font-medium
              text-gray-500 hover:text-gray-300
              hover:bg-gray-800/50
              transition-all duration-150
              group
            "
          >
            <span>Autor</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600/50 group-hover:bg-amber-500 transition-colors duration-150" />
          </Link>
        </nav>

      </div>
    </header>
  );
};