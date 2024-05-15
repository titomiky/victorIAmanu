import * as React from "react";
import type { Metadata } from "next";
import Grid from "@mui/material/Unstable_Grid2";
import { config } from "@/config";
import { Budget } from "@/components/dashboard/overview/budget";
import { TasksProgress } from "@/components/dashboard/overview/tasks-progress";
import { TotalCustomers } from "@/components/dashboard/overview/total-customers";
import { TotalProfit } from "@/components/dashboard/overview/total-profit";
import StackedBar from "@/components/dashboard/overview/stacked-bar";

export const metadata = {
  title: `Overview | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <Budget diff={0} trend="up" sx={{ height: "100%" }} value="$0k" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers
          diff={0}
          trend="down"
          sx={{ height: "100%" }}
          value="0k"
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: "100%" }} value={0} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: "100%" }} value="$0k" />
      </Grid>
      <Grid lg={100} md={100} xs={100}>
        <StackedBar sx={{ height: "100%" }} />
      </Grid>
    </Grid>
  );
}
