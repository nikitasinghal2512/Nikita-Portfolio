"use client";

import { useEffect, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";

declare global {
  interface Window {
    botpress?: {
      init: (options: any) => void;
      on: (event: string, callback: (...args: any[]) => void) => void;
      setConfiguration: (config: Record<string, any>) => void;
      open?: () => void;
      close?: () => void;
      toggle?: () => void;
    };
  }
}

export default function BotpressChat() {
  const { theme } = useTheme();

  // Sync current website theme with Botpress Webchat
  const syncThemeWithBotpress = useCallback(
    (currentTheme: "dark" | "light") => {
      if (typeof window === "undefined" || !window.botpress?.setConfiguration) {
        return;
      }

      try {
        window.botpress.setConfiguration({
          themeMode: currentTheme === "dark" ? "dark" : "light",
          color: "#8B5CF6", // Electric Violet accent
        });
      } catch (err) {
        // Silently catch if webchat is still transitioning
      }
    },
    []
  );

  // Update theme whenever website theme changes or botpress becomes ready
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Apply immediate sync
    syncThemeWithBotpress(theme);

    // Register event listeners when botpress is available
    if (window.botpress?.on) {
      try {
        window.botpress.on("webchat:initialized", () => {
          syncThemeWithBotpress(theme);
        });
        window.botpress.on("webchat:ready", () => {
          syncThemeWithBotpress(theme);
        });
      } catch (e) {
        // Event listener subscription fallback
      }
    }
  }, [theme, syncThemeWithBotpress]);

  return null;
}
