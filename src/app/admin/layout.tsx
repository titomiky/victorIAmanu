"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import NavBar from "@/components/admin/navbar";
import { getUser } from "@/lib/auth/client";
import { UserToken } from "@/types/user";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const [isChecking, setIsChecking] = React.useState<boolean>(true);
  const router = useRouter();

  React.useEffect(() => {
    const token = getUser() as UserToken;

    if (token.role === "admin") {
      setIsChecking(false);
      return;
    }

    router.replace(paths.auth.signIn);
    return;
  }, []);

  return (
    <>
      {isChecking ? (
        ""
      ) : (
        <main>
          <NavBar />
          <Container maxWidth="xl" sx={{ py: "24px" }}>
            {children}
          </Container>
        </main>
      )}{" "}
    </>
  );
}
