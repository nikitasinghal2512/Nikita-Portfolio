"use client";

import React, { useState } from "react";
import { ArrowDown, Sparkles, BookOpen } from "lucide-react";

// Standard Genetic Code Dictionary
const codonTable: Record<string, { aa: string; fullName: string; type: "hydrophobic" | "polar" | "basic" | "acidic" | "stop" }> = {
  TTT: { aa: "Phe", fullName: "Phenylalanine", type: "hydrophobic" },
  TTC: { aa: "Phe", fullName: "Phenylalanine", type: "hydrophobic" },
  TTA: { aa: "Leu", fullName: "Leucine", type: "hydrophobic" },
  TTG: { aa: "Leu", fullName: "Leucine", type: "hydrophobic" },
  TCT: { aa: "Ser", fullName: "Serine", type: "polar" },
  TCC: { aa: "Ser", fullName: "Serine", type: "polar" },
  TCA: { aa: "Ser", fullName: "Serine", type: "polar" },
  TCG: { aa: "Ser", fullName: "Serine", type: "polar" },
  TAT: { aa: "Tyr", fullName: "Tyrosine", type: "polar" },
  TAC: { aa: "Tyr", fullName: "Tyrosine", type: "polar" },
  TAA: { aa: "Stop", fullName: "Ochre Stop", type: "stop" },
  TAG: { aa: "Stop", fullName: "Amber Stop", type: "stop" },
  TGT: { aa: "Cys", fullName: "Cysteine", type: "polar" },
  TGC: { aa: "Cys", fullName: "Cysteine", type: "polar" },
  TGA: { aa: "Stop", fullName: "Opal Stop", type: "stop" },
  TGG: { aa: "Trp", fullName: "Tryptophan", type: "hydrophobic" },
  CTT: { aa: "Leu", fullName: "Leucine", type: "hydrophobic" },
  CTC: { aa: "Leu", fullName: "Leucine", type: "hydrophobic" },
  CTA: { aa: "Leu", fullName: "Leucine", type: "hydrophobic" },
  CTG: { aa: "Leu", fullName: "Leucine", type: "hydrophobic" },
  CCT: { aa: "Pro", fullName: "Proline", type: "hydrophobic" },
  CCC: { aa: "Pro", fullName: "Proline", type: "hydrophobic" },
  CCA: { aa: "Pro", fullName: "Proline", type: "hydrophobic" },
  CCG: { aa: "Pro", fullName: "Proline", type: "hydrophobic" },
  CAT: { aa: "His", fullName: "Histidine", type: "basic" },
  CAC: { aa: "His", fullName: "Histidine", type: "basic" },
  CAA: { aa: "Gln", fullName: "Glutamine", type: "polar" },
  CAG: { aa: "Gln", fullName: "Glutamine", type: "polar" },
  CGT: { aa: "Arg", fullName: "Arginine", type: "basic" },
  CGC: { aa: "Arg", fullName: "Arginine", type: "basic" },
  CGA: { aa: "Arg", fullName: "Arginine", type: "basic" },
  CGG: { aa: "Arg", fullName: "Arginine", type: "basic" },
  ATT: { aa: "Ile", fullName: "Isoleucine", type: "hydrophobic" },
  ATC: { aa: "Ile", fullName: "Isoleucine", type: "hydrophobic" },
  ATA: { aa: "Ile", fullName: "Isoleucine", type: "hydrophobic" },
  ATG: { aa: "Met", fullName: "Methionine (Start)", type: "hydrophobic" },
  ACT: { aa: "Thr", fullName: "Threonine", type: "polar" },
  ACC: { aa: "Thr", fullName: "Threonine", type: "polar" },
  ACA: { aa: "Thr", fullName: "Threonine", type: "polar" },
  ACG: { aa: "Thr", fullName: "Threonine", type: "polar" },
  AAT: { aa: "Asn", fullName: "Asparagine", type: "polar" },
  AAC: { aa: "Asn", fullName: "Asparagine", type: "polar" },
  AAA: { aa: "Lys", fullName: "Lysine", type: "basic" },
  AAG: { aa: "Lys", fullName: "Lysine", type: "basic" },
  AGT: { aa: "Ser", fullName: "Serine", type: "polar" },
  AGC: { aa: "Ser", fullName: "Serine", type: "polar" },
  AGA: { aa: "Arg", fullName: "Arginine", type: "basic" },
  AGG: { aa: "Arg", fullName: "Arginine", type: "basic" },
  GTT: { aa: "Val", fullName: "Valine", type: "hydrophobic" },
  GTC: { aa: "Val", fullName: "Valine", type: "hydrophobic" },
  GTA: { aa: "Val", fullName: "Valine", type: "hydrophobic" },
  GTG: { aa: "Val", fullName: "Valine", type: "hydrophobic" },
  GCT: { aa: "Ala", fullName: "Alanine", type: "hydrophobic" },
  GCC: { aa: "Ala", fullName: "Alanine", type: "hydrophobic" },
  GCA: { aa: "Ala", fullName: "Alanine", type: "hydrophobic" },
  GCG: { aa: "Ala", fullName: "Alanine", type: "hydrophobic" },
  GAT: { aa: "Asp", fullName: "Aspartic Acid", type: "acidic" },
  GAC: { aa: "Asp", fullName: "Aspartic Acid", type: "acidic" },
  GAA: { aa: "Glu", fullName: "Glutamic Acid", type: "acidic" },
  GAG: { aa: "Glu", fullName: "Glutamic Acid", type: "acidic" },
  GGT: { aa: "Gly", fullName: "Glycine", type: "hydrophobic" },
  GGC: { aa: "Gly", fullName: "Glycine", type: "hydrophobic" },
  GGA: { aa: "Gly", fullName: "Glycine", type: "hydrophobic" },
  GGG: { aa: "Gly", fullName: "Glycine", type: "hydrophobic" },
};

