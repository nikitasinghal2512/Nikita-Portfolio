"use client";

import React, { useState } from "react";
import { Layers, Dna, HeartPulse, Microscope, Sprout, Sparkles, ChevronRight } from "lucide-react";
import { TabId } from "./Navbar";
import BotanicalBackground from "./BotanicalBackground";

interface InterestsViewProps {
  onNavigate: (tab: TabId) => void;
}

interface InterestItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  overview: string;
  learningTopics: string[];
  curiosityReflection: string;
}

// 6 Beginner-Friendly Interests Tailored to a First-Year Undergraduate Student
const beginnerInterests: InterestItem[] = [
  {
    id: "cell-biology",
    index: "01",
    title: "Cell Biology",
    subtitle: "Learning about cells and how they function",
    icon: Layers,
    overview:
      "Exploring the fundamental building blocks of life. Studying how plant and animal cells maintain life, organize energy, and communicate with their surroundings.",
    learningTopics: [
      "Cell Structure & Organelles",
      "Membrane Transport Basics",
      "Cell Division & Mitosis",
      "Energy Production (ATP)"
    ],
    curiosityReflection:
      "Fascinated by how microscopic cellular components work together like tiny organized factories to keep an entire organism alive.",
  },
  {
    id: "genetics",
    index: "02",
    title: "Genetics",
    subtitle: "Exploring the basics of genes and heredity",
    icon: Dna,
    overview:
      "Understanding how biological instructions and inherited traits pass from parents to offspring. Exploring basic DNA architecture, genes, and the foundation of heredity.",
    learningTopics: [
      "DNA & RNA Basics",
      "Mendelian Inheritance Rules",
      "Dominant & Recessive Traits",
      "Chromosomes & Heredity"
    ],
    curiosityReflection:
      "Excited to learn how combinations of four simple nucleotide bases can shape the unique characteristics of every living organism on Earth.",
  },
  {
    id: "human-biology",
    index: "03",
    title: "Human Biology",
    subtitle: "Understanding the human body and its biological processes",
    icon: HeartPulse,
    overview:
      "Studying how human body systems operate in balance to sustain health. Exploring circulation, respiration, digestion, and the body's natural defenses.",
    learningTopics: [
      "Major Organ Systems",
      "Circulation & Respiration",
      "Homeostasis & Balance",
      "Basic Immune Defense"
    ],
    curiosityReflection:
      "Appreciating how coordinated and resilient the human body is in maintaining internal balance and responding to everyday health challenges.",
  },
  {
    id: "microbiology",
    index: "04",
    title: "Microbiology",
    subtitle: "Discovering microorganisms and their role in life",
    icon: Microscope,
    overview:
      "Discovering the vast microscopic world of bacteria, yeasts, and microscopic fungi. Learning how microbes support natural ecosystems, food production, and human health.",
    learningTopics: [
      "Bacteria & Microscopic Fungi",
      "Helpful vs. Harmful Microbes",
      "Aseptic Handling Basics",
      "Fermentation in Food & Life"
    ],
    curiosityReflection:
      "Amazed at how invisible single-celled organisms have such an immense influence on environmental health, medicine, and our daily diet.",
  },
  {
    id: "plant-biology",
    index: "05",
    title: "Plant Biology",
    subtitle: "Exploring plant growth, structure, and life processes",
    icon: Sprout,
    overview:
      "Exploring how plants grow, capture sunlight, absorb water, and adapt to their environments. Studying photosynthesis, plant anatomy, and the quiet resilience of flora.",
    learningTopics: [
      "Photosynthesis & Sunlight",
      "Roots, Stems & Leaves",
      "Plant Cell Structure",
      "Seed Germination & Growth"
    ],
    curiosityReflection:
      "Inspired by how plants quietly generate the oxygen and nourishment that sustain nearly all living creatures across the planet.",
  },
  {
    id: "biotechnology-everyday",
    index: "06",
    title: "Biotechnology in Everyday Life",
    subtitle: "Learning how biotechnology is used in healthcare, agriculture, and daily life",
    icon: Sparkles,
    overview:
      "Learning how biological discoveries create positive solutions in daily life—from modern vaccines and medical diagnostics to sustainable crops and environmentally friendly bio-products.",
    learningTopics: [
      "Healthcare & Vaccines",
      "Agricultural Crop Health",
      "Bio-based Clean Products",
      "Environmental Care"
    ],
    curiosityReflection:
      "Motivated by the potential of biotechnology to solve real-world problems and create a healthier, more sustainable future for everyone.",
  },
];

