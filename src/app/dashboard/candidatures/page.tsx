import type { Candidature } from "@/components/dashboard/candidatures/candidatures-table";
import RouterLink from "next/link";
import { config } from "@/config";
import { Button, Stack } from "@mui/material";
import dayjs from "dayjs";
import { Metadata } from "next";
import React from "react";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import CandidaturesTable from "@/components/dashboard/candidatures/candidatures-table";
import CandidaturesFilters from "@/components/dashboard/candidatures/candidatures-filters";

export const metadata = {
  title: `Candidaturas | Dashboard | ${config.site.name}`,
} satisfies Metadata;

const candidatures = [
  {
    id: "USR-011",
    title: "Alcides Antonio",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    skills: ["javascript"],
    createdAt: dayjs().subtract(2, "hours").toDate(),
  },
  {
    id: "USR-010",
    title: "Alcides Antonio",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    skills: ["python"],
    createdAt: dayjs().subtract(2, "hours").toDate(),
  },
] satisfies Candidature[];

const Page = () => {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedCustomers = applyPagination(candidatures, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            LinkComponent={RouterLink}
            href="/dashboard/candidatures/add"
          >
            Añadir
          </Button>
        </div>
      </Stack>
      <CandidaturesFilters />
      <CandidaturesTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
};

export default Page;

function applyPagination(
  rows: Candidature[],
  page: number,
  rowsPerPage: number
): Candidature[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
