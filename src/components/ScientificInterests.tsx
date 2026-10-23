"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface Interest {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  keyQuestion: string;
}

const interests: Interest[] = [
  {
    index: "01",
    title: "Molecular Biology",
    subtitle: "Gene Expression & Regulation",
    description:
      "Study of the central dogma—transcription, post-transcriptional processing, and translation cascades governing cellular responses.",
    keyQuestion: "How do subtle biochemical signals modulate transcription factor affinity?",
  },
  {
    index: "02",
    title: "Genetics & Heredity",
    subtitle: "Chromosomal Dynamics & Transmission",
    description:
      "Exploration of Mendelian inheritance patterns, recombination mechanisms, chromosomal integrity, and hereditary variations.",
    keyQuestion: "What genetic variations drive selective evolutionary advantage versus susceptibility?",
  },
  {
    index: "03",
    title: "Microbiology & Culture",
    subtitle: "Microbial Morphology & Kinetics",
    description:
      "Aseptic culture isolation, differential staining, bacterial growth kinetics, and understanding antimicrobial resistance mechanisms.",
    keyQuestion: "How do bacterial biofilms adapt to environmental and chemical stress?",
  },
  {
    index: "04",
    title: "Cell Biology & Signaling",
    subtitle: "Organellar Traffic & Transduction",
    description:
      "Investigation into transmembrane receptor signaling, metabolic pathways, cell cycle checkpoints, and programmed cell death (apoptosis).",
    keyQuestion: "How are extracellular stimuli transduced into discrete intranuclear outcomes?",
  },
  {
    index: "05",
    title: "Genetic Engineering",
    subtitle: "Recombinant Vectors & Gene Editing",
    description:
      "Principles of recombinant DNA technology, plasmid vector construction, restriction enzymes, and modern CRISPR-Cas9 genome editing concepts.",
    keyQuestion: "How can target cleavage specificity be optimized to minimize off-target events?",
  },
  {
    index: "06",
    title: "Bioinformatics & In Silico",
    subtitle: "Computational Biology & Databases",
    description:
      "Sequence alignment algorithms, querying NCBI GenBank, BLAST searches, and structural interrogation of macromolecular structures.",
    keyQuestion: "How can in silico predictive models streamline wet-lab hypothesis testing?",
  },
];

export default function ScientificInterests() {
  const [activeInterest, setActiveInterest] = useState<string | null>(null);

  return (
    <section id="interests" className="py-24 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-muted)] block mb-2">
              02 / Curricular Focus
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-primary)]">
              Scientific Interests
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md font-light">
            Areas of undergraduate inquiry and academic curiosity explored through university lectures, literature reading, and laboratory sessions.
          </p>
        </div>

        {/* Clean Typographic Editorial List */}
        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {interests.map((item) => (
            <div
              key={item.index}
              onMouseEnter={() => setActiveInterest(item.index)}
              onMouseLeave={() => setActiveInterest(null)}
              className="py-8 group transition-colors duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
                
                {/* Index & Title */}
                <div className="lg:col-span-5 flex items-baseline gap-4">
                  <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">
                    {item.index}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-editorial text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-4 text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                  {item.description}
                </div>

                {/* Key Question */}
                <div className="lg:col-span-3 text-xs text-[var(--text-muted)] italic font-editorial leading-normal pt-1">
                  &ldquo;{item.keyQuestion}&rdquo;
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-8 text-xs font-mono text-[var(--text-muted)] flex items-center justify-between">
          <span>* Topics represent academic study and may be customized as specialization progresses.</span>
          <span>JECRC University</span>
        </div>

      </div>
    </section>
  );
}
