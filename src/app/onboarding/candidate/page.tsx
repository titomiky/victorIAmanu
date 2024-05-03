import Candidate from "@/components/onboarding/candidate/candidate";
import { config } from "@/config";
import { Metadata } from "next";
import React from "react";
import { OnboardingGuard } from "@/components/auth/onboarding-guard";

export const metadata = {
  title: `Candidato | Onboarding | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return (
    <OnboardingGuard>
      <Candidate />
    </OnboardingGuard>
  );
};

export default Page;
