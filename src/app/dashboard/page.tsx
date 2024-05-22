import * as React from "react";
import type { Metadata } from "next";
import Grid from "@mui/material/Unstable_Grid2";
import { config } from "@/config";
import { CandidatesOverview } from "@/components/dashboard/overview/candidates";
import { NumberOfCandidates } from "@/components/dashboard/overview/number-candidates";
import { TestsProgress } from "@/components/dashboard/overview/tests-progress";
import StackedBar from "@/components/dashboard/overview/stacked-bar";

export const metadata = {
  title: `General | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <CandidatesOverview
          diff={0}
          trend="up"
          sx={{ height: "100%" }}
          value="0"
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <NumberOfCandidates
          diff={0}
          trend="down"
          sx={{ height: "100%" }}
          value="0"
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TestsProgress sx={{ height: "100%" }} value={0} />
      </Grid>

      <Grid lg={100} md={100} xs={100}>
        <StackedBar sx={{ height: "100%" }} />
      </Grid>
    </Grid>
  );
}
