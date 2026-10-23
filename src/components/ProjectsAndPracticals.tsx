"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { ArrowUpRight, X, CheckCircle2, ChevronRight, FileText, FlaskConical } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  type: "practical" | "review" | "presentation";
  typeLabel: string;
  tagline: string;
  courseworkModule: string;
  objective: string;
  principle: string;
  apparatus: string[];
  reagents: string[];
  keyObservations: string[];
  safetyControls: string[];
  learnings: string;
}

const projects: ProjectItem[] = [
  {
    id: "dna-extraction",
    title: "Genomic DNA Isolation & Agarose Gel Electrophoresis",
    type: "practical",
    typeLabel: "Laboratory Practical",
    tagline: "Cell lysis, alcohol precipitation, and molecular separation",
    courseworkModule: "Molecular Biology Lab",
    objective:
      "To extract high-molecular-weight genomic DNA and evaluate molecular integrity and band resolution through horizontal agarose gel electrophoresis.",
    principle:
      "Detergent lysis disrupts cellular and nuclear membranes. Nucleic acids are selectively precipitated with ice-cold alcohol and resolved on an agarose polymer matrix under an electric field toward the positive anode.",
    apparatus: [
      "Horizontal Electrophoresis Submarine Tank",
      "DC Regulated Power Supply",
      "High-Speed Microcentrifuge",
      "Precision Micropipettes (P20, P200, P1000)",
      "UV Transilluminator / Gel Documentation",
    ],
    reagents: [
      "1X TAE (Tris-Acetate-EDTA) Buffer",
      "0.8% Molecular Biology Grade Agarose",
      "6X DNA Loading Dye (Bromophenol Blue)",
      "Safe DNA Fluorescent Stain",
      "DNA Molecular Weight Marker (1 kb)",
    ],
    keyObservations: [
      "High-molecular-weight intact genomic band observed near the well margin with minimal shearing.",
      "Fragment migration resolved against standard 1 kb molecular ladder.",
      "Absence of significant RNA contamination verified after visualization.",
    ],
    safetyControls: [
      "Nitrile gloves, lab coat, and UV-absorbing face shield.",
      "Appropriate neutralisation of biochemical waste before disposal.",
    ],
    learnings:
      "Mastered pipetting precision into fragile agarose wells and gained an empirical appreciation of buffer ionic strength.",
  },
  {
    id: "gram-staining",
    title: "Aseptic Culture Isolation & Differential Gram Staining",
    type: "practical",
    typeLabel: "Laboratory Practical",
    tagline: "Streak-plate single colony isolation and cell wall peptidoglycan differentiation",
    courseworkModule: "General Microbiology Lab",
    objective:
      "To obtain isolated bacterial colonies via quadrant streaking and differentiate Gram-positive from Gram-negative bacterial isolates based on cell wall architecture.",
    principle:
      "Gram-positive organisms retain the primary crystal violet-iodine complex due to their thick peptidoglycan wall during ethanol decolorization, whereas Gram-negative cells lose the dye and take up the counterstain safranin.",
    apparatus: [
      "Laminar Airflow (LAF) Cabinet",
      "Compound Light Microscope (100x Oil Immersion)",
      "Nichrome Inoculation Loop",
      "Bunsen Burner",
      "Bacteriological Incubator (37°C)",
    ],
    reagents: [
      "Nutrient Agar Plates",
      "Crystal Violet Solution (Primary Stain)",
      "Gram's Iodine (Mordant)",
      "95% Ethanol (Decolorizing Agent)",
      "Safranin Solution (Counterstain)",
      "Type-A Immersion Oil",
    ],
    keyObservations: [
      "Gram-positive cocci visible in purple/violet clusters at 1000x total magnification.",
      "Gram-negative bacilli observed as pink/red rods under oil immersion.",
      "Pure, single colonies isolated successfully without airborne cross-contamination.",
    ],
    safetyControls: [
      "70% ethanol bench wipe-down before and after cabinet usage.",
      "Flame sterilization of loops until red hot prior to quadrant passes.",
      "Autoclave decontamination of biohazard cultures.",
    ],
    learnings:
      "Instilled disciplined aseptic habits, precise heat-fixation without cell distortion, and microscopic morphological analysis.",
  },
  {
    id: "spectrophotometry",
    title: "Spectrophotometric Quantification of Biomolecules",
    type: "practical",
    typeLabel: "Laboratory Practical",
    tagline: "Beer-Lambert Law application & standard curve regression analysis",
    courseworkModule: "Biochemistry & Analytical Methods",
    objective:
      "To generate a standard calibration curve and quantitatively estimate the concentration of unknown protein solutions using UV-Vis spectrophotometry.",
    principle:
      "According to Beer-Lambert Law (A = ε·c·l), light absorption by a chromophore in solution is directly proportional to its concentration at a specific analytical wavelength (e.g., 540/595 nm for colorimetric assays).",
    apparatus: [
      "UV-Vis Double-Beam Spectrophotometer",
      "Matched Optical Cuvettes (1.0 cm path length)",
      "Vortex Mixer",
      "Precision Analytical Balance",
    ],
    reagents: [
      "Bovine Serum Albumin (BSA) Standard Solutions",
      "Colorimetric Protein Reagent",
      "Phosphate Buffered Saline (PBS)",
    ],
    keyObservations: [
      "Linear calibration curve achieved with high correlation coefficient (R² > 0.98).",
      "Unknown protein sample concentrations determined with high reproducibility.",
    ],
    safetyControls: [
      "Careful cuvette handling without scratching optical windows.",
      "Immediate reagent cleanup around electronic spectrophotometer tray.",
    ],
    learnings:
      "Strengthened statistical curve plotting, dilution arithmetic, and instrument baseline calibration.",
  },
  {
    id: "plant-tissue",
    title: "Plant Tissue Culture Protocols & Callus Induction",
    type: "practical",
    typeLabel: "Laboratory Practical",
    tagline: "Explants surface sterilization, MS nutrient medium, and totipotency study",
    courseworkModule: "Plant Biotechnology Lab",
    objective:
      "To understand the parameters required for maintaining plant cell totipotency, surface sterilization of explants, and preparation of Murashige and Skoog (MS) media.",
    principle:
      "Plant cells exhibit totipotency—the capability of an individual cell to regenerate into an entire plant given appropriate exogenously balanced auxins and cytokinins under strictly sterile conditions.",
    apparatus: [
      "Laminar Flow Hood",
      "Vertical Autoclave",
      "Controlled Photoperiod Growth Chamber",
      "Sterile Scalpels and Forceps",
    ],
    reagents: [
      "MS Basal Medium Salts",
      "Sucrose (Carbon Source, 3% w/v)",
      "Phytohormones: 2,4-D & Kinetin",
      "Surface Sterilants (Sodium Hypochlorite)",
    ],
    keyObservations: [
      "Successful explant surface sterilization with negligible bacterial or fungal contamination.",
      "Early callus initiation visible at explant margins within two weeks of incubation.",
    ],
    safetyControls: [
      "Sterile instruments cooled before contacting botanical tissue.",
      "Appropriate disposal of chemical sterilants.",
    ],
    learnings:
      "Reinforced the delicate nature of in vitro cultures and the critical role of hormonal ratios.",
  },
  {
    id: "crispr-review",
    title: "CRISPR-Cas9 in Precision Therapeutics: Academic Review",
    type: "review",
    typeLabel: "Academic Literature Review",
    tagline: "Mechanisms of guide RNA targeting, Cas9 cleavage, and clinical gene editing",
    courseworkModule: "Genetic Engineering Coursework",
    objective:
      "To conduct a structured review of CRISPR-Cas9 genome editing, evaluating guide RNA design, double-strand break repair pathways (NHEJ vs. HDR), and clinical translation milestones.",
    principle:
      "The Cas9 endonuclease forms a ribonucleoprotein complex with a synthetic single guide RNA (sgRNA). Upon recognizing a protospacer adjacent motif (PAM), it generates a targeted double-strand break.",
    apparatus: ["PubMed & NCBI Literature Databases", "Scientific Research Papers"],
    reagents: ["Peer-reviewed journal publications (Nature Biotechnology, Cell, Science)"],
    keyObservations: [
      "Evaluated clinical gene therapy advances for hemoglobinopathies (e.g. Sickle Cell Disease).",
      "Examined engineered high-fidelity Cas variants aimed at reducing off-target cleavage.",
    ],
    safetyControls: ["Academic attribution standards and ethical review of human genome editing."],
    learnings:
      "Developed critical scientific literature appraisal, structural data comprehension, and review synthesis.",
  },
  {
    id: "insulin-bioprocess",
    title: "Recombinant Human Insulin Production & Bioprocess Workflow",
    type: "presentation",
    typeLabel: "Scientific Presentation",
    tagline: "Upstream fermentation, E. coli expression systems, and downstream purification",
    courseworkModule: "Industrial Biotechnology Coursework",
    objective:
      "To research and present the industrial bioprocess behind recombinant human insulin synthesis, examining vector construction, host strain fermentation, and downstream chromatography.",
    principle:
      "Recombinant DNA technology allows cloning of human insulin cDNA into plasmid expression vectors inside host organisms like Escherichia coli for large-scale therapeutic production.",
    apparatus: ["Bioreactor Schematic Diagrams", "Chromatography Flowsheets"],
    reagents: ["Industrial Bioprocess Case Studies"],
    keyObservations: [
      "Detailed upstream parameter controls (dissolved oxygen, pH, temperature feed).",
      "Presented downstream processing: inclusion body solubilization, sulfitolysis, disulfide refolding, and HPLC purification.",
    ],
    safetyControls: ["Biosafety Level 1 (BSL-1) host containment principles."],
    learnings:
      "Understood the systemic transition from laboratory cloning to large-scale biopharmaceutical manufacturing.",
  },
];

