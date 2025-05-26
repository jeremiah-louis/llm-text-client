'use client'

import React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // No theme logic, always light mode
  return <>{children}</>;
} 