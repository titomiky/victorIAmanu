import * as React from "react";
import type { Metadata } from "next";
import { config } from "@/config";
import AccountOverview from "@/components/dashboard/account/account-overview";

export const metadata = {
  title: `Cuenta | Dashboard | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return <AccountOverview />;
};

export default Page;
