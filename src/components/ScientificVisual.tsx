"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  isReaction: boolean;
  phase: number;
  paletteIndex: number; // 0: plum, 1: burgundy, 2: charcoal, 3: warm gold
}

interface FilamentConnection {
  from: number;
  to: number;
}

export default function ScientificVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false });
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Responsive high-DPI scaling
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Interactive pointer parallax
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseRef.current.targetX = nx * 45;
      mouseRef.current.targetY = ny * 35;
      mouseRef.current.isHovered = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovered = false;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    // Spacious 3D Molecular Nodes (Spacious Biomolecular Assembly)
    const rawNodes: Node3D[] = [
      { x: 0, y: -20, z: 25, baseRadius: 6.2, isReaction: true, phase: 0, paletteIndex: 3 },
      { x: 65, y: -60, z: -30, baseRadius: 4.5, isReaction: false, phase: 1.2, paletteIndex: 0 },
      { x: 105, y: 15, z: 20, baseRadius: 4.8, isReaction: false, phase: 2.4, paletteIndex: 1 },
      { x: 45, y: 75, z: -25, baseRadius: 4.0, isReaction: true, phase: 3.6, paletteIndex: 3 },
      { x: -55, y: 65, z: 35, baseRadius: 4.6, isReaction: false, phase: 4.8, paletteIndex: 2 },
      { x: -95, y: -15, z: -20, baseRadius: 4.2, isReaction: false, phase: 0.8, paletteIndex: 1 },
      { x: -45, y: -85, z: 15, baseRadius: 4.0, isReaction: true, phase: 2.0, paletteIndex: 3 },
      { x: 135, y: -45, z: 40, baseRadius: 3.5, isReaction: false, phase: 3.2, paletteIndex: 0 },
      { x: -125, y: 45, z: -40, baseRadius: 3.4, isReaction: false, phase: 4.4, paletteIndex: 2 },
      { x: 85, y: 110, z: 30, baseRadius: 3.6, isReaction: false, phase: 5.6, paletteIndex: 1 },
    ];

    const connections: FilamentConnection[] = [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 5, to: 6 },
      { from: 6, to: 0 },
      { from: 0, to: 3 },
      { from: 1, to: 7 },
      { from: 5, to: 8 },
      { from: 3, to: 9 },
      { from: 2, to: 7 },
    ];

    const render = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (!prefersReducedMotion) {
        time += 0.012;
      }

      const isDark = theme === "dark";

      // Color System matching exact requirements
      const colors = isDark
        ? {
            filament: "rgba(200, 206, 232, 0.22)",       // Icy lavender filament
            filamentHighlight: "rgba(229, 0, 39, 0.45)",  // Crimson highlight filament
            nodeBase: "#E2E7ED",                         // Platinum silver
            nodeLavender: "#C8CEE8",                     // Icy lavender
            plum: "#C8CEE8",
            burgundy: "#E2E7ED",
            charcoal: "#9AA5BD",
            gold: "#F3DEBA",
            reactionNode: "#E50027",                     // Deep, rich, luminous blood-red / crimson
            reactionHalo: "rgba(229, 0, 39, 0.48)",      // Luminous crimson glow
            ambientRing: "rgba(200, 206, 232, 0.08)",
            specular: "rgba(255, 255, 255, 0.95)",
          }
        : {
            filament: "rgba(74, 14, 53, 0.45)",          // Visible deep plum filament
            filamentHighlight: "rgba(200, 138, 20, 0.65)", // Warm gold highlight filament
            nodeBase: "#4A0E35",
            nodeLavender: "#721235",
            plum: "#4A0E35",                             // Deep plum
            burgundy: "#721235",                         // Rich burgundy
            charcoal: "#3A3E48",                         // Muted charcoal
            gold: "#C88A14",                             // Warm gold
            reactionNode: "#C88A14",                     // Warm radiant gold
            reactionHalo: "rgba(200, 138, 20, 0.45)",    // Warm gold glow
            ambientRing: "rgba(74, 14, 53, 0.18)",       // Visible plum ambient rings
            specular: "rgba(255, 255, 255, 0.95)",
          };

      const centerX = width * 0.5 + mouseRef.current.x;
      const centerY = height * 0.5 + mouseRef.current.y;

      // 1. Subtle, Spacious Ambient Ring
      ctx.strokeStyle = colors.ambientRing;
      ctx.lineWidth = isDark ? 1.0 : 1.3;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 155, 75, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 175, 85, -Math.PI / 4, 0, Math.PI * 2);
      ctx.stroke();

      // 2. 3D Rotation with Smooth Parallax Easing
      const rotY = prefersReducedMotion ? 0.35 : time * 0.22;
      const rotX = prefersReducedMotion ? 0.25 : Math.sin(time * 0.15) * 0.25;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const fov = 380;

      // Compute 3D projected coordinates for all nodes
      const projected = rawNodes.map((node) => {
        const ox = node.x + Math.sin(time + node.phase) * 6;
        const oy = node.y + Math.cos(time + node.phase) * 6;
        const oz = node.z;

        // Rotation around Y
        const x1 = ox * cosY - oz * sinY;
        const z1 = ox * sinY + oz * cosY;

        // Rotation around X
        const y2 = oy * cosX - z1 * sinX;
        const z2 = oy * sinX + z1 * cosX;

        const scale = fov / (fov + z2 + 80);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;
        const pr = node.baseRadius * scale * (isDark ? 1.0 : 1.12);

        return {
          px,
          py,
          pr,
          z2,
          scale,
          isReaction: node.isReaction,
          phase: node.phase,
          paletteIndex: node.paletteIndex,
        };
      });

      // 3. Render Fine Connecting Filaments (Depth-Sorted with High Visibility)
      connections.forEach((conn) => {
        const p1 = projected[conn.from];
        const p2 = projected[conn.to];
        const avgZ = (p1.z2 + p2.z2) * 0.5;
        const depthAlpha = Math.max(0.18, Math.min(0.85, 0.45 + (avgZ / 120) * 0.3));

        const isHighlighted = p1.isReaction && p2.isReaction;
        ctx.strokeStyle = isHighlighted ? colors.filamentHighlight : colors.filament;
        ctx.globalAlpha = depthAlpha * (isHighlighted ? 0.95 : (isDark ? 0.7 : 0.88));
        ctx.lineWidth = (isHighlighted ? 1.6 : 1.15) * ((p1.scale + p2.scale) * 0.5);

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });

      // 4. Render Nodes with Depth Sorting & Vivid Blood-Red / Gold Highlights
      const sortedNodes = [...projected].sort((a, b) => b.z2 - a.z2);

      sortedNodes.forEach((node) => {
        const depthAlpha = Math.max(0.35, Math.min(1.0, 0.7 + node.z2 / 100));

        if (node.isReaction) {
          // Luminous pulsating halo
          const pulseR = node.pr * (2.2 + Math.sin(time * 2.4 + node.phase) * 0.4);
          ctx.beginPath();
          ctx.arc(node.px, node.py, pulseR, 0, Math.PI * 2);
          ctx.fillStyle = colors.reactionHalo;
          ctx.fill();

          // Blood-Red (dark) / Warm Gold (light) core
          ctx.beginPath();
          ctx.arc(node.px, node.py, node.pr, 0, Math.PI * 2);
          ctx.fillStyle = colors.reactionNode;
          ctx.globalAlpha = depthAlpha;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        } else {
          let nodeColor = "";
          let hasGlow = false;

          if (isDark) {
            nodeColor = node.scale > 1.0 ? colors.nodeBase : colors.nodeLavender;
          } else {
            // Light mode: rich combination of plum, burgundy, charcoal, and warm gold
            if (node.paletteIndex === 0) {
              nodeColor = colors.plum;
            } else if (node.paletteIndex === 1) {
              nodeColor = colors.burgundy;
            } else if (node.paletteIndex === 2) {
              nodeColor = colors.charcoal;
            } else {
              nodeColor = colors.gold;
              hasGlow = true;
            }
          }

          if (hasGlow && !isDark) {
            ctx.beginPath();
            ctx.arc(node.px, node.py, node.pr * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(200, 138, 20, 0.35)";
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(node.px, node.py, node.pr, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.globalAlpha = isDark ? depthAlpha * 0.85 : Math.max(0.75, depthAlpha);
          ctx.fill();
          ctx.globalAlpha = 1.0;

          // Fine outline
          ctx.strokeStyle = isDark ? "rgba(200, 206, 232, 0.45)" : "rgba(74, 14, 53, 0.35)";
          ctx.lineWidth = 0.85 * node.scale;
          ctx.stroke();
        }

        // 3D Specular Highlight
        if (node.pr > 2.2) {
          ctx.beginPath();
          ctx.arc(node.px - node.pr * 0.3, node.py - node.pr * 0.3, node.pr * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = colors.specular;
          ctx.globalAlpha = 0.85;
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
      container.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
        title="Spacious Molecular Constellation Visualization"
      />
    </div>
  );
}
