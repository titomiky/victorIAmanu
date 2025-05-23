import * as React from "react";
import type { Metadata } from "next";

import { config } from "@/config";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { OnboardingGuard } from "@/components/auth/onboarding-guard";
import Layout from "@/components/auth/card-layout";

export const metadata = {
  title: `Registro | ${config.site.name}`,
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
