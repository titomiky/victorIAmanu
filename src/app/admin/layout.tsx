"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import NavBar from "@/components/admin/navbar";
import { AdminGuard } from "@/components/auth/admin-guard";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <AdminGuard>
      <main>
        <NavBar />
        <Container maxWidth="xl" sx={{ py: "24px" }}>
          {children}
        </Container>
      </main>
    </AdminGuard>
  );
}
