"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface NetworkNode {
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
}

interface MessageEnvelope {
  pathIndex: number;
  progress: number;
  speed: number;
  size: number;
}

interface DeviceSilhouette {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  vRot: number;
  vx: number;
  vy: number;
  phase: number;
  scale: number;
}

export default function ContactBackground() {
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

    const initialW = canvas.parentElement?.clientWidth || 1200;
    const initialH = canvas.parentElement?.clientHeight || 900;

    // 1. Floating Minimalist Smartphone & Communication Device Silhouettes (3 devices at different depths)
    const devices: DeviceSilhouette[] = [
      {
        x: initialW * 0.85,
        y: initialH * 0.22,
        width: 74,
        height: 138,
        rotation: -0.12,
        vRot: 0.0006,
        vx: -0.03,
        vy: -0.04,
        phase: 0.5,
        scale: 0.95,
      },
      {
        x: initialW * 0.12,
        y: initialH * 0.76,
        width: 68,
        height: 126,
        rotation: 0.16,
        vRot: -0.0005,
        vx: 0.04,
        vy: -0.03,
        phase: 2.2,
        scale: 0.82,
      },
      {
        x: initialW * 0.88,
        y: initialH * 0.82,
        width: 60,
        height: 110,
        rotation: 0.08,
        vRot: 0.0007,
        vx: -0.02,
        vy: -0.05,
        phase: 3.9,
        scale: 0.70,
      },
    ];

    // 2. Network Communication Paths & Connection Nodes
    // Defined as sets of waypoint paths across the background
    const paths = [
      // Path 0: From lower left towards upper right
      [
        { x: initialW * 0.08, y: initialH * 0.85 },
        { x: initialW * 0.22, y: initialH * 0.60 },
        { x: initialW * 0.45, y: initialH * 0.48 },
        { x: initialW * 0.70, y: initialH * 0.30 },
        { x: initialW * 0.88, y: initialH * 0.18 },
      ],
      // Path 1: Across top right down to mid-right
      [
        { x: initialW * 0.60, y: initialH * 0.12 },
        { x: initialW * 0.78, y: initialH * 0.18 },
        { x: initialW * 0.86, y: initialH * 0.42 },
        { x: initialW * 0.75, y: initialH * 0.72 },
        { x: initialW * 0.90, y: initialH * 0.88 },
      ],
      // Path 2: Bottom traverse
      [
        { x: initialW * 0.18, y: initialH * 0.92 },
        { x: initialW * 0.38, y: initialH * 0.80 },
        { x: initialW * 0.62, y: initialH * 0.85 },
        { x: initialW * 0.82, y: initialH * 0.78 },
      ],
    ];

    // 3. Message Envelopes travelling along paths
    const envelopes: MessageEnvelope[] = [
      { pathIndex: 0, progress: 0.15, speed: 0.0009, size: 14 },
      { pathIndex: 0, progress: 0.68, speed: 0.0011, size: 12 },
      { pathIndex: 1, progress: 0.35, speed: 0.0008, size: 13 },
      { pathIndex: 1, progress: 0.82, speed: 0.0010, size: 11 },
      { pathIndex: 2, progress: 0.50, speed: 0.0009, size: 12 },
    ];

    const render = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? Math.max(parent.clientHeight, parent.scrollHeight) : window.innerHeight;

      if (!prefersReducedMotion) {
        time += 0.012;
      }

      const isDark = theme === "dark";

      // Palette: Emerald green, muted teal, subtle off-white/ivory against near-black foundation
      const colors = isDark
        ? {
            beamGlow: "rgba(16, 185, 129, 0.10)",          // Subtle emerald digital glow
            beamGlow2: "rgba(20, 184, 166, 0.05)",
            lineStroke: "rgba(52, 211, 153, 0.22)",        // Communication path line
            lineAccent: "rgba(20, 184, 166, 0.35)",
            nodeBase: "rgba(16, 185, 129, 0.75)",          // Connection node terminal
            nodeGlow: "rgba(16, 185, 129, 0.25)",
            pulseRing: "rgba(52, 211, 153, 0.40)",
            deviceBody: "rgba(10, 18, 22, 0.45)",          // Translucent smartphone body
            deviceStroke: "rgba(52, 211, 153, 0.30)",      // Emerald phone bezel
            deviceScreen: "rgba(20, 184, 166, 0.08)",
            deviceAccent: "rgba(229, 222, 201, 0.40)",
            envelopeFill: "rgba(10, 24, 22, 0.85)",        // Travelling envelope
            envelopeStroke: "rgba(52, 211, 153, 0.85)",
            envelopeFlap: "rgba(20, 184, 166, 0.75)",
            envelopeGlow: "rgba(16, 185, 129, 0.45)",
          }
        : {
            beamGlow: "rgba(209, 250, 229, 0.40)",
            beamGlow2: "rgba(204, 251, 241, 0.25)",
            lineStroke: "rgba(13, 148, 136, 0.25)",
            lineAccent: "rgba(5, 150, 105, 0.40)",
            nodeBase: "rgba(13, 148, 136, 0.80)",
            nodeGlow: "rgba(13, 148, 136, 0.25)",
            pulseRing: "rgba(5, 150, 105, 0.35)",
            deviceBody: "rgba(240, 253, 250, 0.60)",
            deviceStroke: "rgba(13, 148, 136, 0.35)",
            deviceScreen: "rgba(13, 148, 136, 0.10)",
            deviceAccent: "rgba(74, 14, 53, 0.45)",
            envelopeFill: "rgba(240, 253, 250, 0.90)",
            envelopeStroke: "rgba(13, 148, 136, 0.90)",
            envelopeFlap: "rgba(5, 150, 105, 0.80)",
            envelopeGlow: "rgba(13, 148, 136, 0.35)",
          };

      // 1. Clear frame so the exact same --bg-canvas token shines through
      ctx.clearRect(0, 0, w, h);

      // 2. Ambient Digital Atmosphere Cone
      const ambientX = w * 0.78;
      const ambientY = h * 0.25;
      const ambientCone = ctx.createRadialGradient(ambientX, ambientY, 20, ambientX, ambientY, Math.min(w * 0.6, 520));
      ambientCone.addColorStop(0, colors.beamGlow);
      ambientCone.addColorStop(0.6, colors.beamGlow2);
      ambientCone.addColorStop(1, "transparent");
      ctx.fillStyle = ambientCone;
      ctx.fillRect(0, 0, w, h);

      // 3. Render Digital Communication Paths & Connection Nodes
      paths.forEach((pathPoints, pIndex) => {
        // Dynamic scaling to responsive viewport width/height
        const scaledPts = pathPoints.map((pt) => ({
          x: (pt.x / initialW) * w,
          y: (pt.y / initialH) * h,
        }));

        // Draw Connecting Transmission Line
        ctx.beginPath();
        ctx.moveTo(scaledPts[0].x, scaledPts[0].y);
        for (let i = 1; i < scaledPts.length; i++) {
          const xc = (scaledPts[i - 1].x + scaledPts[i].x) / 2;
          const yc = (scaledPts[i - 1].y + scaledPts[i].y) / 2;
          ctx.quadraticCurveTo(scaledPts[i - 1].x, scaledPts[i - 1].y, xc, yc);
        }
        ctx.lineTo(scaledPts[scaledPts.length - 1].x, scaledPts[scaledPts.length - 1].y);
        ctx.strokeStyle = colors.lineStroke;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Terminal Connection Nodes with Soft Transmission Pulses
        scaledPts.forEach((pt, nIndex) => {
          // Terminal dot
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = colors.nodeBase;
          ctx.fill();

          // Occasional soft transmission pulse ring
          const pulseCycle = (time * 0.8 + pIndex * 1.5 + nIndex * 0.9) % 3;
          if (pulseCycle < 1.4) {
            const pulseR = 3 + pulseCycle * 8;
            const pulseOpacity = (1 - pulseCycle / 1.4) * 0.55;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pulseR, 0, Math.PI * 2);
            ctx.strokeStyle = colors.pulseRing;
            ctx.globalAlpha = pulseOpacity;
            ctx.lineWidth = 0.9;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        });
      });

      // 4. Render Floating Smartphone Outlines (Subtle Minimal Device Silhouettes)
      devices.forEach((dev) => {
        if (!prefersReducedMotion) {
          dev.x += dev.vx;
          dev.y += dev.vy;
          dev.rotation += dev.vRot;

          if (dev.y < -120) dev.y = h + 120;
          if (dev.x < -120) dev.x = w + 120;
          if (dev.x > w + 120) dev.x = -120;
          if (dev.y > h + 120) dev.y = -120;
        }

        const floatSway = prefersReducedMotion ? 0 : Math.sin(time * 0.45 + dev.phase) * 4;
        const curX = dev.x;
        const curY = dev.y + floatSway;

        ctx.save();
        ctx.translate(curX, curY);
        ctx.rotate(dev.rotation);
        ctx.scale(dev.scale, dev.scale);

        const pw = dev.width;
        const ph = dev.height;
        const pr = 12; // Corner radius

        // Outer Smartphone Chassis (Translucent rounded rectangle)
        ctx.beginPath();
        ctx.roundRect(-pw / 2, -ph / 2, pw, ph, pr);
        ctx.fillStyle = colors.deviceBody;
        ctx.fill();
        ctx.strokeStyle = colors.deviceStroke;
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Inner Screen Display Bezel
        ctx.beginPath();
        ctx.roundRect(-pw / 2 + 4, -ph / 2 + 6, pw - 8, ph - 12, pr - 3);
        ctx.fillStyle = colors.deviceScreen;
        ctx.fill();
        ctx.strokeStyle = colors.lineStroke;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Top Speaker / Camera Notch
        ctx.beginPath();
        ctx.roundRect(-8, -ph / 2 + 10, 16, 3, 1.5);
        ctx.fillStyle = colors.deviceStroke;
        ctx.fill();

        // Screen Transmission Grid / Chat Bubble Outlines inside phone screen
        ctx.beginPath();
        ctx.roundRect(-pw / 2 + 10, -ph / 2 + 24, pw * 0.55, 14, 4);
        ctx.strokeStyle = colors.lineAccent;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.roundRect(-pw / 2 + 18, -ph / 2 + 44, pw * 0.58, 14, 4);
        ctx.strokeStyle = colors.deviceStroke;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Bottom Home Indicator Bar
        ctx.beginPath();
        ctx.moveTo(-14, ph / 2 - 10);
        ctx.lineTo(14, ph / 2 - 10);
        ctx.strokeStyle = colors.deviceAccent;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.restore();
      });

      // 5. Render Animated Message Envelopes Travelling Along Paths
      envelopes.forEach((env) => {
        if (!prefersReducedMotion) {
          env.progress += env.speed;
          if (env.progress >= 1.0) env.progress = 0;
        }

        const pathPoints = paths[env.pathIndex];
        const scaledPts = pathPoints.map((pt) => ({
          x: (pt.x / initialW) * w,
          y: (pt.y / initialH) * h,
        }));

        // Calculate current position along the segmented path
        const totalSegments = scaledPts.length - 1;
        const rawIndex = env.progress * totalSegments;
        const segIndex = Math.min(Math.floor(rawIndex), totalSegments - 1);
        const segT = rawIndex - segIndex;

        const p0 = scaledPts[segIndex];
        const p1 = scaledPts[segIndex + 1];

        // Linear interpolation along current segment
        const envX = p0.x + (p1.x - p0.x) * segT;
        const envY = p0.y + (p1.y - p0.y) * segT;

        // Path angle for envelope orientation
        const angle = Math.atan2(p1.y - p0.y, p1.x - p0.x);

        ctx.save();
        ctx.translate(envX, envY);
        ctx.rotate(angle * 0.4); // Subtle tilt

        const ew = env.size;
        const eh = env.size * 0.65;

        // Envelope Glowing Halo
        ctx.beginPath();
        ctx.arc(0, 0, ew * 1.1, 0, Math.PI * 2);
        ctx.fillStyle = colors.envelopeGlow;
        ctx.fill();

        // Envelope Base Rectangle
        ctx.beginPath();
        ctx.roundRect(-ew / 2, -eh / 2, ew, eh, 2);
        ctx.fillStyle = colors.envelopeFill;
        ctx.fill();
        ctx.strokeStyle = colors.envelopeStroke;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // Envelope Triangular Flap Fold
        ctx.beginPath();
        ctx.moveTo(-ew / 2, -eh / 2);
        ctx.lineTo(0, eh * 0.15);
        ctx.lineTo(ew / 2, -eh / 2);
        ctx.strokeStyle = colors.envelopeFlap;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        ctx.restore();
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
        title="Live Digital Communication Network Background"
      />
    </div>
  );
}
