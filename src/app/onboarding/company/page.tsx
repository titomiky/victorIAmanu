import Company from "@/components/onboarding/company/company";
import { config } from "@/config";
import { Metadata } from "next";
import React from "react";

export const metadata = {
  title: `Empresa | Onboarding | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return <Company />;
};

export default Page;
