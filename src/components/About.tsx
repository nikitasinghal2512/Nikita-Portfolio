"use client";

import React from "react";
import { GraduationCap, Compass, BookOpen, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-muted)] block mb-2">
            01 / Academic Identity
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-primary)]">
            About Nikita
          </h2>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main Narrative (Spans 7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed font-light">
            <p className="text-[var(--text-primary)] font-normal text-xl sm:text-2xl font-editorial leading-snug">
              Studying biotechnology begins with an appreciation for the elegance of cellular architecture—how four nucleotides and twenty amino acids coordinate life itself.
            </p>

            <p>
              As an undergraduate at <strong className="text-[var(--text-primary)] font-medium">JECRC University, Jaipur</strong>, I explore biological systems through both foundational coursework and methodical laboratory practicals. My goal is to understand how molecular processes can be studied rigorously and applied to real-world challenges in health and sustainability.
            </p>

            <p>
              I value scientific discipline, meticulous record-keeping, and empirical verification. Whether standardizing an electrophoresis protocol or observing microbial morphology under oil immersion, I approach lab work with genuine curiosity and respect for good laboratory practice.
            </p>

            {/* Core Values / Commitments */}
            <div className="pt-6 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[var(--text-secondary)]">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] mt-1.5 shrink-0" />
                <div>
                  <span className="font-medium text-[var(--text-primary)] block">Empirical Observation</span>
                  <span>Rooted in verifiable laboratory protocols</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] mt-1.5 shrink-0" />
                <div>
                  <span className="font-medium text-[var(--text-primary)] block">Aseptic Discipline</span>
                  <span>Commitment to sterile lab technique</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata Card (Spans 5 cols) */}
          <div className="lg:col-span-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-7 space-y-6">
            <div>
              <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--text-muted)] block mb-1">
                Institutional Profile
              </span>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                JECRC University, Jaipur
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-mono mt-0.5">
                School of Sciences • Department of Biotechnology
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)] text-xs">
              <div className="flex items-start justify-between py-1">
                <span className="text-[var(--text-muted)]">Degree</span>
                <span className="text-[var(--text-primary)] font-medium text-right">B.Sc. (Hons.) Biotechnology</span>
              </div>
              <div className="flex items-start justify-between py-1">
                <span className="text-[var(--text-muted)]">Location</span>
                <span className="text-[var(--text-primary)] font-medium text-right">Jaipur, Rajasthan, India</span>
              </div>
              <div className="flex items-start justify-between py-1">
                <span className="text-[var(--text-muted)]">Academic Status</span>
                <span className="text-[var(--accent-primary)] font-mono text-right">[In Progress • Editable]</span>
              </div>
              <div className="flex items-start justify-between py-1">
                <span className="text-[var(--text-muted)]">Research Trajectory</span>
                <span className="text-[var(--text-primary)] font-medium text-right">Molecular Genetics & Bioprocess</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light italic">
                Open to undergraduate summer research fellowships and laboratory traineeships under academic supervision.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
