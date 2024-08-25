"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="secondary"
      size="sm"
      className="relative h-12 w-12 rounded-full flex items-center justify-center overflow-hidden border"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun
        className={`transition-transform duration-300 ${
          theme === "dark" ? "transform rotate-180 scale-0" : "transform rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`absolute transition-transform duration-300 ${
          theme === "dark" ? "transform rotate-0 scale-100" : "transform rotate-180 scale-0"
        }`}
      />
    </Button>
  );
}