const presets = [
  { name: "Model Hexapeptide", dna: "ATGGCTAAAGACTTAGTATGA" },
  { name: "Insulin Signal Motif", dna: "ATGGCCCTGTGGATGCGCCTC" },
  { name: "GFP Beta-Can N-Term", dna: "ATGAGTAAAGGAGAAGAACTT" },
];

export default function InteractiveDogma() {
  const [dnaInput, setDnaInput] = useState<string>("ATGGCTAAAGACTTAGTATGA");

  const cleanDNA = dnaInput.toUpperCase().replace(/[^ACGT]/g, "");

  const complementDNA = cleanDNA
    .split("")
    .map((b) => (b === "A" ? "T" : b === "T" ? "A" : b === "G" ? "C" : b === "C" ? "G" : b))
    .join("");

  const mRNA = cleanDNA.replace(/T/g, "U");

  const codons: string[] = [];
  for (let i = 0; i < cleanDNA.length; i += 3) {
    const trip = cleanDNA.slice(i, i + 3);
    if (trip.length === 3) codons.push(trip);
  }

  const translated = codons.map((codon) => codonTable[codon] || { aa: "???", fullName: "Unknown", type: "hydrophobic" });

  return (
    <section id="interactive-lab" className="py-24 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-muted)] block mb-2">
              07 / Interactive Lab Tool
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-primary)]">
              Central Dogma Simulation
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md font-light">
            An illustrative simulation of the flow of genetic information: DNA transcription into messenger RNA and ribosomal translation into amino acids.
          </p>
        </div>

        {/* The Board */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-7 sm:p-9 space-y-6">
          
          {/* Preset Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[var(--border-subtle)] gap-3 text-xs font-mono">
            <span className="text-[var(--text-muted)] uppercase tracking-wider">
              Sample Biological Sequences:
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setDnaInput(p.dna)}
                  className="px-3 py-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Step 1: DNA Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
              <span className="font-medium text-[var(--text-primary)]">1. Sense DNA Coding Strand (5&apos; → 3&apos;)</span>
              <span>{cleanDNA.length} Bases ({codons.length} Codons)</span>
            </div>
            <input
              type="text"
              value={dnaInput}
              onChange={(e) => setDnaInput(e.target.value.toUpperCase().replace(/[^ACGT]/g, "").slice(0, 36))}
              placeholder="ENTER NUCLEOTIDES (A, T, G, C)..."
              className="w-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm font-mono text-[var(--text-primary)] tracking-[0.2em] focus:outline-none focus:border-[var(--accent-primary)] transition-colors uppercase"
              maxLength={36}
            />
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] pt-1">
              <span>Complementary Template (3&apos; → 5&apos;):</span>
              <span className="tracking-[0.2em] text-[var(--text-secondary)]">{complementDNA || "..."}</span>
            </div>
          </div>

          {/* Flow Indicator */}
          <div className="flex items-center justify-center text-xs font-mono text-[var(--text-muted)] py-1">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)]">
              <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>RNA Polymerase Transcription (T → U)</span>
            </span>
          </div>

          {/* Step 2: mRNA Transcript */}
          <div className="space-y-2">
            <span className="block text-xs font-mono text-[var(--text-primary)] font-medium">
              2. Messenger RNA Transcript (5&apos; → 3&apos;)
            </span>
            <div className="p-3 bg-[var(--bg-subtle)] rounded-xl border border-[var(--border-subtle)] font-mono text-sm text-[var(--text-primary)] tracking-[0.2em] overflow-x-auto">
              {mRNA || "AWAITING INPUT..."}
            </div>
          </div>

          {/* Flow Indicator */}
          <div className="flex items-center justify-center text-xs font-mono text-[var(--text-muted)] py-1">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)]">
              <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
              <span>Ribosomal Translation via tRNA</span>
            </span>
          </div>

          {/* Step 3: Polypeptide Chain */}
          <div className="space-y-3">
            <span className="block text-xs font-mono text-[var(--text-primary)] font-medium">
              3. Polypeptide Chain (N-Terminus → C-Terminus)
            </span>

            {translated.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1.5 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]">
                <span className="text-xs font-mono text-[var(--text-muted)] mr-1">H₂N —</span>
                {translated.map((res, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div
                      className="px-2.5 py-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] text-center text-xs font-mono shadow-xs"
                      title={`${codons[i]} → ${res.fullName} (${res.type})`}
                    >
                      <span className="block font-semibold text-[var(--text-primary)]">{res.aa}</span>
                      <span className="block text-[9px] text-[var(--text-muted)]">{codons[i]}</span>
                    </div>
                    {i < translated.length - 1 && (
                      <span className="text-[var(--text-muted)] font-mono text-xs">—</span>
                    )}
                  </div>
                ))}
                <span className="text-xs font-mono text-[var(--text-muted)] ml-1">— COOH</span>
              </div>
            ) : (
              <p className="text-xs font-mono text-[var(--text-muted)] italic">
                Enter at least 3 nucleotides to observe translation.
              </p>
            )}

            {/* Classification Legend */}
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-[var(--text-muted)] pt-2">
              <span className="text-[var(--text-secondary)] font-medium">Codon Classes:</span>
              <span>Non-Polar / Hydrophobic</span>
              <span>•</span>
              <span>Polar Uncharged</span>
              <span>•</span>
              <span>Basic / Acidic</span>
              <span>•</span>
              <span>Termination Stop</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
