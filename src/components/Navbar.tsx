"use client";

import React, { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Button from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export type TabId = "home" | "about" | "interests" | "education" | "projects" | "skills" | "contact";

interface NavbarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Central Navigation Tabs (Home is represented by the brand wordmark)
  const navTabs: { id: TabId; label: string }[] = [
    { id: "about", label: "About" },
    { id: "interests", label: "Interests" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="h-16 md:h-20 shrink-0 px-6 sm:px-10 lg:px-14 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]/85 backdrop-blur-md z-30 transition-colors">
      
      {/* Brand Wordmark as the Home Navigation Control */}
      <button
        onClick={() => onTabChange("home")}
        className="group flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-hover)] rounded-lg py-1 px-1.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        aria-label="Nikita Singhal — Return to Home View"
        title="Return to Home View"
      >
        <span className="font-editorial text-2xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--gold-hover)] group-hover:drop-shadow-[0_0_10px_var(--gold-glow)] transition-all duration-200 leading-none">
          Nikita Singhal
        </span>
      </button>

      {/* Central Navigation Tabs */}
      <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Primary portfolio views">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative py-2 text-xs font-sans tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-hover)] rounded-sm ${
                isActive
                  ? "text-[var(--gold-active)] font-semibold drop-shadow-[0_0_8px_var(--gold-glow)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--gold-hover)] font-medium"
              }`}
            >
              <span className="transition-colors duration-200">{tab.label}</span>

              {/* Slim Animated Active Underline with Golden Highlight */}
              {isActive && (
                <motion.div
                  layoutId="minimalActiveUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--gold-hover)] flex items-center justify-center shadow-[0_0_8px_var(--gold-glow)]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full -top-[2px] absolute bg-[var(--gold-hover)] shadow-[0_0_6px_var(--gold-hover)]"
                  />
                </motion.div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Global Theme Toggle */}
      <div className="hidden sm:flex items-center">
        <ThemeToggle />
      </div>

      {/* Mobile Menu Trigger */}
      <div className="flex md:hidden items-center gap-2">
        <ThemeToggle />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
          aria-label="Toggle navigation tabs"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] p-6 z-50 shadow-2xl animate-fadeIn">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                onTabChange("home");
                setMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 active:scale-[0.98] ${
                activeTab === "home"
                  ? "bg-[var(--gold-glow)] text-[var(--gold-active)] border border-[var(--gold-border)] font-bold shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--gold-hover)] hover:bg-[var(--bg-subtle)]"
              }`}
            >
              Home View
            </button>

            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 active:scale-[0.98] ${
                    isActive
                      ? "bg-[var(--gold-glow)] text-[var(--gold-active)] border border-[var(--gold-border)] font-bold shadow-xs"
                      : "text-[var(--text-secondary)] hover:text-[var(--gold-hover)] hover:bg-[var(--bg-subtle)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </header>
  );
}
