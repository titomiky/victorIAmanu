"use client";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import { paths } from "@/paths";
import { useUser } from "@/hooks/use-user";

export interface NewUserGuardProps {
  children: React.ReactNode;
}

export function OnboardingGuard({
  children,
}: NewUserGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);
  const pathname = usePathname();

  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (user) {
      if (user.onBoarding) {
        // check if the actual path belong to the onboarding
        if (pathname.includes("onboarding")) {
          setIsChecking(false);
          return;
        }

        console.log("[GuestGuard]: User created, redirecting to onboarding");
        router.replace(paths.onboarding.home);
        return;
      }
      console.log(
        "[GuestGuard]: User already did the onboarding, redirecting to home"
      );
      router.replace(paths.home);
      return;
    }

    if (pathname.includes("onboarding") && !user) {
      console.log("[GuestGuard]: User is not login");
      router.replace(paths.auth.signUp);
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
