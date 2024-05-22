import * as React from "react";
import type { Metadata } from "next";

import { config } from "@/config";
import { SignInForm } from "@/components/auth/sign-in-form";
import { AuthGuard } from "@/components/auth/auth-guard";
import Layout from "@/components/auth/card-layout";

export const metadata = {
  title: `Iniciar sesión | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <AuthGuard>
        <SignInForm />
      </AuthGuard>
    </Layout>
  );
}
