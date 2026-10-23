"use client";

import React, { useState } from "react";
import { Dna, Microscope, ShieldCheck, Binary, BookOpen } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  description: string;
  items: {
    name: string;
    level: "Lab Practiced" | "Coursework Familiar" | "Academic Study";
    note: string;
  }[];
}

const categories: SkillCategory[] = [
  {
    title: "Molecular & Biochemical Techniques",
    icon: Dna,
    description: "Wet-lab protocols practiced during undergraduate laboratory practicals.",
    items: [
      {
        name: "Agarose Gel Electrophoresis",
        level: "Lab Practiced",
        note: "Gel preparation, DNA loading, running buffer calibration, UV transillumination.",
      },
      {
        name: "Precision Micropipetting",
        level: "Lab Practiced",
        note: "Accurate liquid handling across 1 µL to 1000 µL ranges.",
      },
      {
        name: "Genomic DNA Extraction",
        level: "Lab Practiced",
        note: "Cell lysis, precipitation, and nucleic acid recovery.",
      },
      {
        name: "Buffer & Reagent Preparation",
        level: "Lab Practiced",
        note: "Molarity calculations, pH adjustment, TAE/TBE preparation.",
      },
      {
        name: "Centrifugation",
        level: "Lab Practiced",
        note: "Sample balancing and pellet-supernatant separation.",
      },
    ],
  },
  {
    title: "Microbiology & Culture Methods",
    icon: Microscope,
    description: "Microbial isolation and morphological characterization.",
    items: [
      {
        name: "Aseptic Technique (LAF)",
        level: "Lab Practiced",
        note: "Laminar airflow operation, flame sterilization, sterile field maintenance.",
      },
      {
        name: "Streak Plate Isolation",
        level: "Lab Practiced",
        note: "Quadrant streaking for pure colony separation.",
      },
      {
        name: "Differential Gram Staining",
        level: "Lab Practiced",
        note: "Heat-fixation, staining sequence, and 1000x oil immersion observation.",
      },
      {
        name: "Serial Dilutions & Plating",
        level: "Lab Practiced",
        note: "Dilution factoring and bacterial CFU enumeration.",
      },
      {
        name: "Autoclave Operation",
        level: "Lab Practiced",
        note: "Moist heat sterilization cycles at 121°C for nutrient media.",
      },
    ],
  },
  {
    title: "Instrumentation & Biosafety",
    icon: ShieldCheck,
    description: "Laboratory equipment handling and safety protocols.",
    items: [
      {
        name: "UV-Vis Spectrophotometer",
        level: "Lab Practiced",
        note: "Baseline blanking, cuvette alignment, Beer-Lambert concentration estimation.",
      },
      {
        name: "Compound Light Microscopy",
        level: "Lab Practiced",
        note: "Köhler illumination alignment and oil immersion focusing.",
      },
      {
        name: "pH Meter Calibration",
        level: "Lab Practiced",
        note: "Standard buffer 2-point calibration (pH 4.0, 7.0).",
      },
      {
        name: "Good Laboratory Practice (GLP)",
        level: "Coursework Familiar",
        note: "Standard operating procedures, chemical labeling, and waste handling.",
      },
      {
        name: "Biosafety Level (BSL-1/2) Standards",
        level: "Academic Study",
        note: "Biological containment principles and personal protective equipment.",
      },
    ],
  },
  {
    title: "Bioinformatics & Digital Tools",
    icon: Binary,
    description: "In silico sequence retrieval and scientific documentation.",
    items: [
      {
        name: "NCBI GenBank & PubMed",
        level: "Academic Study",
        note: "Querying accession numbers, FASTA sequences, and biomedical literature.",
      },
      {
        name: "BLAST (blastn & blastp)",
        level: "Academic Study",
        note: "Basic local alignment for sequence similarity and homology.",
      },
      {
        name: "UniProt & PDB Exploration",
        level: "Coursework Familiar",
        note: "Investigating protein structural domains and functional annotations.",
      },
      {
        name: "Scientific Data Plotting",
        level: "Coursework Familiar",
        note: "Linear regression curves and assay data plotting in spreadsheet software.",
      },
      {
        name: "Lab Notebook Maintenance",
        level: "Lab Practiced",
        note: "Rigorous logging of experimental aims, protocols, data, and conclusions.",
      },
    ],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section id="skills" className="py-24 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-muted)] block mb-2">
              05 / Competencies
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-primary)]">
              Scientific Skills & Methods
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md font-light">
            Competencies acquired through undergraduate laboratory coursework, practical training, and academic literature study.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-[var(--border-subtle)] pb-4 text-xs font-mono">
          {categories.map((cat, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-medium shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[var(--border-subtle)] gap-4">
            <div>
              <h3 className="text-xl font-editorial font-normal text-[var(--text-primary)]">
                {categories[activeTab].title}
              </h3>
              <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                {categories[activeTab].description}
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[10px] font-mono text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                Lab Practiced
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
                Coursework Familiar
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
                Academic Study
              </span>
            </div>
          </div>

          {/* Items List */}
          <div className="divide-y divide-[var(--border-subtle)]">
            {categories[activeTab].items.map((item, i) => (
              <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="max-w-md">
                  <h4 className="text-sm font-medium text-[var(--text-primary)]">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] font-light mt-0.5">
                    {item.note}
                  </p>
                </div>

                <span
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-md border shrink-0 self-start sm:self-center ${
                    item.level === "Lab Practiced"
                      ? "border-[var(--accent-primary)]/40 text-[var(--accent-primary)] bg-[var(--accent-subtle)]"
                      : item.level === "Coursework Familiar"
                      ? "border-[var(--accent-cyan)]/40 text-[var(--accent-cyan)] bg-[var(--bg-subtle)]"
                      : "border-[var(--border-default)] text-[var(--text-muted)] bg-[var(--bg-subtle)]"
                  }`}
                >
                  {item.level}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Footnote */}
        <div className="mt-8 text-xs font-mono text-[var(--text-muted)]">
          * Skills are presented transparently based on verified academic syllabus modules at JECRC University.
        </div>

      </div>
    </section>
  );
}
