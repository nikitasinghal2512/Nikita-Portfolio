"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "editorial";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isExternal?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  isExternal = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "group inline-flex items-center justify-center font-sans font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-hover)] focus-visible:ring-offset-2 active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 rounded-lg gap-1.5",
    md: "text-xs sm:text-sm px-5 py-2.5 rounded-xl gap-2",
    lg: "text-sm sm:text-base px-6 py-3 rounded-xl gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[var(--accent-primary)] text-[var(--accent-primary-text)] border border-transparent hover:border-[var(--gold-border)] hover:shadow-[0_0_18px_var(--gold-glow)] hover:-translate-y-0.5 active:translate-y-0 shadow-sm",
    secondary:
      "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--gold-hover)] hover:text-[var(--gold-hover)] hover:shadow-[0_0_14px_var(--gold-glow)] hover:bg-[var(--bg-subtle)] hover:-translate-y-0.5 active:translate-y-0 shadow-xs",
    ghost:
      "bg-transparent text-[var(--text-secondary)] hover:text-[var(--gold-hover)] hover:bg-[var(--bg-subtle)]",
    editorial:
      "bg-transparent text-[var(--text-primary)] underline underline-offset-4 decoration-[var(--border-default)] hover:decoration-[var(--gold-hover)] hover:text-[var(--gold-hover)] p-0",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === "right" && (
          <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </button>
  );
}
