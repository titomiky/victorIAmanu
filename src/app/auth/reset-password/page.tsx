import { config } from "@/config";
import { Metadata } from "next";
import React from "react";
import Layout from "@/components/auth/card-layout";
import { EmailLinkForm } from "@/components/auth/email-link-form";

export const metadata = {
  title: `Reset password | Auth | ${config.site.name}`,
} satisfies Metadata;

const page = () => {
  return (
    <Layout>
      <EmailLinkForm />
    </Layout>
  );
};

export default page;
