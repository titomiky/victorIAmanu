import * as React from "react";
import type { Metadata } from "next";

import { config } from "@/config";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { OnboardingGuard } from "@/components/auth/onboarding-guard";
import AlternativeLayout from "@/components/auth/alternative-layout";

export const metadata = {
  title: `Sign up | Auth | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <AlternativeLayout>
      <OnboardingGuard>
        <SignUpForm />
      </OnboardingGuard>
    </AlternativeLayout>
  );
}
