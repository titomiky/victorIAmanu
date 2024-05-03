import * as React from "react";
import type { Metadata } from "next";

import { config } from "@/config";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Layout } from "@/components/auth/layout";
import { OnboardingGuard } from "@/components/auth/onboarding-guard";

export const metadata = {
  title: `Sign up | Auth | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <OnboardingGuard>
        <SignUpForm />
      </OnboardingGuard>
    </Layout>
  );
}
