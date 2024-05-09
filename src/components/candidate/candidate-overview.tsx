"use client";
import { Box, Stack, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import React from "react";
import { Chart } from "../core/chart";

const data = [
  { name: "competencia1", value: 33 },
  { name: "competencia2", value: 53 },
  { name: "competencia3", value: 59 },
  { name: "competencia4", value: 27 },
  { name: "competencia5", value: 12 },
  { name: "competencia6", value: 26 },
  { name: "competencia7", value: 38 },
  { name: "competencia8", value: 20 },
  { name: "competencia9", value: 29 },
  { name: "competencia10", value: 41 },
];

const CandidateOverview = () => {
  const names = data.map((item) => item.name);
  const values = data.map((item) => item.value);
  const options = useChartOptions(names);

  function useChartOptions(labels: string[]): ApexOptions {
    return {
      labels: labels,
      chart: {
        type: "donut",
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (val, opts) {
          return values[opts.seriesIndex];
        },
        style: {
          fontSize: "14px",
        },
      },
      legend: {
        fontSize: "18px",
        itemMargin: {
          vertical: 10,
        },
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  }

  return (
    <Stack spacing={2} sx={{ padding: "16px" }}>
      <Chart
        height={500}
        options={options}
        series={values}
        type="donut"
        width="100%"
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      ></Stack>
    </Stack>
  );
};

export default CandidateOverview;
