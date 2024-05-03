import Company from "@/components/onboarding/company/company";
import { config } from "@/config";
import { Metadata } from "next";
import React from "react";
import { OnboardingGuard } from "@/components/auth/onboarding-guard";

export const metadata = {
  title: `Empresa | Onboarding | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return (
    <OnboardingGuard>
      <Company />
    </OnboardingGuard>
  );
};

export default Page;
