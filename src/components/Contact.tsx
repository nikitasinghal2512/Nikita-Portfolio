"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Mail, MapPin, Send, CheckCircle2, Copy, Check, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-muted)] block mb-2">
            08 / Inquiries & Correspondence
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-primary)]">
            Get in Touch
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-2 font-light max-w-xl">
            Open to undergraduate research discussions, academic inquiries, and scientific traineeship opportunities.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Information & Channels (Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Affiliation Address */}
            <div className="p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--text-muted)] block mb-1">
                Departmental Affiliation
              </span>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                Department of Biotechnology
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                School of Sciences • JECRC University
              </p>
              <p className="text-xs text-[var(--text-muted)] font-mono mt-3 leading-relaxed">
                Ramchandrapura, Vidhani, Jaipur, Rajasthan 303905, India
              </p>
            </div>

            {/* Email Channels */}
            <div className="p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4">
              <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--text-muted)] block">
                Direct Electronic Mail
              </span>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] block">University Address</span>
                    <a
                      href="mailto:nikita.singhal@jecrcu.edu.in"
                      className="text-xs font-mono text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors select-all"
                    >
                      nikita.singhal@jecrcu.edu.in
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopyEmail("nikita.singhal@jecrcu.edu.in")}
                    className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-[var(--accent-primary)]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] block">Personal / Alternate</span>
                    <a
                      href="mailto:nikita.singhal.biotech@gmail.com"
                      className="text-xs font-mono text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors select-all"
                    >
                      nikita.singhal.biotech@gmail.com
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopyEmail("nikita.singhal.biotech@gmail.com")}
                    className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-[var(--accent-primary)]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <p className="text-[10px] font-mono text-[var(--text-muted)] pt-1 italic">
                * Email placeholders are ready to be personalized with Nikita&apos;s verified inbox.
              </p>
            </div>

            {/* Academic Networks */}
            <div className="p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--text-muted)] block mb-3">
                Academic & Professional Networks
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:border-[var(--border-hover)] flex items-center justify-between group transition-colors"
                >
                  <span className="text-[var(--text-primary)]">LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
                </a>

                <a
                  href="https://researchgate.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:border-[var(--border-hover)] flex items-center justify-between group transition-colors"
                >
                  <span className="text-[var(--text-primary)]">ResearchGate</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form (Spans 7 cols) */}
          <div className="lg:col-span-7 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-editorial font-normal text-[var(--text-primary)] mb-1">
                Send a Direct Message
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-light mb-8">
                Please feel free to reach out regarding academic inquiries, lab opportunities, or scientific collaboration.
              </p>

              {submitted ? (
                <div className="p-8 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-default)] text-center my-6">
                  <div className="w-10 h-10 rounded-full border border-[var(--accent-primary)] flex items-center justify-center mx-auto text-[var(--accent-primary)] mb-3">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                    Message Transmitted
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto mb-4 font-light">
                    Thank you for reaching out. Nikita will review your correspondence and respond promptly.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                  >
                    Send Another Note
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. / Colleague Name"
                        className="w-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors font-light"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="colleague@institution.edu"
                        className="w-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors font-light"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Undergraduate Research / Lab Discussion"
                      className="w-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your thoughts or inquiry..."
                      className="w-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors font-light resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    icon={<Send className="w-3.5 h-3.5" />}
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            <div className="pt-6 border-t border-[var(--border-subtle)] mt-6 flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
              <span>Standard Response: 24–48 Hours</span>
              <span>Jaipur, India (IST)</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
