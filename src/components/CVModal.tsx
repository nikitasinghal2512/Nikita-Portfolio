"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { X, Printer, Mail, MapPin, GraduationCap, Microscope, Dna, CheckCircle2 } from "lucide-react";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] p-6 sm:p-10 shadow-2xl text-[var(--text-primary)]">
        
        {/* Top Controls */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
            <span>Academic Curriculum Vitae Preview</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrint}
              icon={<Printer className="w-3.5 h-3.5" />}
              iconPosition="left"
            >
              Print / Save PDF
            </Button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
              aria-label="Close CV"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Printable Document */}
        <div className="space-y-8 text-left text-sm">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
            <div>
              <h1 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight">
                Nikita Singhal
              </h1>
              <p className="text-sm text-[var(--accent-primary)] font-medium font-mono mt-1">
                B.Sc. (Hons.) Biotechnology Student
              </p>
              <p className="text-xs font-mono text-[var(--text-muted)] mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Jaipur, Rajasthan, India • JECRC University</span>
              </p>
            </div>

            <div className="text-xs font-mono space-y-1 text-[var(--text-secondary)] bg-[var(--bg-subtle)] p-3.5 rounded-xl border border-[var(--border-subtle)]">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>nikita.singhal@jecrcu.edu.in</span>
              </p>
              <p className="text-[10px] text-[var(--text-muted)]">[Academic Address]</p>
            </div>
          </div>

          {/* Academic Statement */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-2">
              Academic Objective
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-light">
              Undergraduate biotechnology student at JECRC University, Jaipur, combining rigorous theoretical coursework with hands-on wet-lab practicals in molecular biology, general microbiology, and biochemistry. Seeking research traineeship opportunities to contribute to molecular genetics and bioprocess applications.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Higher Education</span>
            </h2>

            <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  Bachelor of Science (Honours) in Biotechnology
                </h3>
                <span className="text-xs font-mono text-[var(--accent-primary)]">
                  Session: [Ongoing • Editable]
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                JECRC University, Jaipur, Rajasthan, India
              </p>
              <p className="text-xs text-[var(--text-muted)] font-light mt-2 leading-relaxed">
                <strong>Curriculum:</strong> Molecular Biology, Cell Biology, Classical & Molecular Genetics, General & Applied Microbiology, Recombinant DNA Technology, Biochemistry, Bioanalytical Methods, Bioinformatics.
              </p>
            </div>
          </div>

          {/* Laboratory Practicals */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3 flex items-center gap-2">
              <Microscope className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Completed Laboratory Modules</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-[var(--border-subtle)]">
                <p className="font-semibold text-[var(--text-primary)]">Genomic DNA Isolation & Gel Electrophoresis</p>
                <p className="text-[var(--text-secondary)] mt-1 font-light">Cell lysis, alcohol precipitation, TAE buffer, and UV transillumination.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-[var(--border-subtle)]">
                <p className="font-semibold text-[var(--text-primary)]">Aseptic Streak Isolation & Gram Staining</p>
                <p className="text-[var(--text-secondary)] mt-1 font-light">Laminar airflow quadrant streaking and 1000x oil immersion cell wall observation.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-[var(--border-subtle)]">
                <p className="font-semibold text-[var(--text-primary)]">Spectrophotometric Biomolecule Estimation</p>
                <p className="text-[var(--text-secondary)] mt-1 font-light">Beer-Lambert standard curves and optical density concentration interpolation.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-[var(--border-subtle)]">
                <p className="font-semibold text-[var(--text-primary)]">Plant Tissue Culture Media Formulation</p>
                <p className="text-[var(--text-secondary)] mt-1 font-light">Explant surface sterilization, MS basal media preparation, and totipotency study.</p>
              </div>
            </div>
          </div>

          {/* Technical Laboratory Competencies */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3 flex items-center gap-2">
              <Dna className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Technical Skills Summary</span>
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                <span className="font-semibold text-[var(--text-primary)] min-w-[170px]">Wet-Lab Techniques:</span>
                <span className="text-[var(--text-secondary)] font-light">Agarose Gel Electrophoresis, Micropipetting (1–1000 µL), Centrifugation, Serial Dilutions, Buffer Formulation.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                <span className="font-semibold text-[var(--text-primary)] min-w-[170px]">Microbiology:</span>
                <span className="text-[var(--text-secondary)] font-light">Aseptic LAF protocols, Streak Plating, Autoclave Media Preparation, Differential Gram Staining.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                <span className="font-semibold text-[var(--text-primary)] min-w-[170px]">Instrumentation:</span>
                <span className="text-[var(--text-secondary)] font-light">UV-Vis Spectrophotometer, Compound Light Microscopy (100x Oil), Electronic Analytical Balance, pH Meter.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                <span className="font-semibold text-[var(--text-primary)] min-w-[170px]">Bioinformatics & Digital:</span>
                <span className="text-[var(--text-secondary)] font-light">NCBI GenBank, BLAST (blastn/blastp), UniProt, PubMed, Excel Data Plotting, Lab Documentation.</span>
              </div>
            </div>
          </div>

          {/* Academic Workshops */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3">
              Workshops & Academic Participation
            </h2>

            <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] font-light">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                <span>Hands-on Workshop: Molecular Biology Techniques & PCR Principles — JECRC University</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                <span>Participant: National Science Day Academic Symposium — Faculty of Life Sciences</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                <span>Laboratory Safety & Good Laboratory Practice (GLP) Curricular Orientation</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Modal Close Footer */}
        <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
          <span>Official transcripts available upon academic request.</span>
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
          >
            Close Preview
          </Button>
        </div>

      </div>
    </div>
  );
}