export default function InterestsView({ onNavigate }: InterestsViewProps) {
  const [selectedId, setSelectedId] = useState<string>(beginnerInterests[0].id);
  const active = beginnerInterests.find((a) => a.id === selectedId) || beginnerInterests[0];
  const Icon = active.icon;

  return (
    <div className="relative h-full overflow-y-auto px-6 sm:px-12 lg:px-16 py-8 md:py-14 select-text bg-[var(--bg-canvas)]">
      
      {/* Living Botanical Laboratory Canvas Background */}
      <BotanicalBackground />

      {/* Main Editorial Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <header className="border-b border-[var(--border-subtle)] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-hover)]" />
              <span className="text-xs font-sans tracking-wider uppercase text-[var(--gold-hover)] font-medium">
                Undergraduate Curricular Curiosity
              </span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--text-primary)] tracking-tight">
              Areas of Interest
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] font-normal max-w-sm">
            Introductory biological disciplines I am enthusiastic about exploring in my first year of B.Sc. (Hons.) Biotechnology at JECRC University.
          </p>
        </header>

        {/* Interactive Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Interactive List of Beginner Interests */}
          <div className="lg:col-span-5 space-y-2.5">
            {beginnerInterests.map((interest) => {
              const isCurrent = interest.id === selectedId;
              const ItemIcon = interest.icon;

              return (
                <button
                  key={interest.id}
                  onClick={() => setSelectedId(interest.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group active:scale-[0.99] cursor-pointer ${
                    isCurrent
                      ? "border-[var(--gold-border)] bg-[var(--bg-surface-elevated)]/90 shadow-sm"
                      : "border-[var(--border-subtle)] bg-[var(--bg-surface)]/75 hover:border-[var(--gold-hover)]/70 hover:bg-[var(--bg-surface-elevated)]/50"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isCurrent
                          ? "bg-[var(--gold-hover)]/15 text-[var(--gold-active)]"
                          : "bg-[var(--bg-subtle)] text-[var(--text-muted)] group-hover:text-[var(--gold-hover)]"
                      }`}
                    >
                      <ItemIcon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-sans text-[var(--text-muted)] font-medium">
                          {interest.index}
                        </span>
                        <h2
                          className={`text-sm sm:text-base font-editorial font-normal truncate transition-colors ${
                            isCurrent
                              ? "text-[var(--text-primary)] font-medium"
                              : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                          }`}
                        >
                          {interest.title}
                        </h2>
                      </div>
                      <p className="text-xs font-sans text-[var(--text-muted)] truncate mt-0.5">
                        {interest.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isCurrent
                        ? "text-[var(--gold-active)] translate-x-1"
                        : "text-[var(--text-muted)] opacity-40 group-hover:opacity-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Clean Interest Detail Panel */}
          <div className="lg:col-span-7 bg-[var(--bg-surface)]/80 backdrop-blur-md border border-[var(--border-subtle)] rounded-2xl p-7 sm:p-9 space-y-6 shadow-sm">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-6 border-b border-[var(--border-subtle)] gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold-active)] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-sans uppercase tracking-wider text-[var(--gold-hover)] font-medium block">
                    Curricular Topic {active.index} of 06
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-primary)]">
                    {active.title}
                  </h2>
                </div>
              </div>

              <span className="text-xs font-sans px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] font-normal shrink-0">
                First-Year Focus
              </span>
            </div>

            {/* Beginner-Friendly Overview */}
            <div className="space-y-2">
              <h3 className="text-xs font-sans uppercase tracking-wider text-[var(--text-muted)] font-medium">
                About This Subject
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-sans font-normal">
                {active.overview}
              </p>
            </div>

            {/* Core Introductory Learning Concepts */}
            <div className="space-y-3">
              <h3 className="text-xs font-sans uppercase tracking-wider text-[var(--text-muted)] font-medium">
                Key Concepts I Am Learning
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {active.learningTopics.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/70 text-xs sm:text-sm font-sans text-[var(--text-primary)] font-normal"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-hover)] shrink-0" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why This Excites Me (Honest Student Curiosity Reflection) */}
            <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/60 space-y-2">
              <span className="text-xs font-sans uppercase tracking-wider text-[var(--gold-hover)] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Why This Excites Me
              </span>
              <p className="font-editorial text-base sm:text-lg text-[var(--text-primary)] italic leading-relaxed font-normal">
                &ldquo;{active.curiosityReflection}&rdquo;
              </p>
            </div>

            {/* Footer Navigation */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-sans text-[var(--text-muted)] gap-3 border-t border-[var(--border-subtle)]/60">
              <span>B.Sc. (Hons.) Biotechnology • First-Year Undergraduate</span>
              <button
                onClick={() => onNavigate("projects")}
                className="text-[var(--gold-hover)] hover:underline flex items-center gap-1 font-medium transition-colors cursor-pointer"
              >
                View Laboratory Work →
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
