"use client";

import React from "react";
import { FlaskConical, Clock, ArrowRight, BookOpen } from "lucide-react";
import Button from "@/components/ui/Button";
import { TabId } from "./Navbar";

interface ProjectsViewProps {
  onNavigate?: (tab: TabId) => void;
}

// Extensible project model for when genuine laboratory projects are completed in future semesters
export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  overview: string;
  methodology?: string[];
  findings?: string[];
  completionDate?: string;
}

export default function ProjectsView({ onNavigate }: ProjectsViewProps) {
  return (
    <div className="relative h-full overflow-y-auto px-6 sm:px-12 lg:px-16 py-8 md:py-14 select-text bg-[var(--bg-canvas)]">
      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <header className="border-b border-[var(--border-subtle)] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-hover)]" />
              <span className="text-xs font-sans tracking-wider uppercase text-[var(--gold-hover)] font-medium">
                Undergraduate Research
              </span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--text-primary)] tracking-tight">
              Projects & Laboratory Research
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] font-normal max-w-sm">
            Applied laboratory investigations, experimental protocols, and academic research.
          </p>
        </header>

        {/* Professional Placeholder Card */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] text-center space-y-6 shadow-sm">
          
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--gold-hover)]/10 border border-[var(--gold-border)] flex items-center justify-center text-[var(--gold-active)]">
            <FlaskConical className="w-8 h-8" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-xs font-sans text-[var(--gold-hover)] font-medium">
              <Clock className="w-3.5 h-3.5" />
              Curricular Stage • In Development
            </div>

            <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-primary)]">
              Laboratory Research in Development
            </h2>

            <p className="text-sm sm:text-base font-sans text-[var(--text-secondary)] leading-relaxed font-normal">
              As a first-year undergraduate student in B.Sc. (Hons.) Biotechnology at JECRC University, Nikita is currently focusing on foundational wet-lab discipline, Good Laboratory Practice (GLP), and core cellular theory. Dedicated investigative research projects and practical protocols will be documented here as they are conducted in forthcoming semesters.
            </p>
          </div>

          {/* Navigation to Current Work */}
          {onNavigate && (
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="md"
                onClick={() => onNavigate("education")}
                icon={<BookOpen className="w-4 h-4" />}
                iconPosition="left"
              >
                View Academic Coursework
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate("interests")}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Areas of Interest
              </Button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
