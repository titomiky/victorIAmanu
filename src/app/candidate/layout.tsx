import * as React from "react";
import type { Viewport } from "next";

import "@/styles/global.css";

import { ThemeProvider } from "@/components/core/theme-provider/theme-provider";
import NavBar from "@/components/candidate/navbar";

export const viewport = {
  width: "device-width",
  initialScale: 1,
} satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
