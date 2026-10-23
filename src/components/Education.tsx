"use client";

import React from "react";
import { GraduationCap, Calendar, MapPin, BookOpen, Award } from "lucide-react";

export default function Education() {
  const coursework = [
    "Cell Biology & Genetics",
    "General & Applied Microbiology",
    "Biochemistry & Biomolecules",
    "Molecular Biology & Central Dogma",
    "Recombinant DNA Technology",
    "Bioanalytical Instrumentation",
    "Plant & Animal Biotechnology",
    "Bioinformatics & Biostatistics",
    "Biosafety & Bioethics",
    "Immunology Basics",
  ];

  return (
    <section id="education" className="py-24 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-muted)] block mb-2">
            03 / Academic Timeline
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-primary)]">
            Education & Qualifications
          </h2>
        </div>

        {/* Polished Academic Timeline / Credential Layout */}
        <div className="space-y-8">
          
          {/* Main University Card */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-8 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
              <div>
                <span className="text-xs font-mono tracking-wider uppercase text-[var(--accent-primary)] font-semibold block mb-2">
                  Undergraduate Degree
                </span>
                <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-primary)] mb-1">
                  Bachelor of Science (Honours) in Biotechnology
                </h3>
                <p className="text-base font-medium text-[var(--text-secondary)]">
                  JECRC University, Jaipur
                </p>
                <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                  Faculty of Sciences / Life Sciences Department • Jaipur, Rajasthan, India
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono shrink-0">
                <span className="px-3 py-1 rounded-full border border-[var(--border-default)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]">
                  Session: [Ongoing • Editable]
                </span>
                <span className="text-[var(--text-muted)] mt-1">
                  Duration: 3-Year Honors Program
                </span>
              </div>
            </div>

            {/* Core Coursework Overview */}
            <div className="pt-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-[var(--accent-primary)]" />
                <h4 className="text-xs font-mono tracking-wider uppercase text-[var(--text-primary)] font-semibold">
                  Key Curricular Coursework
                </h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {coursework.map((course, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-xs text-[var(--text-secondary)] font-medium"
                  >
                    {course}
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Academic Background Slot (Pre-University / High School) */}
            <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[var(--text-muted)] gap-2">
              <span>Higher Secondary / Senior School Certificate (Physics, Chemistry, Biology)</span>
              <span className="text-[var(--text-secondary)]">[Institution & Year Editable]</span>
            </div>
          </div>

          {/* Academic Transparency Note */}
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <span>Official marks cards, transcript copies, and semester GPA details are available upon academic request.</span>
            <span className="text-[var(--accent-primary)]">Verified Student</span>
          </div>

        </div>

      </div>
    </section>
  );
}
