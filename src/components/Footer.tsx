"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] pt-20 pb-14 text-[var(--text-secondary)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Editorial Reflection Quote */}
        <div className="py-12 border-b border-[var(--border-subtle)] text-center max-w-3xl mx-auto">
          <p className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-normal leading-relaxed italic">
            &ldquo;Science and everyday life cannot and should not be separated.&rdquo;
          </p>
          <p className="text-xs font-mono text-[var(--accent-primary)] mt-3 tracking-wider uppercase font-semibold">
            — Rosalind Franklin, Pioneer of DNA X-ray Crystallography
          </p>
        </div>

        {/* Footer Middle Row */}
        <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[var(--border-subtle)] text-xs font-mono">
          
          {/* Identity */}
          <div>
            <span className="font-editorial text-xl font-normal text-[var(--text-primary)] block">
              Nikita Singhal
            </span>
            <span className="text-[var(--text-muted)] text-[11px] mt-0.5 block">
              B.Sc. (Hons.) Biotechnology • JECRC University, Jaipur
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[var(--text-secondary)]">
            <a href="#about" className="hover:text-[var(--text-primary)] transition-colors">
              About
            </a>
            <a href="#interests" className="hover:text-[var(--text-primary)] transition-colors">
              Interests
            </a>
            <a href="#education" className="hover:text-[var(--text-primary)] transition-colors">
              Education
            </a>
            <a href="#projects" className="hover:text-[var(--text-primary)] transition-colors">
              Projects
            </a>
            <a href="#skills" className="hover:text-[var(--text-primary)] transition-colors">
              Skills
            </a>
            <a href="#interactive-lab" className="hover:text-[var(--text-primary)] transition-colors">
              Lab Tool
            </a>
            <a href="#contact" className="hover:text-[var(--text-primary)] transition-colors">
              Contact
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors"
            aria-label="Back to top"
            title="Return to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[var(--text-muted)] gap-3">
          <p>© 2026 Nikita Singhal. All academic rights reserved.</p>
          <p>Crafted for Life Sciences & Molecular Discovery • Jaipur, Rajasthan</p>
        </div>

      </div>
    </footer>
  );
}
