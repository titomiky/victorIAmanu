import * as React from "react";
import type { Metadata } from "next";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { config } from "@/config";
import CandidatesTable from "@/components/dashboard/candidates/candidates-table";
import RouterLink from "next/link";

export const metadata = {
  title: `Customers | Dashboard | ${config.site.name}`,
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
            href="/dashboard/candidates/add"
          >
            Crear candidato
          </Button>
        </div>
      </Stack>
      <CandidatesTable />
    </Stack>
  );
};

export default Page;
