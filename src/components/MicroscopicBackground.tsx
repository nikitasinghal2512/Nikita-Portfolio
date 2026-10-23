"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface OrganicParticle {
  id: number;
  x: number;
  y: number;
  z: number; // 0.2 (far) to 1.1 (foreground)
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  phase: number;
  speedMultiplier: number;
  isReactionNode: boolean; // Vivid blood-red in dark mode / glowing gold in light mode
  curveOffset: number;
  paletteIndex: number; // For light mode: 0: plum, 1: burgundy, 2: charcoal, 3: warm gold
}

interface DriftingBioForm {
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  rotation: number;
  vRot: number;
  opacity: number;
  targetOpacity: number;
  type: "helixFragment" | "proteinFold" | "vesicle";
  lifetime: number;
  maxLifetime: number;
}

export default function MicroscopicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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

    // High-DPI responsive canvas sizing
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Subtle pointer parallax listener
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 45;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 40;
    };

    window.addEventListener("mousemove", onMouseMove);

    // ==============================================================
    // 1. FREE-FLOWING EXPANSIVE PARTICLES (ACROSS ENTIRE VIEWPORT)
    // ==============================================================
    const totalParticles = 54;
    const particles: OrganicParticle[] = [];

    for (let i = 0; i < totalParticles; i++) {
      const isReaction = i % 8 === 0;
      particles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.85 + 0.25,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        baseRadius: isReaction ? 3.8 : 1.5 + Math.random() * 1.8,
        radius: isReaction ? 3.8 : 1.5 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
        speedMultiplier: 0.8 + Math.random() * 0.6,
        isReactionNode: isReaction,
        curveOffset: Math.random() * 100,
        paletteIndex: i % 4,
      });
    }

    // ==============================================================
    // 2. DRIFTING TRANSLUCENT BIOMOLECULAR STRUCTURES
    // ==============================================================
    const bioForms: DriftingBioForm[] = [
      {
        x: width * 0.8,
        y: height * 0.35,
        vx: -0.08,
        vy: 0.04,
        scale: 1.0,
        rotation: 0.2,
        vRot: 0.0015,
        opacity: 0.55,
        targetOpacity: 0.55,
        type: "helixFragment",
        lifetime: 400,
        maxLifetime: 1200,
      },
      {
        x: width * 0.65,
        y: height * 0.72,
        vx: 0.06,
        vy: -0.05,
        scale: 0.85,
        rotation: -0.4,
        vRot: -0.0012,
        opacity: 0.45,
        targetOpacity: 0.45,
        type: "proteinFold",
        lifetime: 700,
        maxLifetime: 1400,
      },
      {
        x: width * 0.25,
        y: height * 0.82,
        vx: 0.05,
        vy: -0.03,
        scale: 1.1,
        rotation: 0.6,
        vRot: 0.0008,
        opacity: 0.35,
        targetOpacity: 0.35,
        type: "vesicle",
        lifetime: 200,
        maxLifetime: 1600,
      },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      if (!prefersReducedMotion) {
        time += 0.012;
      }

      const isDark = theme === "dark";

      // Color System matching exact requirements
      const colors = isDark
        ? {
            bgGlow1: "rgba(60, 27, 56, 0.08)",         // Aubergine undertone
            bgGlow2: "rgba(200, 206, 232, 0.035)",      // Platinum-lavender light
            filament: "rgba(200, 206, 232, 0.16)",      // Fine icy-lavender connections
            particleBase: "#E2E7ED",                    // Platinum silver
            particleLavender: "#C8CEE8",                // Icy lavender
            plum: "#C8CEE8",
            burgundy: "#E2E7ED",
            charcoal: "#9AA5BD",
            gold: "#F3DEBA",
            reactionNode: "#E50027",                     // Deep, rich, luminous blood-red / crimson (intense & glowing)
            reactionHalo: "rgba(229, 0, 39, 0.45)",     // Intense blood-red luminous glow (not pink, not coral)
            bioFormStroke: "rgba(200, 206, 232, 0.24)",
            bioFormFill: "rgba(200, 206, 232, 0.03)",
            pathway: "rgba(200, 206, 232, 0.08)",
            specular: "rgba(255, 255, 255, 0.9)",
            glassShimmer: "rgba(200, 206, 232, 0.02)",
          }
        : {
            bgGlow1: "rgba(246, 248, 252, 0.75)",       // Soft shifting platinum
            bgGlow2: "rgba(235, 228, 242, 0.4)",        // Pearlescent lavender reflection
            filament: "rgba(74, 14, 53, 0.38)",         // Clearly visible deep plum connecting lines
            particleBase: "#4A0E35",
            particleLavender: "#721235",
            plum: "#4A0E35",                            // Deep plum
            burgundy: "#721235",                        // Rich burgundy
            charcoal: "#3A3E48",                        // Muted charcoal
            gold: "#C88A14",                            // Warm gold
            reactionNode: "#C88A14",                    // Warm gold reaction highlight
            reactionHalo: "rgba(200, 138, 20, 0.42)",   // Warm gold luminous glow
            bioFormStroke: "rgba(74, 14, 53, 0.45)",    // Clearly visible plum bio-form outlines
            bioFormFill: "rgba(200, 138, 20, 0.06)",    // Warm gold/plum wash
            pathway: "rgba(74, 14, 53, 0.18)",          // Clearly visible pathway curves
            specular: "rgba(255, 255, 255, 0.95)",
            glassShimmer: "rgba(224, 218, 234, 0.08)",  // Glass reflection shimmer
          };

      // -----------------------------------------------------------------
      // 1. SOFT SHIFTING LABORATORY BACKGROUND GRADIENTS & GLASS REFLECTION
      // -----------------------------------------------------------------
      const lightX = width * 0.75 + mouseRef.current.x * 0.3;
      const lightY = height * 0.4 + mouseRef.current.y * 0.3;

      const radialGrad = ctx.createRadialGradient(lightX, lightY, 40, lightX, lightY, Math.min(width, height) * 0.7);
      radialGrad.addColorStop(0, colors.bgGlow1);
      radialGrad.addColorStop(0.6, colors.bgGlow2);
      radialGrad.addColorStop(1, "transparent");
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Light theme: Subtle glass reflection band (light passing through laboratory glass)
      if (!isDark) {
        ctx.save();
        ctx.translate(width * 0.5, height * 0.5);
        ctx.rotate(-Math.PI / 6);
        const glassGrad = ctx.createLinearGradient(-width, 0, width, 0);
        glassGrad.addColorStop(0, "transparent");
        glassGrad.addColorStop(0.48, "transparent");
        glassGrad.addColorStop(0.5, colors.glassShimmer);
        glassGrad.addColorStop(0.52, "transparent");
        glassGrad.addColorStop(1, "transparent");
        ctx.fillStyle = glassGrad;
        ctx.fillRect(-width, -height, width * 2, height * 2);
        ctx.restore();
      }

      // -----------------------------------------------------------------
      // 2. EXPANSIVE ORGANIC PATHWAYS (FLOWING ACROSS ENTIRE PAGE)
      // -----------------------------------------------------------------
      ctx.lineWidth = isDark ? 1.0 : 1.2;
      ctx.strokeStyle = colors.pathway;
      ctx.beginPath();
      const path1Y = height * 0.35 + mouseRef.current.y * 0.25;
      for (let x = 0; x <= width; x += 25) {
        const y = path1Y + Math.sin(x * 0.003 + time * 0.5) * 60 + Math.cos(x * 0.0018 - time * 0.3) * 35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      const path2Y = height * 0.68 + mouseRef.current.y * 0.3;
      for (let x = 0; x <= width; x += 25) {
        const y = path2Y + Math.cos(x * 0.0028 - time * 0.4) * 50 + Math.sin(x * 0.0015 + time * 0.6) * 30;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Flowing quanta packets along pathways
      const quantaCount = 8;
      for (let q = 0; q < quantaCount; q++) {
        const progress = (time * 0.06 + q / quantaCount) % 1.0;
        const qx = progress * width;
        const qy = path1Y + Math.sin(qx * 0.003 + time * 0.5) * 60 + Math.cos(qx * 0.0018 - time * 0.3) * 35;
        ctx.beginPath();
        ctx.arc(qx, qy, isDark ? 1.8 : 2.2, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? colors.particleLavender : (q % 2 === 0 ? colors.burgundy : colors.gold);
        ctx.globalAlpha = (isDark ? 0.6 : 0.85) * Math.sin(progress * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // -----------------------------------------------------------------
      // 3. DRIFTING TRANSLUCENT BIOMOLECULAR FORMS (GLIDING & FADING)
      // -----------------------------------------------------------------
      bioForms.forEach((form) => {
        if (!prefersReducedMotion) {
          form.x += form.vx;
          form.y += form.vy;
          form.rotation += form.vRot;
          form.lifetime++;

          // Gentle wrapping and breathing opacity
          if (form.x < -150) form.x = width + 100;
          if (form.x > width + 150) form.x = -100;
          if (form.y < -150) form.y = height + 100;
          if (form.y > height + 150) form.y = -100;

          // Fade cycle
          const lifeProgress = form.lifetime / form.maxLifetime;
          form.opacity = form.targetOpacity * Math.sin(lifeProgress * Math.PI);
          if (form.lifetime >= form.maxLifetime) {
            form.lifetime = 0;
            form.x = Math.random() * width;
            form.y = Math.random() * height;
          }
        }

        ctx.save();
        ctx.translate(form.x + mouseRef.current.x * 0.25, form.y + mouseRef.current.y * 0.25);
        ctx.rotate(form.rotation);
        ctx.scale(form.scale, form.scale);
        ctx.globalAlpha = Math.max(0.1, Math.min(0.7, form.opacity * (isDark ? 1.0 : 1.35)));

        if (form.type === "helixFragment") {
          // Floating DNA helix segment
          ctx.strokeStyle = colors.bioFormStroke;
          ctx.lineWidth = isDark ? 1.2 : 1.5;
          ctx.beginPath();
          for (let s = -60; s <= 60; s += 8) {
            const y1 = Math.sin((s / 60) * Math.PI * 2 + time) * 18;
            const y2 = -y1;
            ctx.moveTo(s, y1);
            ctx.lineTo(s, y2);
          }
          ctx.stroke();

          // Outer strands
          ctx.beginPath();
          for (let s = -60; s <= 60; s += 4) {
            const y1 = Math.sin((s / 60) * Math.PI * 2 + time) * 18;
            if (s === -60) ctx.moveTo(s, y1);
            else ctx.lineTo(s, y1);
          }
          ctx.stroke();

          ctx.beginPath();
          for (let s = -60; s <= 60; s += 4) {
            const y2 = -Math.sin((s / 60) * Math.PI * 2 + time) * 18;
            if (s === -60) ctx.moveTo(s, y2);
            else ctx.lineTo(s, y2);
          }
          ctx.stroke();
        } else if (form.type === "proteinFold") {
          // Tertiary protein-inspired fold loop
          ctx.strokeStyle = colors.bioFormStroke;
          ctx.fillStyle = colors.bioFormFill;
          ctx.lineWidth = isDark ? 1.2 : 1.5;
          ctx.beginPath();
          ctx.moveTo(-50, 0);
          ctx.bezierCurveTo(-20, -45, 30, -35, 55, 10);
          ctx.bezierCurveTo(40, 45, -10, 40, -50, 0);
          ctx.fill();
          ctx.stroke();
        } else {
          // Translucent vesicular cell membrane
          ctx.strokeStyle = colors.bioFormStroke;
          ctx.fillStyle = colors.bioFormFill;
          ctx.lineWidth = isDark ? 1.0 : 1.4;
          ctx.beginPath();
          ctx.ellipse(0, 0, 75, 50, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(15, -10, 12, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? "rgba(200, 206, 232, 0.08)" : "rgba(74, 14, 53, 0.12)";
          ctx.fill();
        }

        ctx.restore();
        ctx.globalAlpha = 1.0;
      });

      // -----------------------------------------------------------------
      // 4. PARTICLES TRAVELING ON SMOOTH PATHS & DYNAMIC FILAMENTS
      // -----------------------------------------------------------------
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx * p.speedMultiplier + Math.cos(time * 0.8 + p.phase) * 0.22;
          p.y += p.vy * p.speedMultiplier + Math.sin(time * 0.6 + p.phase) * 0.22;

          // Free-flowing viewport boundary wrap
          if (p.x < -40) p.x = width + 30;
          if (p.x > width + 40) p.x = -30;
          if (p.y < -40) p.y = height + 30;
          if (p.y > height + 40) p.y = -30;
        }

        p.radius = p.baseRadius + Math.sin(time * 1.8 + p.phase) * 0.45;
      });

      // Fine connections that form and dissolve naturally (Enhanced visibility in light mode)
      const maxConnectDistance = 135;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            const proxAlpha = Math.cos((dist / maxConnectDistance) * (Math.PI / 2));
            const depthFactor = (p1.z + p2.z) * 0.5;

            // Breathing assembly modulation
            const assemblyCycle = 0.65 + 0.35 * Math.sin(time * 0.8 + (p1.curveOffset + p2.curveOffset) * 0.05);
            const alphaMultiplier = isDark ? 0.65 : 0.95;
            const alpha = proxAlpha * depthFactor * assemblyCycle * alphaMultiplier;

            const px1 = p1.x + mouseRef.current.x * p1.z * 0.35;
            const py1 = p1.y + mouseRef.current.y * p1.z * 0.35;
            const px2 = p2.x + mouseRef.current.x * p2.z * 0.35;
            const py2 = p2.y + mouseRef.current.y * p2.z * 0.35;

            ctx.strokeStyle = colors.filament;
            ctx.globalAlpha = Math.max(0, Math.min(isDark ? 0.65 : 0.85, alpha));
            ctx.lineWidth = (isDark ? 0.85 : 1.15) * depthFactor;
            ctx.beginPath();
            ctx.moveTo(px1, py1);
            ctx.lineTo(px2, py2);
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // Render particles with rich palette and subtle glowing effects
      particles.forEach((p) => {
        const px = p.x + mouseRef.current.x * p.z * 0.35;
        const py = p.y + mouseRef.current.y * p.z * 0.35;
        const r = (isDark ? p.radius : p.radius * 1.15) * p.z;

        if (p.isReactionNode) {
          // Luminous reaction node: deep blood-red in dark mode, warm gold in light mode
          const pulseR = r * (2.2 + Math.sin(time * 2.5 + p.phase) * 0.45);
          ctx.beginPath();
          ctx.arc(px, py, pulseR, 0, Math.PI * 2);
          ctx.fillStyle = colors.reactionHalo;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = colors.reactionNode;
          ctx.fill();
        } else {
          // Standard molecular node
          let particleColor = "";
          let hasGlow = false;
          let glowColor = "";

          if (isDark) {
            particleColor = p.z > 0.65 ? colors.particleBase : colors.particleLavender;
          } else {
            // Light mode: rich combination of deep plum, rich burgundy, warm gold, and muted charcoal
            if (p.paletteIndex === 0) {
              particleColor = colors.plum;
            } else if (p.paletteIndex === 1) {
              particleColor = colors.burgundy;
            } else if (p.paletteIndex === 2) {
              particleColor = colors.charcoal;
            } else {
              particleColor = colors.gold;
              hasGlow = true;
              glowColor = "rgba(200, 138, 20, 0.35)";
            }
          }

          if (hasGlow) {
            ctx.beginPath();
            ctx.arc(px, py, r * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = glowColor;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = particleColor;
          ctx.globalAlpha = isDark ? 0.75 * p.z : Math.max(0.7, p.z);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }

        // 3D Specular highlight
        if (r > 2.0) {
          ctx.beginPath();
          ctx.arc(px - r * 0.3, py - r * 0.3, r * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = colors.specular;
          ctx.globalAlpha = 0.8;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none"
      title="Microscopic Living Laboratory Visualization"
    />
  );
}
