import { useUser } from "@/hooks/use-user";
import { paths } from "@/paths";
import { Alert } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import * as React from "react";

export interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({
  children,
}: AdminGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const isTokenExpired = () => {
    const token = localStorage.getItem("stoical-auth-token") as string;
    if (!token) return true; // Token does not exist
    const decodedToken = jwtDecode(token) as any;
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp < currentTime;
  };

  const checkPermissions = async (): Promise<void> => {
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

    if (user.role !== "admin") {
      console.log("[AuthGuard]: User is not admin, redirecting to auth");
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

  return <>{children}</>;
}
