import CreateCandidate from "@/components/dashboard/candidates/add/create-candidate";
import { config } from "@/config";
import { Metadata } from "next";
import React from "react";

export const metadata = {
  title: `Crear Candidato | Dashboard | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return <CreateCandidate />;
};

export default Page;
