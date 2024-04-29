import Candidate from "@/components/onboarding/canidate/canidate";
import { config } from "@/config";
import { Metadata } from "next";
import React from "react";

export const metadata = {
  title: `Candidate | Onboarding | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return <Candidate />;
};

export default Page;
