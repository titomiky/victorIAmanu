import Completed from "@/components/onboarding/completed/completed";
import { config } from "@/config";
import { Metadata } from "next";
import React from "react";

export const metadata = {
  title: `Completado | Onboarding | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return <Completed />;
};

export default Page;
