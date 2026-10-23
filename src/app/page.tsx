"use client";

import React, { useState } from "react";
import Navbar, { TabId } from "@/components/Navbar";
import MicroscopicBackground from "@/components/MicroscopicBackground";
import Hero from "@/components/Hero";
import AboutView from "@/components/AboutView";
import InterestsView from "@/components/InterestsView";
import EducationView from "@/components/EducationView";
import ProjectsView from "@/components/ProjectsView";
import SkillsView from "@/components/SkillsView";
import ContactView from "@/components/ContactView";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  // Refined directional & opacity transitions for view switching
  const tabVariants = {
    initial: { opacity: 0, y: 12, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -12, scale: 0.99 },
  };

  return (
    <div className="h-screen w-screen max-h-screen flex flex-col overflow-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-250 select-text relative">
      {/* Full-viewport Microscopic Living Laboratory Background */}
      <MicroscopicBackground />

      {/* Fixed Application Header */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* Main Single Page Application Content Viewport */}
      <main className="flex-1 min-h-0 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <Hero onNavigate={(tab) => setActiveTab(tab)} />
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <AboutView onNavigate={(tab) => setActiveTab(tab)} />
            </motion.div>
          )}

          {activeTab === "interests" && (
            <motion.div
              key="interests"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <InterestsView onNavigate={(tab) => setActiveTab(tab)} />
            </motion.div>
          )}

          {activeTab === "education" && (
            <motion.div
              key="education"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <EducationView onNavigate={(tab) => setActiveTab(tab)} />
            </motion.div>
          )}

          {activeTab === "projects" && (
            <motion.div
              key="projects"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <ProjectsView onNavigate={(tab) => setActiveTab(tab)} />
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <SkillsView onNavigate={(tab) => setActiveTab(tab)} />
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <ContactView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
}
