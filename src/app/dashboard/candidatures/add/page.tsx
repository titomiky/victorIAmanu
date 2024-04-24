import CreateCandidature from "@/components/dashboard/candidatures/add/create-candidature";
import { config } from "@/config";
import { Metadata } from "next";
import React from "react";

export const metadata = {
  title: `Crear Candidatura | Dashboard | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return <CreateCandidature />;
};

export default Page;
