import CandidateOverview from "@/components/candidate/candidate-overview";
import { config } from "@/config";
import { Metadata } from "next";
import React from "react";

export const metadata = {
  title: `Overview | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return <CandidateOverview />;
};

export default Page;
