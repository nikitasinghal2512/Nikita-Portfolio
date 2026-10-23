"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

export default function MicroscopeIllustration() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Palette: Dark mode (champagne-platinum metallic, deep charcoal, luminous emerald)
  // Light mode (deep plum, warm burgundy, forest green)
  const colors = isDark
    ? {
        mainStroke: "rgba(229, 222, 201, 0.40)",      // Champagne platinum structural line
        secStroke: "rgba(200, 206, 232, 0.22)",       // Subtle hairline
        accentStroke: "rgba(229, 222, 201, 0.65)",    // Highlights
        metalFill: "rgba(11, 18, 36, 0.45)",          // Translucent body fill
        metalFillLight: "rgba(25, 35, 60, 0.35)",
        stageFill: "rgba(7, 11, 24, 0.60)",
        glassSlide: "rgba(16, 185, 129, 0.22)",       // Specimen slide
        glassBorder: "rgba(52, 211, 153, 0.65)",
        beamStart: "rgba(229, 222, 201, 0.25)",       // Substage condenser light
        beamMid: "rgba(16, 185, 129, 0.38)",         // Emerald green focus zone
        beamEnd: "rgba(5, 150, 105, 0.12)",
        cellGreen: "#10B981",                         // Biotechnology emerald
        cellGreenGlow: "rgba(16, 185, 129, 0.50)",
        cellGreenDark: "#047857",
        cellGreenHighlight: "#34D399",
        ring40x: "#38BDF8",                           // DIN blue ring for 40x
        ring10x: "#FBBF24",                           // DIN yellow ring for 10x
        ring100x: "#F8FAFC",                          // DIN white ring for 100x
      }
    : {
        mainStroke: "rgba(74, 14, 53, 0.38)",         // Deep plum structural line
        secStroke: "rgba(114, 18, 53, 0.22)",
        accentStroke: "rgba(74, 14, 53, 0.60)",
        metalFill: "rgba(244, 240, 248, 0.55)",
        metalFillLight: "rgba(235, 228, 242, 0.45)",
        stageFill: "rgba(60, 12, 42, 0.15)",
        glassSlide: "rgba(5, 150, 105, 0.20)",
        glassBorder: "rgba(4, 120, 87, 0.65)",
        beamStart: "rgba(200, 138, 20, 0.25)",
        beamMid: "rgba(5, 150, 105, 0.32)",
        beamEnd: "rgba(4, 120, 87, 0.12)",
        cellGreen: "#059669",                         // Rich forest green in light mode
        cellGreenGlow: "rgba(5, 150, 105, 0.40)",
        cellGreenDark: "#065F46",
        cellGreenHighlight: "#10B981",
        ring40x: "#0284C7",
        ring10x: "#D97706",
        ring100x: "#475569",
      };

  return (
    <div
      className="absolute pointer-events-none select-none z-0 right-[-30px] sm:right-0 lg:right-6 top-8 sm:top-12 lg:top-10 w-[300px] sm:w-[400px] lg:w-[470px] max-w-full opacity-30 dark:opacity-25 transition-opacity duration-700 overflow-visible"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 460 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm"
      >
        <defs>
          {/* Subtle laboratory animations */}
          <style>{`
            @keyframes microscopeStageDrift {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-1.8px); }
            }
            @keyframes microscopeBeamPulse {
              0%, 100% { opacity: 0.45; }
              50% { opacity: 0.85; }
            }
            @keyframes microscopeKnobTicks {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes microscopeCellFloatA {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(-2.5px, -3.5px) scale(1.08); }
            }
            @keyframes microscopeCellFloatB {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              50% { transform: translate(3px, -2px) rotate(14deg); }
            }
            @keyframes microscopeCellFloatC {
              0%, 100% { transform: translate(0, 0); }
              50% { transform: translate(-1.5px, 2.5px); }
            }
            .anim-stage {
              animation: microscopeStageDrift 8s ease-in-out infinite;
            }
            .anim-beam {
              animation: microscopeBeamPulse 4.5s ease-in-out infinite;
            }
            .anim-knob {
              transform-origin: 366px 466px;
              animation: microscopeKnobTicks 45s linear infinite;
            }
            .anim-cell-a {
              transform-origin: 256px 352px;
              animation: microscopeCellFloatA 5.5s ease-in-out infinite;
            }
            .anim-cell-b {
              transform-origin: 274px 344px;
              animation: microscopeCellFloatB 7s ease-in-out infinite;
            }
            .anim-cell-c {
              transform-origin: 245px 360px;
              animation: microscopeCellFloatC 6s ease-in-out infinite;
            }
          `}</style>

          {/* Gradients */}
          <linearGradient id="microscopeBeamGrad" x1="265" y1="540" x2="265" y2="330" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={colors.beamStart} />
            <stop offset="55%" stopColor={colors.beamMid} />
            <stop offset="100%" stopColor={colors.beamEnd} />
          </linearGradient>

          <radialGradient id="greenCellGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.cellGreen} stopOpacity="0.9" />
            <stop offset="60%" stopColor={colors.cellGreenDark} stopOpacity="0.45" />
            <stop offset="100%" stopColor={colors.cellGreenDark} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ============================================================== */}
        {/* 1. SOLID DIE-CAST BASE */}
        {/* ============================================================== */}
        <path
          d="M 140 575 C 140 558, 165 548, 205 544 L 335 544 C 375 548, 400 558, 400 575 L 405 586 C 405 592, 395 596, 380 596 L 160 596 C 145 596, 135 592, 135 586 Z"
          fill={colors.metalFill}
          stroke={colors.mainStroke}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* Base Bevel Accent Lines */}
        <path
          d="M 152 576 L 388 576"
          stroke={colors.secStroke}
          strokeWidth="1.0"
        />
        <path
          d="M 160 588 L 380 588"
          stroke={colors.secStroke}
          strokeWidth="0.8"
        />
        {/* Vibration Damping Base Feet */}
        <rect x="150" y="596" width="22" height="4" rx="2" fill={colors.mainStroke} />
        <rect x="368" y="596" width="22" height="4" rx="2" fill={colors.mainStroke} />

        {/* Power Switch & Light Dimmer Dial on Side */}
        <rect
          x="364"
          y="560"
          width="16"
          height="12"
          rx="3"
          fill={colors.stageFill}
          stroke={colors.mainStroke}
          strokeWidth="1.1"
        />
        <line x1="372" y1="563" x2="372" y2="569" stroke={colors.accentStroke} strokeWidth="1.2" />

        {/* Substage Field Diaphragm / Collector Lens Housing */}
        <ellipse
          cx="265"
          cy="544"
          rx="36"
          ry="9"
          fill={colors.metalFillLight}
          stroke={colors.mainStroke}
          strokeWidth="1.2"
        />
        <ellipse
          cx="265"
          cy="544"
          rx="25"
          ry="6"
          fill={colors.stageFill}
          stroke={colors.accentStroke}
          strokeWidth="1.1"
        />
        {/* Collector Lens Core Glow */}
        <circle cx="265" cy="544" r="5" fill={colors.cellGreen} opacity="0.6" />

        {/* ============================================================== */}
        {/* 2. ERGONOMIC CURVED C-FRAME ARM (STAND) */}
        {/* ============================================================== */}
        {/* Sweeping Cast Stand Profile */}
        <path
          d="M 335 544 C 362 505, 388 440, 388 365 C 388 285, 355 215, 292 195 L 255 195 L 255 240 L 295 240 C 330 252, 348 295, 348 360 C 348 425, 328 480, 295 544 Z"
          fill={colors.metalFill}
          stroke={colors.mainStroke}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* Arm Structural Contours & Metallic Highlights */}
        <path
          d="M 358 520 C 378 450, 378 355, 360 270"
          stroke={colors.secStroke}
          strokeWidth="1.0"
          strokeDasharray="4 3"
        />
        {/* Arm Integrated Carry-Handle Recess */}
        <path
          d="M 338 315 C 342 345, 342 385, 336 415"
          stroke={colors.accentStroke}
          strokeWidth="1.3"
          strokeLinecap="round"
        />

        {/* ============================================================== */}
        {/* 3. COAXIAL COARSE & FINE FOCUS CONTROLS */}
        {/* ============================================================== */}
        <g>
          {/* Coarse Adjustment Outer Knob */}
          <circle
            cx="366"
            cy="466"
            r="24"
            fill={colors.stageFill}
            stroke={colors.mainStroke}
            strokeWidth="1.4"
          />
          {/* Knurled Outer Texture */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={`knurl-${deg}`}
              x1={366 + Math.cos((deg * Math.PI) / 180) * 21}
              y1={466 + Math.sin((deg * Math.PI) / 180) * 21}
              x2={366 + Math.cos((deg * Math.PI) / 180) * 24}
              y2={466 + Math.sin((deg * Math.PI) / 180) * 24}
              stroke={colors.secStroke}
              strokeWidth="1.0"
            />
          ))}

          {/* Fine Adjustment Concentric Inner Knob */}
          <circle
            cx="366"
            cy="466"
            r="14"
            fill={colors.metalFillLight}
            stroke={colors.accentStroke}
            strokeWidth="1.2"
          />

          {/* Slowly Rotating Graduation Marks on Fine Focus Wheel */}
          <g className="anim-knob">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={`tick-${deg}`}
                x1={366 + Math.cos((deg * Math.PI) / 180) * 9}
                y1={466 + Math.sin((deg * Math.PI) / 180) * 9}
                x2={366 + Math.cos((deg * Math.PI) / 180) * 13}
                y2={466 + Math.sin((deg * Math.PI) / 180) * 13}
                stroke={colors.cellGreen}
                strokeWidth="1.0"
              />
            ))}
          </g>
          <circle cx="366" cy="466" r="3.5" fill={colors.mainStroke} />
        </g>

        {/* ============================================================== */}
        {/* 4. OPTICAL ILLUMINATION BEAM (TRANSLUCENT PATH) */}
        {/* ============================================================== */}
        <g className="anim-beam">
          {/* Lower Light Cone: Collector -> Abbe Condenser */}
          <polygon
            points="245,540 285,540 280,446 250,446"
            fill="url(#microscopeBeamGrad)"
            opacity="0.65"
          />
          {/* Focused Condenser Beam: Condenser -> Slide Specimen */}
          <polygon
            points="252,422 278,422 268,368 262,368"
            fill="url(#microscopeBeamGrad)"
            opacity="0.85"
          />
          {/* Specimen -> 40x Objective Lens Tip */}
          <polygon
            points="262,368 268,368 271,332 259,332"
            fill="url(#microscopeBeamGrad)"
            opacity="0.95"
          />
          {/* Specimen Slide Active Optical Glow Aura */}
          <ellipse
            cx="265"
            cy="368"
            rx="22"
            ry="7"
            fill={colors.cellGreen}
            opacity="0.25"
          />
        </g>

        {/* ============================================================== */}
        {/* 5. SUBSTAGE ABBE CONDENSER & IRIS DIAPHRAGM */}
        {/* ============================================================== */}
        <g>
          {/* Condenser Bracket Arm from Main Stand */}
          <rect
            x="292"
            y="434"
            width="34"
            height="12"
            rx="2"
            fill={colors.stageFill}
            stroke={colors.mainStroke}
            strokeWidth="1.1"
          />
          {/* Condenser Barrel */}
          <rect
            x="245"
            y="422"
            width="40"
            height="26"
            rx="3"
            fill={colors.stageFill}
            stroke={colors.mainStroke}
            strokeWidth="1.3"
          />
          {/* Top Optical Condenser Lens */}
          <ellipse
            cx="265"
            cy="422"
            rx="18"
            ry="4.5"
            fill={colors.metalFillLight}
            stroke={colors.accentStroke}
            strokeWidth="1.0"
          />
          {/* Iris Diaphragm Aperture Ring & Lever */}
          <line x1="245" y1="438" x2="228" y2="435" stroke={colors.accentStroke} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="227" cy="435" r="2.5" fill={colors.cellGreen} />
          {/* Condenser Height Adjustment Rack & Knob */}
          <circle cx="316" cy="440" r="7" fill={colors.metalFillLight} stroke={colors.mainStroke} strokeWidth="1.1" />
        </g>

        {/* ============================================================== */}
        {/* 6. MECHANICAL STAGE & SLIDE HOLDER (MICRO-ADJUSTING) */}
        {/* ============================================================== */}
        <g className="anim-stage">
          {/* Stage Support Bracket */}
          <rect
            x="296"
            y="375"
            width="36"
            height="15"
            rx="2"
            fill={colors.stageFill}
            stroke={colors.mainStroke}
            strokeWidth="1.2"
          />

          {/* Coaxial X/Y Translation Control Knobs Hanging Below Stage */}
          <g>
            <line x1="324" y1="390" x2="324" y2="422" stroke={colors.mainStroke} strokeWidth="2.0" />
            <rect x="318" y="405" width="12" height="7" rx="1.5" fill={colors.stageFill} stroke={colors.accentStroke} strokeWidth="1.0" />
            <rect x="319" y="415" width="10" height="7" rx="1.5" fill={colors.metalFillLight} stroke={colors.mainStroke} strokeWidth="1.0" />
          </g>

          {/* Stage Platform Surface (3D Perspective Slab) */}
          <polygon
            points="184,386 344,386 334,370 196,370"
            fill={colors.stageFill}
            stroke={colors.mainStroke}
            strokeWidth="1.4"
          />
          {/* Stage Front Thickness Bevel */}
          <polygon
            points="184,386 344,386 344,392 184,392"
            fill={colors.metalFill}
            stroke={colors.mainStroke}
            strokeWidth="1.2"
          />
          {/* Vernier Metric Ruler Scale on Stage Front Edge */}
          {[195, 202, 209, 216, 223, 230, 237, 244, 251, 258, 265, 272, 279, 286, 293, 300, 307, 314, 321, 328, 335].map((x, i) => (
            <line
              key={`ruler-${x}`}
              x1={x}
              y1={387}
              x2={x}
              y2={i % 5 === 0 ? 391.5 : 389.5}
              stroke={i % 5 === 0 ? colors.cellGreen : colors.secStroke}
              strokeWidth="0.8"
            />
          ))}

          {/* Glass Specimen Microscope Slide (75 x 25 mm proportion) */}
          <rect
            x="226"
            y="367"
            width="78"
            height="5"
            rx="1"
            fill={colors.glassSlide}
            stroke={colors.glassBorder}
            strokeWidth="1.2"
          />
          {/* Central Coverslip Square */}
          <rect
            x="254"
            y="365"
            width="22"
            height="3"
            rx="0.5"
            fill={colors.cellGreen}
            opacity="0.45"
            stroke={colors.cellGreenHighlight}
            strokeWidth="0.9"
          />

          {/* Mechanical Caliper Slide Finger Clips */}
          <path
            d="M 226 370 Q 220 364, 234 366"
            stroke={colors.accentStroke}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M 304 370 Q 310 364, 296 366"
            stroke={colors.accentStroke}
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* ============================================================== */}
          {/* 7. FLOATING DEEP BIOTECHNOLOGY GREEN CELLULAR SPECIMENS */}
          {/* Near the slide and active 40x objective lens */}
          {/* ============================================================== */}
          {/* Specimen Cell A: Eukaryotic Cell with Membrane & Glowing Nucleolus */}
          <g className="anim-cell-a">
            <ellipse
              cx="256"
              cy="352"
              rx="9"
              ry="7"
              fill={colors.cellGreenDark}
              opacity="0.75"
              stroke={colors.cellGreenHighlight}
              strokeWidth="1.0"
            />
            {/* Nucleolus Core */}
            <circle cx="257.5" cy="351.5" r="2.4" fill={colors.cellGreen} />
            <circle cx="257.5" cy="351.5" r="4.2" fill={colors.cellGreenGlow} opacity="0.6" />
          </g>

          {/* Specimen Cell B: Dividing Microscopic Vesicle */}
          <g className="anim-cell-b">
            <ellipse
              cx="274"
              cy="344"
              rx="6"
              ry="4.5"
              fill={colors.cellGreenDark}
              opacity="0.65"
              stroke={colors.cellGreen}
              strokeWidth="0.9"
            />
            <circle cx="275" cy="343.5" r="1.6" fill={colors.cellGreenHighlight} />
          </g>

          {/* Specimen Cell C: Fluorescent Cytology Marker Specks */}
          <g className="anim-cell-c">
            <circle cx="245" cy="360" r="2.2" fill={colors.cellGreen} />
            <circle cx="245" cy="360" r="4.5" fill={colors.cellGreenGlow} opacity="0.5" />
            <circle cx="282" cy="356" r="1.8" fill={colors.cellGreenHighlight} />
          </g>
        </g>

        {/* ============================================================== */}
        {/* 8. REVOLVING NOSEPIECE (TURRET) & OBJECTIVE LENSES */}
        {/* ============================================================== */}
        <g>
          {/* Turret Revolving Disk Body */}
          <path
            d="M 235 272 C 235 264, 295 264, 295 272 L 288 288 C 288 293, 242 293, 242 288 Z"
            fill={colors.stageFill}
            stroke={colors.mainStroke}
            strokeWidth="1.3"
          />
          {/* Knurled Turret Edge Band */}
          <line x1="240" y1="280" x2="290" y2="280" stroke={colors.secStroke} strokeWidth="1.0" strokeDasharray="3 2" />

          {/* --- OBJECTIVE 1: Active 40x High-Dry (Pointing Vertically Down) --- */}
          <g>
            {/* Main Barrel */}
            <polygon
              points="257,288 273,288 271,324 259,324"
              fill={colors.metalFillLight}
              stroke={colors.mainStroke}
              strokeWidth="1.2"
            />
            {/* Blue DIN Color-Coded Ring (40x Magnification Standard) */}
            <rect x="258" y="306" width="14" height="3" fill={colors.ring40x} />
            {/* Objective Tapered Front Cone & Lens Collar */}
            <polygon
              points="259,324 271,324 268,332 262,332"
              fill={colors.stageFill}
              stroke={colors.accentStroke}
              strokeWidth="1.0"
            />
            {/* Objective Front Optical Glass Lens */}
            <line x1="262" y1="332" x2="268" y2="332" stroke={colors.cellGreen} strokeWidth="1.4" />
          </g>

          {/* --- OBJECTIVE 2: 10x Low-Power (Angled Left) --- */}
          <g>
            <polygon
              points="248,287 238,294 224,316 233,322"
              fill={colors.metalFill}
              stroke={colors.mainStroke}
              strokeWidth="1.0"
            />
            {/* Yellow DIN Ring (10x Standard) */}
            <line x1="230" y1="306" x2="238" y2="311" stroke={colors.ring10x} strokeWidth="2.5" />
          </g>

          {/* --- OBJECTIVE 3: 100x Oil-Immersion (Angled Right) --- */}
          <g>
            <polygon
              points="282,287 292,294 306,317 298,323"
              fill={colors.metalFill}
              stroke={colors.mainStroke}
              strokeWidth="1.0"
            />
            {/* White DIN Ring (100x Standard) */}
            <line x1="300" y1="307" x2="292" y2="312" stroke={colors.ring100x} strokeWidth="2.5" />
          </g>
        </g>

        {/* ============================================================== */}
        {/* 9. BINOCULAR OBSERVATION HEAD & INCLINED EYEPIECES */}
        {/* ============================================================== */}
        <g>
          {/* Observation Head Prism Housing Body */}
          <path
            d="M 245 240 L 295 240 L 285 195 L 245 195 Z"
            fill={colors.stageFill}
            stroke={colors.mainStroke}
            strokeWidth="1.3"
          />
          {/* Manufacturer / Optical Scientific Plate */}
          <rect
            x="254"
            y="212"
            width="24"
            height="14"
            rx="1.5"
            fill={colors.metalFillLight}
            stroke={colors.secStroke}
            strokeWidth="0.8"
          />
          <line x1="258" y1="219" x2="274" y2="219" stroke={colors.cellGreen} strokeWidth="1.0" />

          {/* Interpupillary Slider Dial */}
          <circle cx="266" cy="195" r="4.5" fill={colors.stageFill} stroke={colors.accentStroke} strokeWidth="1.0" />

          {/* --- LEFT OCULAR TUBE (Inclined at ~35° ergonomic viewing angle) --- */}
          <g>
            {/* Tube Barrel */}
            <polygon
              points="252,202 264,195 222,126 210,133"
              fill={colors.metalFill}
              stroke={colors.mainStroke}
              strokeWidth="1.3"
            />
            {/* Knurled Diopter Adjustment Ring */}
            <polygon
              points="220,129 230,123 226,117 216,123"
              fill={colors.stageFill}
              stroke={colors.accentStroke}
              strokeWidth="1.1"
            />
            {/* 10x Widefield Eyepiece & Flared Soft Rubber Eyecup */}
            <path
              d="M 216 123 L 226 117 L 221 108 C 221 106, 214 104, 209 110 L 210 114 Z"
              fill={colors.metalFillLight}
              stroke={colors.mainStroke}
              strokeWidth="1.2"
            />
            {/* Ocular Top Lens Opening with Subtle Reflection */}
            <ellipse cx="217" cy="112" rx="4.5" ry="2.5" fill={colors.cellGreen} opacity="0.5" />
          </g>

          {/* --- RIGHT OCULAR TUBE --- */}
          <g>
            {/* Tube Barrel */}
            <polygon
              points="276,206 288,199 246,130 234,137"
              fill={colors.metalFill}
              stroke={colors.mainStroke}
              strokeWidth="1.3"
            />
            {/* Diopter Adjustment Ring */}
            <polygon
              points="244,133 254,127 250,121 240,127"
              fill={colors.stageFill}
              stroke={colors.accentStroke}
              strokeWidth="1.1"
            />
            {/* 10x Widefield Eyepiece & Eyecup */}
            <path
              d="M 240 127 L 250 121 L 245 112 C 245 110, 238 108, 233 114 L 234 118 Z"
              fill={colors.metalFillLight}
              stroke={colors.mainStroke}
              strokeWidth="1.2"
            />
            {/* Ocular Top Lens Opening */}
            <ellipse cx="241" cy="116" rx="4.5" ry="2.5" fill={colors.cellGreen} opacity="0.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
