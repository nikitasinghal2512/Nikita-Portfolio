"use client";

import React from "react";
import { Award, Calendar, CheckCircle2 } from "lucide-react";

interface Milestone {
  id: string;
  category: "Workshop" | "Symposium" | "Orientation" | "Internship Slot";
  title: string;
  organizer: string;
  period: string;
  description: string;
  isPlaceholder?: boolean;
}

const milestones: Milestone[] = [
  {
    id: "m-1",
    category: "Workshop",
    title: "Molecular Biology Techniques & PCR Principles",
    organizer: "JECRC University • Department of Biotechnology",
    period: "Undergraduate Academic Workshop",
    description:
      "Hands-on immersion covering thermal cycler programming, primer annealing kinetics, and amplicon detection via agarose gel electrophoresis.",
  },
  {
    id: "m-2",
    category: "Symposium",
    title: "National Science Day Academic Symposium",
    organizer: "Faculty of Life Sciences • JECRC University, Jaipur",
    period: "Annual Academic Event",
    description:
      "Participated in scientific presentation sessions and poster reviews highlighting biotechnology solutions for healthcare and clean energy.",
  },
  {
    id: "m-3",
    category: "Orientation",
    title: "Good Laboratory Practice (GLP) & Biosafety Protocol",
    organizer: "Institutional Biosafety Guidelines",
    period: "Curricular Lab Induction",
    description:
      "Comprehensive training on biohazard management, chemical spill neutralizations, autoclave safety operations, and sterility checks.",
  },
  {
    id: "m-4",
    category: "Internship Slot",
    title: "Undergraduate Research Fellowship / Summer Internship",
    organizer: "[Host Institution / Laboratory Name Editable]",
    period: "Upcoming Academic Session",
    description:
      "Discreet placeholder reserved for Nikita's verified summer traineeship, industrial internship, or dissertation project upon completion.",
    isPlaceholder: true,
  },
];

export default function Milestones() {
  return (
    <section id="milestones" className="py-24 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-muted)] block mb-2">
            06 / Academic Milestones
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-primary)]">
            Workshops & Credentials
          </h2>
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`p-7 rounded-2xl border transition-colors ${
                m.isPlaceholder
                  ? "border-dashed border-[var(--border-default)] bg-[var(--bg-subtle)]/50"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)]"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mb-3">
                <span className="uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                  {m.category}
                </span>
                <span>{m.period}</span>
              </div>

              <h3 className="text-lg font-editorial font-normal text-[var(--text-primary)] mb-1">
                {m.title}
              </h3>
              <p className="text-xs font-mono text-[var(--accent-primary)] mb-3">
                {m.organizer}
              </p>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                {m.description}
              </p>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 text-xs font-mono text-[var(--text-muted)]">
          * Academic credentials and verified workshop attendance certificates available upon request.
        </div>

      </div>
    </section>
  );
}
