"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface DriftingElement {
  type: "book" | "botanical" | "molecule" | "annotation" | "particle";
  x: number;
  y: number;
  z: number; // 0.35 (distant background) to 1.1 (near field)
  vx: number;
  vy: number;
  scale: number;
  rotation: number;
  vRot: number;
  opacity: number;
  content?: string; // For annotation text
  phase: number;
}

export default function AcademicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? Math.max(parent.clientHeight, parent.scrollHeight) : window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseRef.current.targetX = nx * 35;
      mouseRef.current.targetY = ny * 30;
    };

    window.addEventListener("mousemove", onMouseMove);

    const initialWidth = canvas.parentElement?.clientWidth || 1200;
    const initialHeight = canvas.parentElement?.clientHeight || 900;

    // Handwritten scientific annotations connecting academia with biotechnology
    const annotationsList = [
      "λ = 260 nm",
      "pH 7.4",
      "ΔG° < 0",
      "Km = [S]",
      "α-helix",
      "5' → 3'",
      "∂f / ∂t",
      "∫ ψ*ψ dV",
      "A = ε·c·l",
      "ΔH - TΔS",
      "H₂O + CO₂",
      "ATP ⇌ ADP",
    ];

    // Multi-depth academic and biotechnology drifting elements
    const elements: DriftingElement[] = [];

    // 1. Line-Art Floating Books (3 at different depths)
    const bookPositions = [
      { x: initialWidth * 0.82, y: initialHeight * 0.22, z: 0.95, scale: 0.9, rot: -0.1 },
      { x: initialWidth * 0.15, y: initialHeight * 0.76, z: 0.75, scale: 0.75, rot: 0.14 },
      { x: initialWidth * 0.88, y: initialHeight * 0.82, z: 0.55, scale: 0.65, rot: -0.18 },
    ];

    bookPositions.forEach((bp, i) => {
      elements.push({
        type: "book",
        x: bp.x,
        y: bp.y,
        z: bp.z,
        vx: (i % 2 === 0 ? 0.05 : -0.04),
        vy: -0.04 - Math.random() * 0.03,
        scale: bp.scale,
        rotation: bp.rot,
        vRot: (Math.random() - 0.5) * 0.001,
        opacity: 0.24 + bp.z * 0.12,
        phase: i * 2.1,
      });
    });

    // 2. Botanical Herbarium Line-Art Sketches (2 elements)
    elements.push({
      type: "botanical",
      x: initialWidth * 0.12,
      y: initialHeight * 0.28,
      z: 0.75,
      vx: 0.03,
      vy: -0.05,
      scale: 0.85,
      rotation: -0.35,
      vRot: 0.0008,
      opacity: 0.28,
      phase: 1.4,
    });
    elements.push({
      type: "botanical",
      x: initialWidth * 0.78,
      y: initialHeight * 0.58,
      z: 0.60,
      vx: -0.04,
      vy: -0.03,
      scale: 0.70,
      rotation: 0.25,
      vRot: -0.0007,
      opacity: 0.22,
      phase: 3.8,
    });

    // 3. Molecular Structural Ring Sketches (2 elements)
    elements.push({
      type: "molecule",
      x: initialWidth * 0.32,
      y: initialHeight * 0.16,
      z: 0.65,
      vx: 0.04,
      vy: -0.04,
      scale: 0.80,
      rotation: 0.2,
      vRot: 0.001,
      opacity: 0.24,
      phase: 0.7,
    });
    elements.push({
      type: "molecule",
      x: initialWidth * 0.68,
      y: initialHeight * 0.88,
      z: 0.50,
      vx: -0.03,
      vy: -0.05,
      scale: 0.75,
      rotation: -0.25,
      vRot: -0.0012,
      opacity: 0.20,
      phase: 2.9,
    });

    // 4. Handwritten Scientific Annotations (Marginalia)
    annotationsList.forEach((text, i) => {
      elements.push({
        type: "annotation",
        x: Math.random() * initialWidth,
        y: Math.random() * initialHeight,
        z: 0.40 + Math.random() * 0.60,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -0.05 - Math.random() * 0.07,
        scale: 0.75 + Math.random() * 0.4,
        rotation: (Math.random() - 0.5) * 0.25,
        vRot: (Math.random() - 0.5) * 0.0008,
        opacity: 0.14 + Math.random() * 0.14,
        content: text,
        phase: Math.random() * Math.PI * 2,
      });
    });

    // 5. Softly Illuminated Golden & Forest-Green Particles
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      elements.push({
        type: "particle",
        x: Math.random() * initialWidth,
        y: Math.random() * initialHeight,
        z: 0.35 + Math.random() * 0.75,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        scale: 1.0 + Math.random() * 1.5,
        rotation: 0,
        vRot: 0,
        opacity: 0.45 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? Math.max(parent.clientHeight, parent.scrollHeight) : window.innerHeight;

      if (!prefersReducedMotion) {
        time += 0.012;
      }

      // Smooth mouse easing for parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      const isDark = theme === "dark";

      // Palette: Muted forest green, soft ivory, desaturated sage, and restrained champagne gold
      const colors = isDark
        ? {
            lightBeam: "rgba(6, 44, 30, 0.20)",             // Forest green scholarly study light
            lightBeam2: "rgba(18, 24, 38, 0.25)",
            bookStroke: "rgba(232, 212, 174, 0.36)",       // Champagne gold open book
            bookSpine: "rgba(232, 212, 174, 0.50)",
            bookFill: "rgba(8, 14, 20, 0.45)",
            pageTurn: "rgba(52, 211, 153, 0.24)",          // Sage green page curl
            botanicalStroke: "rgba(52, 211, 153, 0.35)",   // Sage green herbarium frond
            botanicalFill: "rgba(6, 44, 30, 0.18)",
            moleculeStroke: "rgba(110, 231, 183, 0.32)",   // Technical molecular bond line
            moleculeFill: "rgba(16, 185, 129, 0.08)",
            annotationText: "rgba(244, 243, 240, 0.28)",   // Soft ivory manuscript ink
            annotationAlt: "rgba(232, 212, 174, 0.32)",    // Champagne gold annotation
            goldParticle: "rgba(232, 212, 174, 0.75)",     // Restrained champagne-gold mote
            goldGlow: "rgba(232, 212, 174, 0.32)",
            greenParticle: "rgba(52, 211, 153, 0.70)",     // Forest-green mote
            greenGlow: "rgba(16, 185, 129, 0.30)",
          }
        : {
            lightBeam: "rgba(220, 245, 232, 0.45)",
            lightBeam2: "rgba(224, 218, 234, 0.30)",
            bookStroke: "rgba(74, 14, 53, 0.35)",
            bookSpine: "rgba(74, 14, 53, 0.55)",
            bookFill: "rgba(244, 240, 248, 0.50)",
            pageTurn: "rgba(47, 94, 69, 0.30)",
            botanicalStroke: "rgba(47, 94, 69, 0.42)",
            botanicalFill: "rgba(209, 250, 229, 0.25)",
            moleculeStroke: "rgba(35, 75, 54, 0.38)",
            moleculeFill: "rgba(220, 245, 232, 0.20)",
            annotationText: "rgba(74, 14, 53, 0.35)",
            annotationAlt: "rgba(160, 116, 24, 0.40)",
            goldParticle: "rgba(160, 116, 24, 0.75)",
            goldGlow: "rgba(160, 116, 24, 0.30)",
            greenParticle: "rgba(47, 94, 69, 0.70)",
            greenGlow: "rgba(47, 94, 69, 0.25)",
          };

      // 1. Clear frame so the exact same --bg-canvas token shines through identically to About & Interests
      ctx.clearRect(0, 0, w, h);

      // 2. Archival Study Light / Charcoal & Deep Forest Gradient Cone
      const studyX = w * 0.80;
      const studyY = h * 0.20;
      const studyCone = ctx.createRadialGradient(studyX, studyY, 20, studyX, studyY, Math.min(w * 0.6, 520));
      studyCone.addColorStop(0, colors.lightBeam);
      studyCone.addColorStop(0.5, colors.lightBeam2);
      studyCone.addColorStop(1, "transparent");
      ctx.fillStyle = studyCone;
      ctx.fillRect(0, 0, w, h);

      // 3. Render Multi-Depth Academic Elements with 3D Parallax Drift
      elements.forEach((el, index) => {
        if (!prefersReducedMotion) {
          el.x += el.vx * el.z;
          el.y += el.vy * el.z;
          el.rotation += el.vRot;

          if (el.y < -60) el.y = h + 60;
          if (el.x < -60) el.x = w + 60;
          if (el.x > w + 60) el.x = -60;
          if (el.y > h + 60) el.y = -60;
        }

        // Parallax offset proportional to z-depth
        const px = el.x + mouseRef.current.x * el.z * 0.35;
        const py = el.y + mouseRef.current.y * el.z * 0.35;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(el.rotation);
        ctx.scale(el.scale * el.z, el.scale * el.z);
        ctx.globalAlpha = el.opacity;

        // --- TYPE: BOOK (Minimal Line-Art Open Book Silhouette) ---
        if (el.type === "book") {
          const bookSway = prefersReducedMotion ? 0 : Math.sin(time * 0.5 + el.phase) * 3;
          ctx.translate(0, bookSway);

          const bookW = 66;
          const bookH = 44;

          // Curved Center Spine
          ctx.beginPath();
          ctx.moveTo(0, -bookH * 0.42);
          ctx.quadraticCurveTo(2, 0, 0, bookH * 0.48);
          ctx.strokeStyle = colors.bookSpine;
          ctx.lineWidth = 1.6;
          ctx.stroke();

          // Left Open Page Spread
          ctx.beginPath();
          ctx.moveTo(0, -bookH * 0.42);
          ctx.bezierCurveTo(-bookW * 0.35, -bookH * 0.55, -bookW * 0.75, -bookH * 0.45, -bookW, -bookH * 0.34);
          ctx.lineTo(-bookW, bookH * 0.40);
          ctx.bezierCurveTo(-bookW * 0.75, bookH * 0.30, -bookW * 0.35, bookH * 0.40, 0, bookH * 0.48);
          ctx.fillStyle = colors.bookFill;
          ctx.fill();
          ctx.strokeStyle = colors.bookStroke;
          ctx.lineWidth = 1.3;
          ctx.stroke();

          // Left Interior Marginalia Lines
          for (let l = 0; l < 4; l++) {
            const ly = -bookH * 0.22 + l * 7.5;
            ctx.beginPath();
            ctx.moveTo(-bookW * 0.80, ly);
            ctx.lineTo(-bookW * 0.24, ly + 0.8);
            ctx.strokeStyle = colors.pageTurn;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }

          // Right Open Page Spread
          ctx.beginPath();
          ctx.moveTo(0, -bookH * 0.42);
          ctx.bezierCurveTo(bookW * 0.35, -bookH * 0.55, bookW * 0.75, -bookH * 0.45, bookW, -bookH * 0.34);
          ctx.lineTo(bookW, bookH * 0.40);
          ctx.bezierCurveTo(bookW * 0.75, bookH * 0.30, bookW * 0.35, bookH * 0.40, 0, bookH * 0.48);
          ctx.fillStyle = colors.bookFill;
          ctx.fill();
          ctx.strokeStyle = colors.bookStroke;
          ctx.lineWidth = 1.3;
          ctx.stroke();

          // Right Interior Marginalia Lines
          for (let l = 0; l < 4; l++) {
            const ly = -bookH * 0.22 + l * 7.5;
            ctx.beginPath();
            ctx.moveTo(bookW * 0.24, ly + 0.8);
            ctx.lineTo(bookW * 0.80, ly);
            ctx.strokeStyle = colors.pageTurn;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }

          // Turning Page Arch (Fine paper-page movement)
          const turnCycle = prefersReducedMotion ? 0.3 : (Math.sin(time * 0.65 + el.phase) + 1) * 0.5;
          const turnArchX = (turnCycle - 0.5) * bookW * 0.85;
          ctx.beginPath();
          ctx.moveTo(0, -bookH * 0.42);
          ctx.quadraticCurveTo(turnArchX * 0.8, -bookH * 0.65, turnArchX, -bookH * 0.38);
          ctx.lineTo(turnArchX, bookH * 0.36);
          ctx.quadraticCurveTo(turnArchX * 0.8, bookH * 0.52, 0, bookH * 0.48);
          ctx.strokeStyle = colors.pageTurn;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }

        // --- TYPE: BOTANICAL (Herbarium Specimen Line Sketch) ---
        else if (el.type === "botanical") {
          const stemLength = 80;
          ctx.beginPath();
          ctx.moveTo(0, stemLength * 0.5);
          ctx.quadraticCurveTo(10, 0, 0, -stemLength * 0.5);
          ctx.strokeStyle = colors.botanicalStroke;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Attached Leaves with Fine Venation
          for (let leaf = -2; leaf <= 2; leaf++) {
            const ly = leaf * 16;
            const dir = leaf % 2 === 0 ? 1 : -1;
            const lLen = 28;
            const lWid = 11;

            ctx.save();
            ctx.translate(dir * 3, ly);
            ctx.rotate((dir * 0.55) + (prefersReducedMotion ? 0 : Math.sin(time * 0.4 + el.phase) * 0.05));

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(lLen * 0.5, -lWid, lLen, 0);
            ctx.quadraticCurveTo(lLen * 0.5, lWid, 0, 0);
            ctx.fillStyle = colors.botanicalFill;
            ctx.fill();
            ctx.strokeStyle = colors.botanicalStroke;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Leaf Midrib
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(lLen, 0);
            ctx.strokeStyle = colors.botanicalStroke;
            ctx.lineWidth = 0.6;
            ctx.stroke();

            ctx.restore();
          }
        }

        // --- TYPE: MOLECULE (Biochemical Purine / Benzene Ring Sketch) ---
        else if (el.type === "molecule") {
          const ringRadius = 24;
          const sides = 6;

          // Hexagonal Aromatic Ring
          ctx.beginPath();
          for (let s = 0; s <= sides; s++) {
            const theta = (s / sides) * Math.PI * 2;
            const sx = Math.cos(theta) * ringRadius;
            const sy = Math.sin(theta) * ringRadius;
            if (s === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          ctx.closePath();
          ctx.fillStyle = colors.moleculeFill;
          ctx.fill();
          ctx.strokeStyle = colors.moleculeStroke;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Alternating Double Bond Arcs
          for (let b = 0; b < 3; b++) {
            const theta1 = (b * 2 / sides) * Math.PI * 2;
            const theta2 = ((b * 2 + 1) / sides) * Math.PI * 2;
            const rIn = ringRadius * 0.78;
            ctx.beginPath();
            ctx.moveTo(Math.cos(theta1) * rIn, Math.sin(theta1) * rIn);
            ctx.lineTo(Math.cos(theta2) * rIn, Math.sin(theta2) * rIn);
            ctx.strokeStyle = colors.moleculeStroke;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }

          // Extended Functional Group Bond Stems
          ctx.beginPath();
          ctx.moveTo(Math.cos(0) * ringRadius, Math.sin(0) * ringRadius);
          ctx.lineTo(Math.cos(0) * (ringRadius + 14), Math.sin(0) * (ringRadius + 14));
          ctx.moveTo(Math.cos(Math.PI * 0.66) * ringRadius, Math.sin(Math.PI * 0.66) * ringRadius);
          ctx.lineTo(Math.cos(Math.PI * 0.66) * (ringRadius + 12), Math.sin(Math.PI * 0.66) * (ringRadius + 12));
          ctx.strokeStyle = colors.moleculeStroke;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }

        // --- TYPE: ANNOTATION (Faint Handwritten Scientific Manuscript Formula) ---
        else if (el.type === "annotation" && el.content) {
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = `italic 16px "Cormorant Garamond", Georgia, serif`;
          ctx.fillStyle = index % 2 === 0 ? colors.annotationText : colors.annotationAlt;
          ctx.fillText(el.content, 0, 0);
        }

        // --- TYPE: PARTICLE (Illuminated Golden / Forest-Green Motes) ---
        else if (el.type === "particle") {
          const r = el.scale;
          const isGold = index % 2 === 0;

          ctx.beginPath();
          ctx.arc(0, 0, r * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = isGold ? colors.goldGlow : colors.greenGlow;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fillStyle = isGold ? colors.goldParticle : colors.greenParticle;
          ctx.fill();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 select-none"
        title="Premium Academic & Biotechnology Background Visualization"
      />
    </div>
  );
}
