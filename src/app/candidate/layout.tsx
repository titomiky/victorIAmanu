import * as React from "react";
import "@/styles/global.css";
import { ThemeProvider } from "@/components/core/theme-provider/theme-provider";
import NavBar from "@/components/candidate/navbar";
import { Container } from "@mui/material";
import { CandidateGuard } from "@/components/auth/candidate-guard";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <CandidateGuard>
          <ThemeProvider>
            <NavBar />
            <Container maxWidth={false} sx={{ py: "24px" }}>
              {children}
            </Container>
          </ThemeProvider>
        </CandidateGuard>
      </body>
    </html>
  );
}
