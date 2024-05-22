import * as React from "react";
import type { Metadata } from "next";
import Layout from "@/components/auth/card-layout";
import { config } from "@/config";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata = {
  title: `Cambiar contraseña | ${config.site.name}`,
} satisfies Metadata;

export default function Page({
  params,
}: {
  params: { slug: string };
}): React.JSX.Element {
  return (
    <Layout>
      <ResetPasswordForm userId={params.slug} />
    </Layout>
  );
}
