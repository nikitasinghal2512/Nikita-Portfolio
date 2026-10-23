"use client";

import React from "react";
import ScientificVisual from "./ScientificVisual";
import Button from "@/components/ui/Button";
import { ArrowRight, User } from "lucide-react";
import { TabId } from "./Navbar";
import { motion } from "framer-motion";

interface HeroProps {
  onNavigate: (tab: TabId) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="h-full w-full flex items-center justify-center px-6 sm:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Column: Focused Editorial Composition */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left py-2 sm:py-4">
          
          {/* Small Editorial Label */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-highlight)] shadow-[0_0_8px_var(--accent-highlight)]" />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--text-muted)] font-semibold">
              B.SC. (HONS.) BIOTECHNOLOGY
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] text-[var(--text-primary)] tracking-tight mb-3">
            <span>Curiosity for life.</span> <br />
            <span className="italic font-normal tracking-normal text-[var(--text-secondary)]">
              Designed by science.
            </span>
          </h1>

          {/* Distinctive Calligraphic Script Name with Subtle Entrance Animation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="my-2 sm:my-3"
          >
            <h2 className="font-script text-2xl sm:text-[28px] lg:text-[32px] font-normal leading-tight tracking-wide text-[var(--text-signature)] select-none">
              Nikita Singhal
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] font-medium tracking-wide mt-1">
              Biotechnology Student | Exploring Life Through Science
            </p>
          </motion.div>

          {/* Short, Refined Introduction */}
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-lg mb-8 font-light">
            Exploring the science behind living systems and the possibilities of biotechnology.
          </p>

          {/* Exactly Two Prominent Hero Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate("projects")}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore My Work
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate("about")}
              icon={<User className="w-4 h-4" />}
              iconPosition="left"
            >
              About Me
            </Button>
          </div>

        </div>

        {/* Right Column: 3D DNA Structure with Molecular Particles */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <ScientificVisual />
        </div>

      </div>
    </section>
  );
}
