import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond, Alex_Brush, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import BotpressChat from "@/components/BotpressChat";
import "./globals.css";

const sansFont = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const editorialFont = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const scriptFont = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Nikita Singhal — Biotechnology | Portfolio",
  description:
    "Curiosity for life. Designed by science. Academic portfolio of Nikita Singhal, B.Sc. (Hons.) Biotechnology student at JECRC University, Jaipur.",
  keywords: [
    "Nikita Singhal",
    "Biotechnology",
    "JECRC University",
    "Molecular Biology",
    "Genetics",
    "Life Sciences",
    "Jaipur",
  ],
  authors: [{ name: "Nikita Singhal" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sansFont.variable} ${editorialFont.variable} ${scriptFont.variable} ${monoFont.variable} dark`}
      data-theme="dark"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('nikita-theme');
                  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                  var theme = saved || (prefersLight ? 'light' : 'dark');
                  var root = document.documentElement;
                  if (theme === 'dark') {
                    root.classList.add('dark');
                    root.classList.remove('light');
                    root.setAttribute('data-theme', 'dark');
                  } else {
                    root.classList.remove('dark');
                    root.classList.add('light');
                    root.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script src="https://cdn.botpress.cloud/webchat/v5.0/inject.js"></script>
        <script src="https://files.bpcontent.cloud/2026/10/22/19/20261022195323-4XFLF5GU.js" defer></script>
      </head>
      <body className="h-screen w-screen overflow-hidden atmospheric-bg selection:bg-[var(--accent-subtle)] selection:text-[var(--accent-primary)]">
        <ThemeProvider>
          {children}
          <BotpressChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
