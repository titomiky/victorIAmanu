import Home from "@/components/admin/home";
import React from "react";
import type { Metadata } from "next";
import { config } from "@/config";

export const metadata = {
  title: `Admin | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return <Home />;
};

export default Page;
