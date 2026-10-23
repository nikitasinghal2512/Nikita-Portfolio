"use client";

import React, { useEffect, useRef, useState } from "react";

interface BasePair {
  y: number;
  angle: number;
  type: "AT" | "TA" | "GC" | "CG";
}

export default function DNAHelixHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    // Handle responsive sizing
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth * window.devicePixelRatio;
        canvas.height = parent.clientHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Generate base pairs along helix height
    const totalPairs = 28;
    const pairTypes: Array<"AT" | "TA" | "GC" | "CG"> = ["AT", "GC", "TA", "CG", "AT", "CG"];

    const render = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : 500;
      const height = parent ? parent.clientHeight : 600;

      ctx.clearRect(0, 0, width, height);

      rotation += 0.015;

      const centerX = width / 2;
      const startY = 40;
      const endY = height - 40;
      const helixHeight = endY - startY;
      const radius = Math.min(width * 0.28, 120);

      // Color scheme for base pairs
      const colors = {
        strand1: "rgba(52, 211, 153, 0.85)", // Emerald
        strand2: "rgba(6, 182, 212, 0.85)",  // Cyan
        A: "#34d399",                         // Adenine (Emerald)
        T: "#fcd34d",                         // Thymine (Soft Gold)
        G: "#06b6d4",                         // Guanine (Cyan)
        C: "#f43f5e",                         // Cytosine (Rose)
        bond: "rgba(255, 255, 255, 0.25)",
      };

      // Draw background molecular particles
      for (let i = 0; i < 15; i++) {
        const px = (Math.sin(rotation * 0.5 + i * 2) * 0.45 + 0.5) * width;
        const py = ((i * 43 + rotation * 20) % height);
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "rgba(52, 211, 153, 0.25)" : "rgba(6, 182, 212, 0.25)";
        ctx.fill();
      }

      // Collect nodes for depth sorting
      interface NodeItem {
        x1: number;
        y1: number;
        z1: number;
        x2: number;
        y2: number;
        z2: number;
        pairType: "AT" | "TA" | "GC" | "CG";
        y: number;
      }

      const pairs: NodeItem[] = [];

      for (let i = 0; i < totalPairs; i++) {
        const progress = i / (totalPairs - 1);
        const y = startY + progress * helixHeight;
        const angle = rotation + progress * Math.PI * 4.5;

        const x1 = centerX + Math.cos(angle) * radius;
        const z1 = Math.sin(angle); // -1 (back) to 1 (front)

        const x2 = centerX + Math.cos(angle + Math.PI) * radius;
        const z2 = Math.sin(angle + Math.PI);

        const pairType = pairTypes[i % pairTypes.length];
        pairs.push({ x1, y1: y, z1, x2, y2: y, z2, pairType, y });
      }

      // Sort by average depth for correct rendering overlap
      pairs.forEach((p) => {
        // Connecting hydrogen bond line
        const avgZ = (p.z1 + p.z2) / 2;
        const bondAlpha = 0.15 + (avgZ + 1) * 0.2;
        ctx.strokeStyle = `rgba(167, 243, 208, ${bondAlpha})`;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(p.x1, p.y1);
        ctx.lineTo(p.x2, p.y2);
        ctx.stroke();

        // Hydrogen bonds markers in center (2 dots for A-T, 3 dots for G-C)
        const midX = (p.x1 + p.x2) / 2;
        const isTriple = p.pairType === "GC" || p.pairType === "CG";
        const dotCount = isTriple ? 3 : 2;

        for (let d = 0; d < dotCount; d++) {
          const offset = (d - (dotCount - 1) / 2) * 5;
          ctx.beginPath();
          ctx.arc(midX + offset, p.y1, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + avgZ * 0.2})`;
          ctx.fill();
        }

        // Draw node 1 (Strand A)
        const scale1 = 0.7 + (p.z1 + 1) * 0.35;
        const r1 = 5.5 * scale1;
        ctx.beginPath();
        ctx.arc(p.x1, p.y1, r1, 0, Math.PI * 2);
        ctx.fillStyle = p.z1 > 0 ? colors.strand1 : "rgba(16, 185, 129, 0.4)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node glow if in front
        if (p.z1 > 0.4) {
          ctx.beginPath();
          ctx.arc(p.x1, p.y1, r1 * 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(52, 211, 153, 0.12)";
          ctx.fill();
        }

        // Draw node 2 (Strand B)
        const scale2 = 0.7 + (p.z2 + 1) * 0.35;
        const r2 = 5.5 * scale2;
        ctx.beginPath();
        ctx.arc(p.x2, p.y2, r2, 0, Math.PI * 2);
        ctx.fillStyle = p.z2 > 0 ? colors.strand2 : "rgba(6, 182, 212, 0.4)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();

        if (p.z2 > 0.4) {
          ctx.beginPath();
          ctx.arc(p.x2, p.y2, r2 * 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(6, 182, 212, 0.12)";
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] md:h-[540px] flex items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-emerald-500/15 via-teal-900/10 to-transparent blur-3xl pointer-events-none" />

      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full relative z-10 cursor-pointer"
        title="Interactive DNA Double Helix (B-DNA conformation, 10.5 base pairs per turn)"
      />

      {/* Floating Scientific Annotations */}
      <div className="absolute top-6 left-2 sm:left-4 z-20 pointer-events-auto">
        <div 
          onMouseEnter={() => setHoveredInfo("B-DNA Conformation: Right-handed double helix, major & minor grooves")}
          onMouseLeave={() => setHoveredInfo(null)}
          className="bio-glass px-3 py-1.5 rounded-full text-xs font-mono text-emerald-300 flex items-center gap-2 border border-emerald-500/20 shadow-lg cursor-help transition-all hover:border-emerald-400"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>5&apos; → 3&apos; Antiparallel Strands</span>
        </div>
      </div>

      <div className="absolute bottom-6 right-2 sm:right-4 z-20 pointer-events-auto">
        <div 
          onMouseEnter={() => setHoveredInfo("Complementary Base Pairing: Adenine=Thymine (2 H-bonds), Guanine≡Cytosine (3 H-bonds)")}
          onMouseLeave={() => setHoveredInfo(null)}
          className="bio-glass px-3.5 py-2 rounded-xl text-xs font-mono text-cyan-200 border border-cyan-500/20 shadow-lg cursor-help transition-all hover:border-cyan-400"
        >
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">A = T</span>
            <span className="text-emerald-600/70">•</span>
            <span className="text-cyan-400 font-bold">G ≡ C</span>
          </div>
          <p className="text-[10px] text-emerald-300/70 mt-0.5">Hydrogen-Bonded Base Pairs</p>
        </div>
      </div>

      <div className="absolute top-1/2 -left-2 sm:left-0 -translate-y-1/2 z-20 hidden sm:block">
        <div className="bio-glass p-2.5 rounded-2xl border border-emerald-500/20 text-[11px] font-mono text-emerald-200/80 max-w-[130px] shadow-xl">
          <p className="text-emerald-400 font-semibold mb-0.5">Pitch: 3.4 nm</p>
          <p className="text-[10px] text-emerald-300/60 leading-tight">10.5 bp / helical turn in B-form</p>
        </div>
      </div>

      {hoveredInfo && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 bg-emerald-950/90 text-emerald-100 text-xs px-4 py-2 rounded-xl border border-emerald-400/40 shadow-2xl backdrop-blur-md pointer-events-none transition-all">
          {hoveredInfo}
        </div>
      )}
    </div>
  );
}
