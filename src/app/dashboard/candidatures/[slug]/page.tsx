import React from "react";
import type { Metadata } from "next";
import CandidatesByOffer from "@/components/dashboard/candidates/candidates-by-offer";
import { config } from "@/config";

export const metadata = {
  title: `Candidates | Dashboard | ${config.site.name}`,
} satisfies Metadata;

const Page = ({ params }: { params: { slug: string } }) => {
  return <CandidatesByOffer candidatureId={params.slug} />;
};

export default Page;
