"use client";

import React, { useEffect, useRef } from "react";
import { MapPin, GraduationCap, Building2, Calendar, BookOpen, ArrowRight, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import { TabId } from "./Navbar";
import { useTheme } from "@/context/ThemeContext";
import MicroscopeIllustration from "./MicroscopeIllustration";

interface AboutViewProps {
  onNavigate: (tab: TabId) => void;
}

interface DriftingCell {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  phase: number;
  scale: number;
}

interface CytologyParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  radius: number;
  isStained: boolean; // Stained fluorescent marker node
  phase: number;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { theme } = useTheme();

  // ==============================================================
  // MICROSCOPIC LABORATORY CYTOLOGY ANIMATION
  // Distinct visual concept: Optical Brightfield / Fluorescent Cytology Field
  // ==============================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth;
      const height = Math.max(container.clientHeight, container.scrollHeight);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseRef.current.targetX = nx * 40;
      mouseRef.current.targetY = ny * 35;
    };

    container.addEventListener("mousemove", onMouseMove);

    const width = container.clientWidth;
    const height = container.clientHeight || 800;

    // Secondary independent microscopic vesicles
    const microCells: DriftingCell[] = [
      {
        x: width * 0.22,
        y: height * 0.72,
        radius: 36,
        vx: 0.04,
        vy: -0.03,
        rotation: 0.5,
        vRot: 0.0012,
        phase: 1.2,
        scale: 0.9,
      },
      {
        x: width * 0.82,
        y: height * 0.78,
        radius: 42,
        vx: -0.03,
        vy: 0.03,
        rotation: -0.8,
        vRot: -0.0015,
        phase: 3.5,
        scale: 1.0,
      },
    ];

    // Drifting cytology particulates (macromolecules & ribosomes)
    const specks: CytologyParticle[] = [];
    const totalSpecks = 40;
    for (let i = 0; i < totalSpecks; i++) {
      specks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.85 + 0.25,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        radius: i % 8 === 0 ? 3.4 : 1.3 + Math.random() * 1.5,
        isStained: i % 8 === 0,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, container.scrollHeight);

      ctx.clearRect(0, 0, w, h);

      // Smooth mouse easing for microscope parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      if (!prefersReducedMotion) {
        time += 0.012;
      }

      const isDark = theme === "dark";

      // Palette: Laboratory cytology imaging in Dark (champagne-platinum, deep biotechnology emerald) and Light (forest green, plum, gold)
      const colors = isDark
        ? {
            apertureGlow1: "rgba(4, 46, 30, 0.24)",       // Deep biotechnology forest green beam
            apertureGlow2: "rgba(16, 185, 129, 0.05)",    // Subtle emerald luminescence
            reticle: "rgba(229, 222, 201, 0.09)",         // Microscopic calibration reticle
            reticleTicks: "rgba(229, 222, 201, 0.16)",
            membraneOuter: "rgba(229, 222, 201, 0.34)",   // Champagne-platinum plasma membrane
            membraneInner: "rgba(52, 211, 153, 0.25)",    // Emerald inner leaflet
            cytoplasmFill: "rgba(4, 46, 30, 0.18)",       // Deep forest green cytoplasm
            nucleusStroke: "rgba(229, 222, 201, 0.42)",
            nucleusFill: "rgba(3, 40, 26, 0.32)",         // Deep forest green nucleus
            nucleolus: "rgba(16, 185, 129, 0.85)",        // Luminous deep emerald nucleolus
            nucleolusGlow: "rgba(52, 211, 153, 0.35)",    // Emerald aura
            chromatin: "rgba(110, 231, 183, 0.22)",       // Soft emerald chromatin matrix
            erFolds: "rgba(167, 243, 208, 0.18)",         // Translucent ER tubules
            organelleStroke: "rgba(52, 211, 153, 0.42)",
            organelleFill: "rgba(5, 150, 105, 0.22)",     // Emerald mitochondrial matrix
            speckBase: "#E2E7ED",
            speckSec: "#C8CEE8",
            stainedNode: "#059669",                        // Rich emerald green stained node
            stainedNodeCenter: "#34D399",                  // Soft emerald highlight
            stainedGlow: "rgba(16, 185, 129, 0.38)",      // Atmospheric green halo
          }
        : {
            apertureGlow1: "rgba(209, 250, 229, 0.50)",   // Soft mint-emerald optical wash
            apertureGlow2: "rgba(236, 253, 245, 0.30)",
            reticle: "rgba(6, 78, 59, 0.20)",             // Clear deep forest reticle
            reticleTicks: "rgba(6, 78, 59, 0.35)",
            membraneOuter: "rgba(6, 78, 59, 0.55)",       // Deep forest green membrane
            membraneInner: "rgba(5, 150, 105, 0.38)",     // Emerald inner leaflet
            cytoplasmFill: "rgba(209, 250, 229, 0.25)",
            nucleusStroke: "rgba(6, 78, 59, 0.65)",
            nucleusFill: "rgba(167, 243, 208, 0.30)",
            nucleolus: "rgba(4, 120, 87, 0.85)",          // Dense forest green nucleolus
            nucleolusGlow: "rgba(16, 185, 129, 0.30)",
            chromatin: "rgba(6, 78, 59, 0.35)",
            erFolds: "rgba(5, 150, 105, 0.28)",
            organelleStroke: "rgba(4, 120, 87, 0.55)",
            organelleFill: "rgba(16, 185, 129, 0.25)",
            speckBase: "#2D3748",
            speckSec: "#4A5568",
            stainedNode: "#047857",                        // Forest green in light mode
            stainedNodeCenter: "#059669",
            stainedGlow: "rgba(5, 150, 105, 0.35)",
          };

      // -----------------------------------------------------------------
      // 1. MICROSCOPE APERTURE & CIRCULAR FIELD-OF-VIEW ILLUMINATION
      // -----------------------------------------------------------------
      const focalX = w * 0.74 + mouseRef.current.x * 0.35;
      const focalY = h * 0.36 + mouseRef.current.y * 0.35;

      const beamRadius = Math.min(w * 0.45, 380);
      const opticalBeam = ctx.createRadialGradient(focalX, focalY, 30, focalX, focalY, beamRadius);
      opticalBeam.addColorStop(0, colors.apertureGlow1);
      opticalBeam.addColorStop(0.65, colors.apertureGlow2);
      opticalBeam.addColorStop(1, "transparent");
      ctx.fillStyle = opticalBeam;
      ctx.fillRect(0, 0, w, h);

      // Laboratory reticle markings (Focal calibration ring & tick marks)
      ctx.strokeStyle = colors.reticle;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.arc(focalX, focalY, beamRadius * 0.75, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(focalX, focalY, beamRadius * 0.45, 0, Math.PI * 2);
      ctx.stroke();

      // Measurement ticks at 50μm scale intervals
      ctx.strokeStyle = colors.reticleTicks;
      ctx.lineWidth = 1.0;
      const numTicks = 12;
      for (let t = 0; t < numTicks; t++) {
        const angle = (t / numTicks) * Math.PI * 2;
        const r1 = beamRadius * 0.73;
        const r2 = beamRadius * 0.77;
        ctx.beginPath();
        ctx.moveTo(focalX + Math.cos(angle) * r1, focalY + Math.sin(angle) * r1);
        ctx.lineTo(focalX + Math.cos(angle) * r2, focalY + Math.sin(angle) * r2);
        ctx.stroke();
      }

      // -----------------------------------------------------------------
      // 2. PRIMARY DETAILED EUKARYOTIC MICROSCOPIC CELL
      // Detailed phospholipid membrane, nucleus, nucleolus, ER folds, & organelles
      // -----------------------------------------------------------------
      const cellRadius = Math.min(w * 0.16, 95);
      const rotCell = prefersReducedMotion ? 0.3 : time * 0.08;

      ctx.save();
      ctx.translate(focalX, focalY);
      ctx.rotate(rotCell);

      // (A) Phospholipid Membrane - Outer Leaflet
      ctx.beginPath();
      const numPts = 42;
      for (let i = 0; i <= numPts; i++) {
        const theta = (i / numPts) * Math.PI * 2;
        const wave = Math.sin(theta * 4 + time * 0.8) * 3.8 + Math.cos(theta * 3 - time * 0.5) * 2.4;
        const r = cellRadius + wave;
        const px = Math.cos(theta) * r;
        const py = Math.sin(theta) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = colors.cytoplasmFill;
      ctx.fill();
      ctx.strokeStyle = colors.membraneOuter;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // (B) Phospholipid Membrane - Inner Leaflet
      ctx.beginPath();
      for (let i = 0; i <= numPts; i++) {
        const theta = (i / numPts) * Math.PI * 2;
        const wave = Math.sin(theta * 4 + time * 0.8) * 3.8 + Math.cos(theta * 3 - time * 0.5) * 2.4;
        const r = cellRadius - 3.8 + wave;
        const px = Math.cos(theta) * r;
        const py = Math.sin(theta) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = colors.membraneInner;
      ctx.lineWidth = 0.9;
      ctx.stroke();

      // (C) Endoplasmic Reticulum Folds (Ribbon-like cisternal loops in cytoplasm)
      ctx.strokeStyle = colors.erFolds;
      ctx.lineWidth = 1.1;
      for (let f = 0; f < 3; f++) {
        ctx.beginPath();
        const startAngle = f * 1.9 + Math.sin(time * 0.3) * 0.2;
        const arcRadius = cellRadius * 0.56 + f * 5.5;
        ctx.arc(0, 0, arcRadius, startAngle, startAngle + 1.25);
        ctx.stroke();
      }

      // (D) Mitochondria with Internal Cristae Lines
      const numMito = 3;
      for (let m = 0; m < numMito; m++) {
        const mitoAngle = m * 2.09 + time * 0.18;
        const mitoDist = cellRadius * 0.58;
        const mx = Math.cos(mitoAngle) * mitoDist;
        const my = Math.sin(mitoAngle) * mitoDist;
        ctx.save();
        ctx.translate(mx, my);
        ctx.rotate(mitoAngle + Math.PI / 2);
        ctx.strokeStyle = colors.organelleStroke;
        ctx.fillStyle = colors.organelleFill;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.lineTo(6, 0);
        ctx.stroke();
        ctx.restore();
      }

      // (E) Detailed Cell Nucleus with Chromatin Texture
      const nucRadius = cellRadius * 0.36;
      const nucX = Math.cos(time * 0.2) * 6;
      const nucY = Math.sin(time * 0.2) * 6;

      ctx.beginPath();
      ctx.arc(nucX, nucY, nucRadius, 0, Math.PI * 2);
      ctx.fillStyle = colors.nucleusFill;
      ctx.fill();
      ctx.strokeStyle = colors.nucleusStroke;
      ctx.lineWidth = 1.3;
      ctx.stroke();

      // Chromatin matrix arcs
      ctx.strokeStyle = colors.chromatin;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.arc(nucX, nucY, nucRadius * 0.65, 0.4, 2.7);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(nucX, nucY, nucRadius * 0.48, 3.2, 5.7);
      ctx.stroke();

      // Distinct Stained Nucleolus Core with luminous biotechnology emerald depth
      ctx.beginPath();
      ctx.arc(nucX + nucRadius * 0.22, nucY - nucRadius * 0.15, nucRadius * 0.40, 0, Math.PI * 2);
      ctx.fillStyle = colors.nucleolusGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(nucX + nucRadius * 0.22, nucY - nucRadius * 0.15, nucRadius * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = colors.nucleolus;
      ctx.fill();

      ctx.restore();

      // -----------------------------------------------------------------
      // 3. SECONDARY CELLULAR VESICLES (INDEPENDENT DRIFT)
      // -----------------------------------------------------------------
      microCells.forEach((c) => {
        if (!prefersReducedMotion) {
          c.x += c.vx;
          c.y += c.vy;
          c.rotation += c.vRot;

          if (c.x < -60) c.x = w + 60;
          if (c.x > w + 60) c.x = -60;
          if (c.y < -60) c.y = h + 60;
          if (c.y > h + 60) c.y = -60;
        }

        const cx = c.x + mouseRef.current.x * 0.22;
        const cy = c.y + mouseRef.current.y * 0.22;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(c.rotation);
        ctx.scale(c.scale, c.scale);

        ctx.beginPath();
        for (let i = 0; i <= 24; i++) {
          const theta = (i / 24) * Math.PI * 2;
          const wobble = Math.sin(theta * 3 + time * 0.7 + c.phase) * 2.5;
          const r = c.radius + wobble;
          const px = Math.cos(theta) * r;
          const py = Math.sin(theta) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = colors.cytoplasmFill;
        ctx.fill();
        ctx.strokeStyle = colors.membraneOuter;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Inner dense core
        ctx.beginPath();
        ctx.arc(0, 0, c.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = colors.nucleusFill;
        ctx.fill();

        ctx.restore();
      });

      // -----------------------------------------------------------------
      // 4. DRIFTING MICROSCOPIC SPECIMEN PARTICLES (NATURAL FLUID INTERACTION)
      // -----------------------------------------------------------------
      specks.forEach((s) => {
        if (!prefersReducedMotion) {
          s.x += s.vx;
          s.y += s.vy;

          if (s.x < -30) s.x = w + 30;
          if (s.x > w + 30) s.x = -30;
          if (s.y < -30) s.y = h + 30;
          if (s.y > h + 30) s.y = -30;
        }

        const px = s.x + mouseRef.current.x * s.z * 0.28;
        const py = s.y + mouseRef.current.y * s.z * 0.28;
        const r = s.radius * s.z;

        if (s.isStained) {
          // Stained fluorescent observation point (Deep Biotechnology Emerald Green)
          ctx.beginPath();
          ctx.arc(px, py, r * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = colors.stainedGlow;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = colors.stainedNode;
          ctx.fill();

          // Delicate inner highlight pip for microscopic specimen depth
          ctx.beginPath();
          ctx.arc(px - r * 0.25, py - r * 0.25, r * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = colors.stainedNodeCenter;
          ctx.fill();
        } else {
          // Standard macromolecule
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = s.z > 0.65 ? colors.speckBase : colors.speckSec;
          ctx.globalAlpha = (isDark ? 0.7 : 0.85) * s.z;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-y-auto px-6 sm:px-12 lg:px-16 py-8 md:py-14 select-text"
    >
      {/* Microscopic Cytology Atmospheric Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 select-none"
        title="Microscopic Laboratory Cytology Visualization"
      />

      {/* Realistic Animated Laboratory Microscope (Subtle Background Illustration) */}
      <MicroscopeIllustration />

      {/* Main Editorial Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <header className="border-b border-[var(--border-subtle)] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-hover)]" />
              <span className="text-xs font-sans tracking-wider uppercase text-[var(--gold-hover)] font-medium">
                Academic Profile & Background
              </span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--text-primary)] tracking-tight">
              About Nikita Singhal
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] font-normal">
            B.Sc. (Hons.) Biotechnology • JECRC University, Jaipur
          </p>
        </header>

        {/* Two-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Authentic Student Narrative (Natural Lead & Paragraphs) */}
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-sans font-normal">
              <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-normal">
                I am an undergraduate student pursuing a <strong className="font-semibold text-[var(--text-primary)]">B.Sc. (Hons.) in Biotechnology</strong> at <strong className="font-semibold text-[var(--text-primary)]">JECRC University, Jaipur</strong>. My academic pathway is grounded in a deep curiosity about living systems—how molecular instructions dictate cellular development, metabolic balance, and biological inheritance.
              </p>

              <p>
                Through intensive university laboratory coursework and practical sessions, I focus on developing disciplined, reproducible wet-lab habits. My ongoing practical training emphasizes aseptic handling under laminar airflow cabinets, precision micropipetting, microbial isolation, genomic DNA extraction protocols, and spectrophotometric quantification.
              </p>

              <p>
                I approach scientific inquiry with curiosity, empirical skepticism, and strict adherence to Good Laboratory Practice (GLP). As I advance through my honors curriculum, I am motivated to deepen my analytical and wet-lab competencies in molecular genetics, recombinant systems, and computational bioinformatics.
              </p>
            </div>

            {/* Action Buttons (Flowing naturally directly from the narrative) */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate("projects")}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                View Laboratory Work
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => onNavigate("contact")}
                icon={<Mail className="w-4 h-4" />}
                iconPosition="left"
              >
                Get in Touch
              </Button>
            </div>

          </div>

          {/* Right Column: Restrained Academic Profile Panel */}
          <div className="lg:col-span-5">
            <div className="p-7 sm:p-8 rounded-2xl bg-[var(--bg-surface)]/75 backdrop-blur-md border border-[var(--border-subtle)] space-y-6 shadow-sm">
              
              {/* Panel Header */}
              <div className="border-b border-[var(--border-subtle)] pb-4">
                <span className="text-xs font-sans tracking-wider uppercase text-[var(--gold-hover)] font-medium block mb-1">
                  Curricular Credentials
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[var(--text-primary)]">
                  Academic Profile
                </h2>
              </div>

              {/* Clean Academic Key Details List (Restrained Editorial Rows without Badges) */}
              <div className="space-y-3.5 text-xs sm:text-sm font-sans">
                
                <div className="flex items-start justify-between py-2 border-b border-[var(--border-subtle)]/60 gap-4">
                  <span className="text-[var(--text-muted)] font-normal flex items-center gap-1.5 shrink-0">
                    <Building2 className="w-3.5 h-3.5 text-[var(--gold-hover)]" />
                    Institution
                  </span>
                  <div className="text-right">
                    <span className="text-[var(--text-primary)] font-medium block">JECRC University</span>
                    <span className="text-xs text-[var(--text-muted)] flex items-center justify-end gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[var(--gold-hover)]" /> Jaipur, Rajasthan, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-[var(--border-subtle)]/60 gap-4">
                  <span className="text-[var(--text-muted)] font-normal flex items-center gap-1.5 shrink-0">
                    <GraduationCap className="w-3.5 h-3.5 text-[var(--gold-hover)]" />
                    Department
                  </span>
                  <span className="text-[var(--text-primary)] font-medium text-right">
                    Department of Biotechnology
                  </span>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-[var(--border-subtle)]/60 gap-4">
                  <span className="text-[var(--text-muted)] font-normal flex items-center gap-1.5 shrink-0">
                    <GraduationCap className="w-3.5 h-3.5 text-[var(--gold-hover)]" />
                    Degree
                  </span>
                  <span className="text-[var(--text-primary)] font-medium text-right">
                    B.Sc. (Hons.) Biotechnology
                  </span>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-[var(--border-subtle)]/60 gap-4">
                  <span className="text-[var(--text-muted)] font-normal flex items-center gap-1.5 shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-[var(--gold-hover)]" />
                    Duration
                  </span>
                  <span className="text-[var(--text-primary)] font-medium text-right">
                    Four-Year Undergraduate Programme
                  </span>
                </div>

                {/* Replaced Artificial Status Badge with Meaningful "Current Academic Focus" */}
                <div className="py-2.5 border-b border-[var(--border-subtle)]/60 space-y-1">
                  <span className="text-[var(--text-muted)] font-normal flex items-center gap-1.5 shrink-0 text-xs uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-[var(--gold-hover)]" />
                    Current Academic Focus
                  </span>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed font-normal pt-0.5">
                    Undergraduate study concentrated on molecular genetics, bacterial physiology, recombinant DNA methodology, and bioinformatic sequence tools.
                  </p>
                </div>

              </div>

              {/* Core Areas of Current Study (Clean Editorial List) */}
              <div className="pt-2 space-y-3">
                <span className="text-xs font-sans uppercase tracking-wider text-[var(--text-muted)] font-medium block">
                  Core Curricular Areas
                </span>
                <div className="grid grid-cols-2 gap-2.5 text-xs font-sans text-[var(--text-secondary)] font-normal">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-hover)] shrink-0" />
                    <span>Molecular Biology</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-hover)] shrink-0" />
                    <span>Genetics & Heredity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-hover)] shrink-0" />
                    <span>General Microbiology</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-hover)] shrink-0" />
                    <span>Biochemistry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-hover)] shrink-0" />
                    <span>Recombinant Systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-hover)] shrink-0" />
                    <span>Bioinformatics Tools</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
