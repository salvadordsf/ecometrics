export default function AutorPage() {
  return (
    <main className="max-w-md mx-auto px-4 py-16 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs tracking-[0.2em] uppercase text-amber">
          autor
        </span>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          Salvador Di Sabatto
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          Desarrollador fullstack especializado en aplicaciones web modernas,
          con experiencia en arquitecturas escalables, APIs robustas y manejo de
          datos en tiempo real.
        </p>
        <p className="text-sm text-text-secondary leading-relaxed">
          Autor de Ecometrics, una plataforma que integra datos económicos
          oficiales del Banco Central de la República Argentina y el Ministerio
          de Economía - Secretaría de Obras Públicas para ofrecer datos precisos
          y herramientas de análisis.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="flex flex-col gap-2">
        {[
          { label: "Portfolio", href: "https://salvadordisabatto.com.ar" },
          { label: "GitHub", href: "https://github.com/salvadordsf" },
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/salvador-di-sabatto-fund-0b1bb9398/",
          },
          { label: "Email", href: "mailto:salvadordisabatto@gmail.com" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 rounded-md border border-border bg-surface text-sm text-text-secondary hover:text-text-primary hover:border-border-2 transition-all duration-150 group"
          >
            <span className="tracking-[0.08em] uppercase">
              {label}{" "}
              {label === "Email" && (
                <span className="lowercase normal-case tracking-normal text-text-muted">
                  salvadordisabatto@gmail.com
                </span>
              )}
            </span>
            <span className="text-text-muted group-hover:text-amber transition-colors duration-150">
              ↗
            </span>
          </a>
        ))}
      </div>
    </main>
  );
}
