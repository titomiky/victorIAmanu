import CandidateHome from "@/components/candidate/candidate-home";
import { config } from "@/config";
import { Metadata } from "next";
import React from "react";

export const metadata = {
  title: `Home | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return <CandidateHome />;
};

export default Page;
