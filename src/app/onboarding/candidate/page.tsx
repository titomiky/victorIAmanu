import Candidate from "@/components/onboarding/candidate/candidate";
import { config } from "@/config";
import { Metadata } from "next";
import React from "react";

export const metadata = {
  title: `Candidato | Onboarding | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return <Candidate />;
};

export default Page;
