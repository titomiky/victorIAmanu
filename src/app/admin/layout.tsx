import * as React from "react";
import Container from "@mui/material/Container";
import NavBar from "@/components/admin/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <main>
      <NavBar />
      <Container maxWidth="xl" sx={{ py: "24px" }}>
        {children}
      </Container>
    </main>
  );
}
