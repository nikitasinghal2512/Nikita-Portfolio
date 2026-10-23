"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Send, CheckCircle2, AlertCircle, Copy, Check, ArrowUpRight, Loader2, Mail } from "lucide-react";
import ContactBackground from "./ContactBackground";

export default function ContactView() {
  const targetEmail = "Nikita.26bbin0189@jecrcu.edu.in";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isServiceUnconfigured, setIsServiceUnconfigured] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsServiceUnconfigured(false);

    // Client-side field validation
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!formData.message.trim()) {
      setErrorMessage("Please enter your message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Failed to submit message. Please try again.");
        if (data.configured === false) {
          setIsServiceUnconfigured(true);
        }
      }
    } catch {
      setErrorMessage("Network error occurred while submitting message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="relative h-full overflow-y-auto px-6 sm:px-12 lg:px-16 py-8 md:py-14 select-text bg-[var(--bg-canvas)]">
      
      {/* Live Digital Communication Interface Background */}
      <ContactBackground />

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="border-b border-[var(--border-subtle)] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-xs font-sans tracking-wider uppercase text-[var(--gold-hover)] font-medium">
                Inquiries & Academic Correspondence
              </span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--text-primary)] tracking-tight">
              Get in Touch
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] font-normal max-w-sm">
            Available for undergraduate research inquiries, academic discussions, and scientific collaboration.
          </p>
        </header>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Institution and Department Box (Exact Two-Line Format) */}
            <div className="p-7 rounded-2xl bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] shadow-sm space-y-1">
              <h2 className="text-xl sm:text-2xl font-editorial font-normal text-[var(--text-primary)] leading-tight">
                JECRC University
              </h2>
              <p className="text-xs sm:text-sm font-sans text-[var(--gold-hover)] font-medium">
                Department of Biotechnology
              </p>
            </div>

            {/* Email Channels (Exact Verified Address) */}
            <div className="p-7 rounded-2xl bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] space-y-4 shadow-sm">
              <span className="text-xs font-sans uppercase tracking-wider text-[var(--gold-hover)] font-medium block">
                Direct Electronic Mail
              </span>

              <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <span className="text-[11px] font-sans text-[var(--text-muted)] block mb-0.5">
                    Academic Inbox
                  </span>
                  <a
                    href={`mailto:${targetEmail}`}
                    className="text-xs sm:text-sm font-sans text-[var(--text-primary)] hover:text-[var(--gold-hover)] transition-colors select-all font-medium break-all"
                  >
                    {targetEmail}
                  </a>
                </div>
                <button
                  onClick={() => handleCopyEmail(targetEmail)}
                  className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--gold-hover)] hover:bg-[var(--gold-glow)] transition-colors cursor-pointer shrink-0"
                  title="Copy Email Address"
                  aria-label="Copy Academic Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-xs font-sans text-[var(--text-muted)] leading-relaxed">
                Direct messages submitted through the form are routed immediately to this institutional inbox.
              </p>
            </div>

            {/* Academic & Professional Profiles Area */}
            <div className="p-7 rounded-2xl bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] shadow-sm">
              <span className="text-xs font-sans uppercase tracking-wider text-[var(--gold-hover)] font-medium block mb-3.5">
                Academic & Professional Profiles
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm font-sans">
                {/* Visual Button Only: LinkedIn (No URL, hyperlink, or click action) */}
                <div
                  className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] flex items-center justify-between select-none opacity-90"
                  title="LinkedIn Profile"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 fill-current text-[var(--gold-hover)]" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                    </svg>
                    <span className="text-[var(--text-primary)] font-medium">LinkedIn</span>
                  </div>
                </div>

                {/* GitHub Profile Button (Opens https://github.com/nikitasinghal2512 in a new browser tab) */}
                <a
                  href="https://github.com/nikitasinghal2512"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:border-[var(--gold-hover)] hover:bg-[var(--bg-surface-elevated)] flex items-center justify-between group transition-all duration-200 cursor-pointer"
                  title="Nikita Singhal on GitHub"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 fill-current text-[var(--text-secondary)] group-hover:text-[var(--gold-hover)] transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span className="text-[var(--text-primary)] font-medium">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--gold-hover)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Send Direct Message Form */}
          <div className="lg:col-span-7 bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] rounded-2xl p-8 sm:p-10 space-y-6 shadow-sm">
            <div>
              <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-primary)]">
                Send a Direct Message
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans font-normal mt-1">
                Submissions are delivered directly to <span className="text-[var(--text-primary)] font-medium">{targetEmail}</span>.
              </p>
            </div>

            {/* Error / Alert Banner */}
            {errorMessage && (
              <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/20 text-xs sm:text-sm font-sans text-red-300 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium">{errorMessage}</p>
                  {isServiceUnconfigured && (
                    <p className="text-xs text-red-300/80 leading-relaxed">
                      To activate automatic inbox delivery, set your <code className="bg-black/30 px-1 py-0.5 rounded text-red-200 font-mono">WEB3FORMS_ACCESS_KEY</code> or <code className="bg-black/30 px-1 py-0.5 rounded text-red-200 font-mono">FORMSPREE_ENDPOINT</code> in your environment. Alternatively, click the email address on the left to write directly.
                    </p>
                  )}
                </div>
              </div>
            )}

            {submitted ? (
              <div className="p-8 sm:p-10 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] text-center my-6 space-y-4">
                <div className="w-12 h-12 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-editorial font-normal text-[var(--text-primary)]">
                  Message Transmitted Successfully
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm mx-auto font-sans leading-relaxed">
                  Thank you for reaching out. Your message has been routed to <span className="font-medium text-[var(--text-primary)]">{targetEmail}</span>. Nikita will respond as soon as possible.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans text-[var(--text-secondary)] mb-1.5 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Colleague / Dr. Name"
                      className="w-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-sans text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--gold-hover)] focus:shadow-[0_0_12px_var(--gold-glow)] transition-all duration-200 font-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans text-[var(--text-secondary)] mb-1.5 font-medium">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="colleague@institution.edu"
                      className="w-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-sans text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--gold-hover)] focus:shadow-[0_0_12px_var(--gold-glow)] transition-all duration-200 font-normal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans text-[var(--text-secondary)] mb-1.5 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Academic Inquiry / Laboratory Discussion"
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-sans text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--gold-hover)] focus:shadow-[0_0_12px_var(--gold-glow)] transition-all duration-200 font-normal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-[var(--text-secondary)] mb-1.5 font-medium">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-sans text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--gold-hover)] focus:shadow-[0_0_12px_var(--gold-glow)] transition-all duration-200 font-normal resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  className="w-full justify-center"
                  icon={isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                >
                  {isSubmitting ? "Transmitting Message..." : "Transmit Message"}
                </Button>
              </form>
            )}

            {/* Scientific Quote */}
            <div className="pt-6 border-t border-[var(--border-subtle)] text-center space-y-1">
              <p className="font-editorial text-lg text-[var(--text-primary)] italic">
                &ldquo;Science and everyday life cannot and should not be separated.&rdquo;
              </p>
              <p className="text-xs font-sans text-[var(--gold-hover)] uppercase tracking-wider font-medium">
                — Rosalind Franklin, DNA X-ray Crystallography Pioneer
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