export default function ProjectsAndPracticals() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filter, setFilter] = useState<"all" | "practical" | "review" | "presentation">("all");

  const filtered = projects.filter((p) => {
    if (filter === "all") return true;
    return p.type === filter;
  });

  return (
    <section id="projects" className="py-24 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-muted)] block mb-2">
              04 / Practicals & Coursework
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-primary)]">
              Laboratory & Academic Work
            </h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                filter === "all"
                  ? "bg-[var(--accent-primary)] text-[var(--accent-primary-text)] border-transparent font-medium"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
              }`}
            >
              All ({projects.length})
            </button>
            <button
              onClick={() => setFilter("practical")}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                filter === "practical"
                  ? "bg-[var(--accent-primary)] text-[var(--accent-primary-text)] border-transparent font-medium"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
              }`}
            >
              Lab Practicals (4)
            </button>
            <button
              onClick={() => setFilter("review")}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                filter === "review"
                  ? "bg-[var(--accent-primary)] text-[var(--accent-primary-text)] border-transparent font-medium"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
              }`}
            >
              Reviews (1)
            </button>
            <button
              onClick={() => setFilter("presentation")}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                filter === "presentation"
                  ? "bg-[var(--accent-primary)] text-[var(--accent-primary-text)] border-transparent font-medium"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
              }`}
            >
              Seminars (1)
            </button>
          </div>
        </div>

        {/* Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-7 flex flex-col justify-between cursor-pointer group hover:border-[var(--border-hover)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div>
                {/* Meta */}
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mb-3">
                  <span className="uppercase tracking-wider">{item.typeLabel}</span>
                  <span>{item.courseworkModule}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-editorial font-normal text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs font-mono text-[var(--text-secondary)] mb-4">
                  {item.tagline}
                </p>

                {/* Brief Objective */}
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light line-clamp-3 mb-6">
                  {item.objective}
                </p>
              </div>

              {/* Bottom trigger */}
              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">
                <span>View Full Protocol</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-8 text-xs font-mono text-[var(--text-muted)] flex items-center justify-between">
          <span>* Laboratory practicals represent coursework modules performed under faculty supervision at JECRC University.</span>
        </div>

      </div>

      {/* Protocol Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] p-6 sm:p-8 shadow-2xl text-[var(--text-primary)]">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="pr-10 mb-6">
              <span className="text-xs font-mono tracking-wider uppercase text-[var(--accent-primary)] font-semibold block mb-1">
                {selectedProject.typeLabel} • {selectedProject.courseworkModule}
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial font-normal leading-snug">
                {selectedProject.title}
              </h3>
              <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                {selectedProject.tagline}
              </p>
            </div>

            {/* Body */}
            <div className="space-y-6 text-sm">
              
              {/* Objective */}
              <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                <h4 className="text-xs font-mono tracking-wider uppercase text-[var(--text-muted)] font-semibold mb-1">
                  Experimental Objective
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                  {selectedProject.objective}
                </p>
              </div>

              {/* Principle */}
              <div>
                <h4 className="text-xs font-mono tracking-wider uppercase text-[var(--text-muted)] font-semibold mb-1.5">
                  Scientific Principle
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                  {selectedProject.principle}
                </p>
              </div>

              {/* Reagents & Apparatus */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
                <div className="p-4 rounded-xl border border-[var(--border-subtle)]">
                  <h5 className="font-mono uppercase tracking-wider text-[var(--text-primary)] font-medium mb-2">
                    Apparatus
                  </h5>
                  <ul className="space-y-1 text-[var(--text-secondary)]">
                    {selectedProject.apparatus.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-[var(--border-subtle)]">
                  <h5 className="font-mono uppercase tracking-wider text-[var(--text-primary)] font-medium mb-2">
                    Key Reagents
                  </h5>
                  <ul className="space-y-1 text-[var(--text-secondary)]">
                    {selectedProject.reagents.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Observations */}
              <div>
                <h4 className="text-xs font-mono tracking-wider uppercase text-[var(--text-muted)] font-semibold mb-2">
                  Key Observations
                </h4>
                <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] font-light">
                  {selectedProject.keyObservations.map((obs, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--accent-primary)]">•</span>
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety & Learning */}
              <div className="pt-4 border-t border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)]">
                <span className="block font-semibold text-[var(--text-secondary)] mb-1">
                  Academic Takeaway:
                </span>
                <span className="font-sans text-[var(--text-secondary)] font-light">
                  {selectedProject.learnings}
                </span>
              </div>

            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedProject(null)}
              >
                Close Protocol
              </Button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
