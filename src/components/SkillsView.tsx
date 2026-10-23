"use client";

import React from "react";
import { Microscope, Clock, ArrowRight, GraduationCap } from "lucide-react";
import Button from "@/components/ui/Button";
import { TabId } from "./Navbar";

interface SkillsViewProps {
  onNavigate?: (tab: TabId) => void;
}

// Extensible skill model for when formal technical competencies are verified
export interface SkillCategory {
  id: string;
  title: string;
  skills: {
    name: string;
    description: string;
  }[];
}

export default function SkillsView({ onNavigate }: SkillsViewProps) {
  return (
    <div className="relative h-full overflow-y-auto px-6 sm:px-12 lg:px-16 py-8 md:py-14 select-text bg-[var(--bg-canvas)]">
      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <header className="border-b border-[var(--border-subtle)] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-hover)]" />
              <span className="text-xs font-sans tracking-wider uppercase text-[var(--gold-hover)] font-medium">
                Technical Competencies
              </span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--text-primary)] tracking-tight">
              Laboratory & Technical Skills
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] font-normal max-w-sm">
            Hands-on wet-lab competencies, analytical methods, and experimental techniques.
          </p>
        </header>

        {/* Professional Placeholder Card */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] text-center space-y-6 shadow-sm">
          
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--gold-hover)]/10 border border-[var(--gold-border)] flex items-center justify-center text-[var(--gold-active)]">
            <Microscope className="w-8 h-8" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-xs font-sans text-[var(--gold-hover)] font-medium">
              <Clock className="w-3.5 h-3.5" />
              Curricular Stage • In Development
            </div>

            <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-primary)]">
              Laboratory Competencies in Progress
            </h2>

            <p className="text-sm sm:text-base font-sans text-[var(--text-secondary)] leading-relaxed font-normal">
              Technical proficiencies in aseptic handling, micropipetting, solution stoichiometry, and basic microscopy are currently being developed through guided undergraduate laboratory coursework at JECRC University. Verified technical skill categories will be presented here as formal practical certifications and curriculum milestones are attained.
            </p>
          </div>

          {/* Navigation to Current Work */}
          {onNavigate && (
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="md"
                onClick={() => onNavigate("education")}
                icon={<GraduationCap className="w-4 h-4" />}
                iconPosition="left"
              >
                View Academic Pathway
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate("about")}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                About Nikita Singhal
              </Button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
