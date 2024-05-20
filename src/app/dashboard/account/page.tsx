import * as React from "react";
import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import { config } from "@/config";
import { AccountDetailsForm } from "@/components/dashboard/account/account-details-form";
import AccountInfo from "@/components/dashboard/account/account-info";

export const metadata = {
  title: `Account | Dashboard | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return (
    <Stack spacing={5}>
      <div>
        <Typography variant="h4">Cuenta</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid sx={{ width: "100%" }}>
          <AccountInfo />
        </Grid>
        <Grid sx={{ width: "100%" }}>
          <AccountDetailsForm />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Page;
