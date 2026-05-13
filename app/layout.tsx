import type { Metadata } from "next";
import { Instrument_Serif, DM_Mono } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/src/components/providers/global-provider";
import { Header } from "@/src/components/ui/header/header";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "ecometrics",
  description:
    "ecometrics es una aplicación de calculadoras económicas de código abierto que busca simplificar el análisis macroeconómico de Argentina.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${instrumentSerif.variable} ${dmMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col items-center text-gray-50 font-mono mx-auto">
        <GlobalProvider>
          <Header />
          <div className="max-w-4xl px-8">
            {children}
          </div>
        </GlobalProvider>
      </body>
    </html>
  );
}