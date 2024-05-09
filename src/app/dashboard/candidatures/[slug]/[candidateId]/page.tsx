import CandidateOverview from "@/components/dashboard/candidates/candidate-overview";
import React from "react";

const Page = ({
  params,
}: {
  params: { slug: string; candidateId: string };
}) => {
  return (
    <CandidateOverview
      candidateId={params.candidateId}
      candidatureId={params.slug}
    />
  );
};

export default Page;
