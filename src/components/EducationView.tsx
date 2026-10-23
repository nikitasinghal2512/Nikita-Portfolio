"use client";

import React from "react";
import { GraduationCap, Building2, MapPin, Calendar, BookOpen, CheckCircle2, ArrowRight, Compass } from "lucide-react";
import { TabId } from "./Navbar";
import Button from "@/components/ui/Button";
import AcademicBackground from "./AcademicBackground";

interface EducationViewProps {
  onNavigate: (tab: TabId) => void;
}

export default function EducationView({ onNavigate }: EducationViewProps) {
  // First-Year Foundational Curricular Modules (Clearly labeled as current first-year coursework)
  const foundationalModules = [
    {
      title: "Cell Biology & Architecture",
      description: "Organelle compartmentalization, membrane transport, and basic cellular metabolism.",
    },
    {
      title: "Biomolecules & Biochemistry",
      description: "Proteins, carbohydrates, lipids, nucleic acids, and fundamental biochemical reactions.",
    },
    {
      title: "General Microbiology",
      description: "Bacterial morphology, microbial culture basics, differential staining, and aseptic habits.",
    },
    {
      title: "Genetics & Heredity",
      description: "Mendelian inheritance principles, chromosome structure, and basic genetic mechanisms.",
    },
    {
      title: "Introductory Wet-Lab Practicals",
      description: "Precision micropipetting, buffer preparation, aseptic technique, and laboratory safety.",
    },
    {
      title: "Plant & Animal Biology",
      description: "Comparative biological anatomy, plant tissue systems, photosynthesis, and physiology.",
    },
  ];

  return (
    <div className="relative h-full overflow-y-auto px-6 sm:px-12 lg:px-16 py-8 md:py-14 select-text bg-[var(--bg-canvas)]">
      
      {/* Premium Academic & Biotechnology Background Animation */}
      <AcademicBackground />

      {/* Main Editorial Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <header className="border-b border-[var(--border-subtle)] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-xs font-sans tracking-wider uppercase text-[var(--gold-hover)] font-medium">
                Academic Pathway & Qualifications
              </span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--text-primary)] tracking-tight">
              Education
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] font-normal max-w-sm">
            Formal scientific qualifications and undergraduate coursework in biotechnology.
          </p>
        </header>

        {/* Vertical Academic Timeline Cards */}
        <div className="space-y-8">
          
          {/* ============================================================== */}
          {/* 1. UNDERGRADUATE EDUCATION CARD (CURRENTLY PURSUING) */}
          {/* ============================================================== */}
          <div className="p-7 sm:p-9 rounded-2xl bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] hover:border-emerald-500/30 transition-all duration-300 space-y-6 shadow-sm group">
            
            {/* Top Bar: Status & Icon */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <GraduationCap className="w-5 h-5 text-[var(--gold-hover)]" />
                </div>
                <div>
                  <span className="text-xs font-sans uppercase tracking-wider text-[var(--gold-hover)] font-medium block">
                    Undergraduate Degree
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-primary)] mt-0.5">
                    Bachelor of Science (Honours) in Biotechnology
                  </h2>
                </div>
              </div>

              {/* Status Badge */}
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 text-xs font-sans font-medium shrink-0 self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Currently Pursuing
              </span>
            </div>

            {/* Institution & Curricular Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Left Details */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-base sm:text-lg font-medium text-[var(--text-primary)]">
                    <Building2 className="w-4 h-4 text-[var(--gold-hover)] shrink-0" />
                    <span>JECRC University, Jaipur, Rajasthan</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--gold-hover)] shrink-0" />
                    <span>Jaipur, Rajasthan, India</span>
                  </p>
                  <p className="text-xs sm:text-sm text-emerald-400/90 mt-1 font-sans">
                    Department: Biotechnology
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-[var(--text-secondary)] font-sans font-normal pt-1">
                  Enrolled in a four-year honors degree curriculum emphasizing molecular biology, microbiological systems, genetics, and good laboratory practices (GLP). Academic study combines rigorous theoretical coursework with hands-on wet-lab practical sessions under laminar airflow environments.
                </p>
              </div>

              {/* Right Key Meta Panel */}
              <div className="md:col-span-5 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/70 space-y-3.5 text-xs sm:text-sm font-sans">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]/60">
                  <span className="text-[var(--text-muted)]">Degree</span>
                  <span className="text-[var(--text-primary)] font-medium">B.Sc. (Honours) Biotechnology</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]/60">
                  <span className="text-[var(--text-muted)]">Institution</span>
                  <span className="text-[var(--text-primary)] font-medium">JECRC University</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]/60">
                  <span className="text-[var(--text-muted)]">Department</span>
                  <span className="text-[var(--text-primary)] font-medium">Biotechnology</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]/60">
                  <span className="text-[var(--text-muted)]">Program Duration</span>
                  <span className="text-[var(--text-primary)] font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[var(--gold-hover)]" />
                    Four-Year Undergraduate Honours Programme
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Status</span>
                  <span className="text-emerald-400 font-medium">Currently Pursuing</span>
                </div>
              </div>

            </div>

          </div>

          {/* ============================================================== */}
          {/* 2. SENIOR SECONDARY EDUCATION CARD (COMPLETED) */}
          {/* ============================================================== */}
          <div className="p-7 sm:p-9 rounded-2xl bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] hover:border-emerald-500/30 transition-all duration-300 space-y-6 shadow-sm group">
            
            {/* Top Bar: Status & Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <BookOpen className="w-5 h-5 text-[var(--gold-hover)]" />
                </div>
                <div>
                  <span className="text-xs font-sans uppercase tracking-wider text-[var(--gold-hover)] font-medium block">
                    Secondary Science Education
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-primary)] mt-0.5">
                    Senior Secondary Examination (Class XII)
                  </h2>
                </div>
              </div>

              {/* Status Badge */}
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] text-xs font-sans font-medium shrink-0 self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Completed Qualification
              </span>
            </div>

            {/* School & Stream Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Left Details */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-base sm:text-lg font-medium text-[var(--text-primary)]">
                    <Building2 className="w-4 h-4 text-[var(--gold-hover)] shrink-0" />
                    <span>KMD Public School, Jaipur</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--gold-hover)] shrink-0" />
                    <span>Jaipur, Rajasthan, India</span>
                  </p>
                  <p className="text-xs sm:text-sm text-emerald-400/90 mt-1 font-medium font-sans">
                    Stream: Physics, Chemistry and Biology (PCB)
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-[var(--text-secondary)] font-sans font-normal pt-1">
                  Completed senior secondary school education with specialization in Physics, Chemistry, and Biology (PCB). Built the foundational principles of organic chemistry, cellular biology, and quantitative reasoning that form the foundation for undergraduate scientific inquiry.
                </p>
              </div>

              {/* Right Key Meta Panel */}
              <div className="md:col-span-5 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/70 space-y-3.5 text-xs sm:text-sm font-sans">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]/60">
                  <span className="text-[var(--text-muted)]">Qualification</span>
                  <span className="text-[var(--text-primary)] font-medium">Class XII Senior Secondary</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]/60">
                  <span className="text-[var(--text-muted)]">School</span>
                  <span className="text-[var(--text-primary)] font-medium">KMD Public School, Jaipur</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]/60">
                  <span className="text-[var(--text-muted)]">Specialization Stream</span>
                  <span className="text-[var(--text-primary)] font-medium">PCB (Physics, Chemistry, Biology)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Status</span>
                  <span className="text-[var(--text-primary)] font-medium">Completed Qualification</span>
                </div>
              </div>

            </div>

          </div>

          {/* ============================================================== */}
          {/* 3. COMPACT RELEVANT COURSEWORK SECTION (FIRST-YEAR FOUNDATIONS) */}
          {/* ============================================================== */}
          <div className="p-7 sm:p-9 rounded-2xl bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] space-y-6 shadow-sm">
            
            <div className="border-b border-[var(--border-subtle)] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-sans uppercase tracking-wider text-[var(--gold-hover)] font-medium block mb-1">
                  Current Undergraduate Curriculum
                </span>
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[var(--text-primary)]">
                  First-Year Foundational Coursework
                </h3>
              </div>
              <p className="text-xs font-sans text-[var(--text-muted)]">
                Core subjects studied in the first-year syllabus at JECRC University
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {foundationalModules.map((mod, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/60 space-y-1.5 transition-all duration-200 hover:border-emerald-500/40 hover:bg-[var(--bg-subtle)]/80"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <h4 className="text-sm font-sans font-semibold text-[var(--text-primary)]">
                      {mod.title}
                    </h4>
                  </div>
                  <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed pl-3.5">
                    {mod.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* ============================================================== */}
          {/* 4. FOOTNOTE & SEAMLESS NAVIGATION */}
          {/* ============================================================== */}
          <div className="p-5 sm:p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/70 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-sans text-[var(--text-muted)] gap-4">
            <span className="leading-relaxed">
              * Official academic records, marks cards, and university transcripts available upon formal institutional verification.
            </span>
            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate("interests")}
                icon={<Compass className="w-3.5 h-3.5 text-emerald-400" />}
                iconPosition="left"
              >
                Areas of Interest
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate("projects")}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                View Laboratory Work
              </Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
