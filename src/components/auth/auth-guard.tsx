"use client";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import { paths } from "@/paths";
import { useUser } from "@/hooks/use-user";
import { jwtDecode } from "jwt-decode";

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({
  children,
}: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);
  const path = usePathname();

  const isTokenExpired = () => {
    const token = localStorage.getItem("stoical-auth-token") as string;
    if (!token) return true;
    const decodedToken = jwtDecode(token) as any;
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  const checkPermissions = async (): Promise<void> => {
    if (path.includes("/auth")) {
      if (user) {
        if (user.onBoarding) {
          console.log(
            "[AuthGuard]: User onboarding is incomplete, redirecting to onboarding"
          );
          router.replace(paths.onboarding.home);
          return;
        }

        if (user.role === "candidate") {
          console.log("[AuthGuard]: Redirecting user to candidates home");
          router.replace(paths.candidate.home);
          return;
        }

        console.log("[AuthGuard]: Redirecting user to candidates dashboard");
        router.replace(paths.dashboard.overview);
        return;
      }

      return setIsChecking(false);
    }

    if (isTokenExpired()) {
      console.log(
        "[AuthGuard]: User token is expired, redirecting to sign up page"
      );
      localStorage.removeItem("stoical-auth-token");
      router.replace(paths.auth.signIn);
      return;
    }

    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (!user) {
      console.log("[AuthGuard]: User is not logged in, redirecting to sign in");
      router.replace(paths.auth.signIn);
      return;
    }

    if (user.onBoarding) {
      console.log(
        "[AuthGuard]: User onboarding is incomplete, redirecting to onboarding"
      );
      router.replace(paths.onboarding.home);
      return;
    }

    if (user.role !== "client") {
      console.log("[AuthGuard]: User is not client, redirecting to auth");
      router.replace(paths.auth.signIn);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
