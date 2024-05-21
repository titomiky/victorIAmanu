import RouterLink from "next/link";
import { config } from "@/config";
import { Button, Stack } from "@mui/material";
import { Metadata } from "next";
import React from "react";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import CandidaturesTable from "@/components/dashboard/candidatures/candidatures-table";

export const metadata = {
  title: `Candidaturas | Dashboard | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            LinkComponent={RouterLink}
            href="/dashboard/candidatures/add"
            color="success"
          >
            Crear candidatura
          </Button>
        </div>
      </Stack>
      <CandidaturesTable />
    </Stack>
  );
};

export default Page;
