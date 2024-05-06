import * as React from "react";

import "@/styles/global.css";

import { ThemeProvider } from "@/components/core/theme-provider/theme-provider";
import NavBar from "@/components/candidate/navbar";

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
