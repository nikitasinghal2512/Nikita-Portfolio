"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface FloatingPollen {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  z: number;
  phase: number;
}

export default function BotanicalBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
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

    // Initialise drifting pollen / chloroplast vesicles
    const particles: FloatingPollen[] = [];
    const particleCount = 22;
    const initialWidth = canvas.parentElement?.clientWidth || 1200;
    const initialHeight = canvas.parentElement?.clientHeight || 800;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * initialWidth,
        y: Math.random() * initialHeight,
        radius: 1.2 + Math.random() * 2.0,
        vx: (Math.random() - 0.3) * 0.15,
        vy: -0.08 - Math.random() * 0.12, // Gently drifting upward like forest spores
        z: 0.3 + Math.random() * 0.7,
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

      const isDark = theme === "dark";

      // Palette: Sophisticated Botanical Greens, Muted Moss & Restrained Gold Sap
      // Uses the exact same background design token as About section, with enhanced green contrast
      const colors = isDark
        ? {
            lightBeam: "rgba(6, 44, 30, 0.28)",            // Conservatory skylight beam
            lightBeamCenter: "rgba(16, 185, 129, 0.08)",
            leafFill: "rgba(10, 48, 34, 0.28)",            // Translucent foliage silhouette
            leafBorder: "rgba(52, 211, 153, 0.42)",        // Clearly defined crisp emerald leaf margin
            leafVeinBase: "rgba(52, 211, 153, 0.36)",      // Primary vascular vein
            leafVeinGlow: "rgba(245, 197, 85, 0.65)",      // Sap transpiration illumination
            stomaBorder: "rgba(52, 211, 153, 0.38)",       // Microscopic plant stomata
            stomaFill: "rgba(16, 185, 129, 0.18)",
            epidermisCells: "rgba(52, 211, 153, 0.14)",    // Plant cell wall mosaic
            sporeBase: "rgba(110, 231, 183, 0.65)",        // Botanical spore / chloroplast
            sporeGlow: "rgba(16, 185, 129, 0.35)",
          }
        : {
            lightBeam: "rgba(220, 245, 232, 0.50)",
            lightBeamCenter: "rgba(209, 250, 229, 0.25)",
            leafFill: "rgba(47, 94, 69, 0.18)",
            leafBorder: "rgba(35, 75, 54, 0.45)",
            leafVeinBase: "rgba(22, 101, 52, 0.48)",
            leafVeinGlow: "rgba(180, 115, 20, 0.50)",
            stomaBorder: "rgba(47, 94, 69, 0.42)",
            stomaFill: "rgba(35, 75, 54, 0.20)",
            epidermisCells: "rgba(47, 94, 69, 0.16)",
            sporeBase: "rgba(47, 94, 69, 0.70)",
            sporeGlow: "rgba(47, 94, 69, 0.30)",
          };

      // 1. Clear frame so the exact same --bg-canvas token as the About section shines through
      ctx.clearRect(0, 0, w, h);

      // 2. Gentle Conservatory Skylight / Ambient Laboratory Light Cone
      const beamX = w * 0.85;
      const beamY = h * 0.15;
      const beamGrad = ctx.createRadialGradient(beamX, beamY, 20, beamX, beamY, Math.min(w * 0.6, 500));
      beamGrad.addColorStop(0, colors.lightBeamCenter);
      beamGrad.addColorStop(0.5, colors.lightBeam);
      beamGrad.addColorStop(1, "transparent");
      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, 0, w, h);

      // 3. Microscopic Plant Epidermal Cell Wall Mosaic (Subtle leaf histology)
      // Placed in upper right background
      ctx.save();
      ctx.strokeStyle = colors.epidermisCells;
      ctx.lineWidth = 1.0;
      const gridOriginX = w * 0.68;
      const gridOriginY = h * 0.12;
      const cellCountX = 6;
      const cellCountY = 5;
      const cellSpacing = 36;

      for (let cx = 0; cx < cellCountX; cx++) {
        for (let cy = 0; cy < cellCountY; cy++) {
          const px = gridOriginX + cx * cellSpacing + ((cy % 2) * cellSpacing) / 2;
          const py = gridOriginY + cy * (cellSpacing * 0.86);

          // Wavy plant pavement cell outline
          ctx.beginPath();
          for (let p = 0; p <= 6; p++) {
            const angle = (p / 6) * Math.PI * 2;
            const wobble = Math.sin(angle * 3 + time * 0.4 + cx * 0.5) * 2.2;
            const r = 16 + wobble;
            const vx = px + Math.cos(angle) * r;
            const vy = py + Math.sin(angle) * r;
            if (p === 0) ctx.moveTo(vx, vy);
            else ctx.lineTo(vx, vy);
          }
          ctx.stroke();
        }
      }

      // Microscopic Stomatal Pore Complexes (Breathing plant gas exchange)
      const stomata = [
        { x: gridOriginX + cellSpacing * 2.5, y: gridOriginY + cellSpacing * 1.8, phase: 0 },
        { x: gridOriginX + cellSpacing * 4.2, y: gridOriginY + cellSpacing * 3.2, phase: 1.8 },
      ];

      stomata.forEach((s) => {
        const poreCycle = (Math.sin(time * 0.6 + s.phase) + 1) * 0.5; // 0 to 1
        const poreWidth = 1.8 + poreCycle * 2.5;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(0.35 + s.phase);

        // Guard Cell Left
        ctx.beginPath();
        ctx.ellipse(-poreWidth - 3, 0, 4.5, 9, 0, 0, Math.PI * 2);
        ctx.fillStyle = colors.stomaFill;
        ctx.fill();
        ctx.strokeStyle = colors.stomaBorder;
        ctx.stroke();

        // Guard Cell Right
        ctx.beginPath();
        ctx.ellipse(poreWidth + 3, 0, 4.5, 9, 0, 0, Math.PI * 2);
        ctx.fillStyle = colors.stomaFill;
        ctx.fill();
        ctx.strokeStyle = colors.stomaBorder;
        ctx.stroke();

        // Stomatal Aperture Center
        ctx.beginPath();
        ctx.ellipse(0, 0, Math.max(0.6, poreWidth), 6, 0, 0, Math.PI * 2);
        ctx.strokeStyle = colors.leafVeinGlow;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
      });
      ctx.restore();

      // 4. Botanical Foliage Silhouette & Illuminating Leaf Veins
      // Function to render an organic botanical leaf with vascular transpiration veins
      const drawBotanicalLeaf = (
        baseX: number,
        baseY: number,
        length: number,
        width: number,
        angle: number,
        swayOffset: number,
        leafIndex: number
      ) => {
        ctx.save();
        ctx.translate(baseX, baseY);

        // Slow, fluid botanical swaying
        const dynamicSway = Math.sin(time * 0.45 + swayOffset) * 0.05;
        ctx.rotate(angle + dynamicSway);

        const tipX = length;
        const tipY = 0;
        const cpX1 = length * 0.45;
        const cpY1 = -width;
        const cpX2 = length * 0.45;
        const cpY2 = width;

        // Leaf Blade Silhouette
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(cpX1 * 0.6, cpY1, cpX1 * 1.2, cpY1 * 0.8, tipX, tipY);
        ctx.bezierCurveTo(cpX2 * 1.2, cpY2 * 0.8, cpX2 * 0.6, cpY2, 0, 0);
        ctx.fillStyle = colors.leafFill;
        ctx.fill();
        ctx.strokeStyle = colors.leafBorder;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Primary Vascular Midrib Vein
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(length * 0.5, dynamicSway * 12, tipX, tipY);
        ctx.strokeStyle = colors.leafVeinBase;
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Transpiration Pulse along the leaf veins (fluid moving through plant tissue)
        const transpirationPulse = (Math.sin(time * 0.9 - leafIndex * 0.7) + 1) * 0.5;

        // Lateral Secondary Veins branching from midrib to leaf margin
        const numVeins = 5;
        for (let v = 1; v <= numVeins; v++) {
          const frac = v / (numVeins + 1);
          const vx = length * frac;
          const vy = dynamicSway * 12 * frac;
          const veinLen = width * (1 - Math.abs(frac - 0.5) * 1.5) * 0.85;

          // Upper Lateral Vein
          ctx.beginPath();
          ctx.moveTo(vx, vy);
          ctx.quadraticCurveTo(vx + 12, vy - veinLen * 0.6, vx + 18, vy - veinLen);
          ctx.strokeStyle = colors.leafVeinBase;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Lower Lateral Vein
          ctx.beginPath();
          ctx.moveTo(vx, vy);
          ctx.quadraticCurveTo(vx + 12, vy + veinLen * 0.6, vx + 18, vy + veinLen);
          ctx.strokeStyle = colors.leafVeinBase;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Transpiration Water/Nutrient Flow Glow
          if (Math.abs(frac - transpirationPulse) < 0.22) {
            const glowStrength = 1 - Math.abs(frac - transpirationPulse) / 0.22;
            ctx.strokeStyle = colors.leafVeinGlow;
            ctx.lineWidth = 1.4 * glowStrength;
            ctx.beginPath();
            ctx.moveTo(vx, vy);
            ctx.quadraticCurveTo(vx + 12, vy - veinLen * 0.6, vx + 18, vy - veinLen);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(vx, vy);
            ctx.quadraticCurveTo(vx + 12, vy + veinLen * 0.6, vx + 18, vy + veinLen);
            ctx.stroke();
          }
        }

        ctx.restore();
      };

      // --- BRANCH 1: Graceful Botanical Frond Emerging from Bottom Left ---
      const stem1OriginX = -20;
      const stem1OriginY = h * 0.88;
      const stem1TipX = w * 0.28;
      const stem1TipY = h * 0.62;

      // Stem arch
      ctx.beginPath();
      ctx.moveTo(stem1OriginX, stem1OriginY);
      ctx.quadraticCurveTo(w * 0.10, h * 0.80, stem1TipX, stem1TipY);
      ctx.strokeStyle = colors.leafBorder;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Foliage along Branch 1
      drawBotanicalLeaf(stem1OriginX + 60, stem1OriginY - 45, 110, 32, -0.75, 0.4, 1);
      drawBotanicalLeaf(stem1OriginX + 130, stem1OriginY - 95, 125, 36, -0.55, 1.2, 2);
      drawBotanicalLeaf(stem1OriginX + 210, stem1OriginY - 145, 115, 34, -0.38, 2.0, 3);
      drawBotanicalLeaf(stem1TipX, stem1TipY, 95, 28, -0.25, 2.8, 4);

      // --- BRANCH 2: Delicate Arching Botanical Branch on Top Right ---
      const stem2OriginX = w + 30;
      const stem2OriginY = h * 0.08;
      const stem2TipX = w * 0.72;
      const stem2TipY = h * 0.38;

      ctx.beginPath();
      ctx.moveTo(stem2OriginX, stem2OriginY);
      ctx.quadraticCurveTo(w * 0.88, h * 0.20, stem2TipX, stem2TipY);
      ctx.strokeStyle = colors.leafBorder;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Foliage along Branch 2
      drawBotanicalLeaf(stem2OriginX - 70, stem2OriginY + 50, 120, 34, 2.45, 1.5, 5);
      drawBotanicalLeaf(stem2OriginX - 160, stem2OriginY + 120, 130, 38, 2.65, 2.3, 6);
      drawBotanicalLeaf(stem2OriginX - 250, stem2OriginY + 195, 110, 30, 2.85, 3.1, 7);
      drawBotanicalLeaf(stem2TipX, stem2TipY, 90, 26, 3.05, 3.9, 8);

      // 5. Drifting Botanical Spores & Chloroplast Organelles (Slow fluid ambient drift)
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.y < -30) p.y = h + 30;
          if (p.x < -30) p.x = w + 30;
          if (p.x > w + 30) p.x = -30;
        }

        const r = p.radius * p.z;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = colors.sporeGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = colors.sporeBase;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 select-none"
        title="Living Botanical Laboratory Background Visualization"
      />
    </div>
  );
}
