import * as React from "react";

import "@/styles/global.css";

import { UserProvider } from "@/contexts/user-context";
import { LocalizationProvider } from "@/components/core/localization-provider";
import { ThemeProvider } from "@/components/core/theme-provider/theme-provider";
import { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  icons: ["/assets/logo.svg"],
} satisfies Metadata;

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <LocalizationProvider>
          <UserProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </UserProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
