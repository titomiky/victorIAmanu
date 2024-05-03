import { OnboardingGuard } from "@/components/auth/onboarding-guard";
import OnBoarding from "@/components/onboarding/on-boarding";
import { config } from "@/config";
import { Metadata } from "next";
import React from "react";

export const metadata = {
  title: `Onboarding | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return (
    <OnboardingGuard>
      <OnBoarding />
    </OnboardingGuard>
  );
};

export default Page;
