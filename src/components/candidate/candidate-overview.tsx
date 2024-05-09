"use client";
import { Box, Stack, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import React from "react";
import { Chart } from "../core/chart";
import { UserCompetenceReport, reportsClient } from "@/lib/reports/client";

const CandidateOverview = () => {
  const [data, setData] = React.useState<UserCompetenceReport[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<{ error?: string }>();

  React.useEffect(() => {
    const getData = async () => {
      const res = await reportsClient.candidateReport();
      console.log(res);

      if (Array.isArray(res)) {
        setData(res);
        return;
      }

      setErrorMessage(res);
    };
    getData();
  }, []);

  const names = data.length ? data.map((item) => item.name) : [];
  const values = data.length ? data.map((item) => item.value) : [];
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
      {data.length > 0 && (
        <Chart
          height={500}
          options={options}
          series={values}
          type="donut"
          width="100%"
        />
      )}
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
      >
        {errorMessage?.error}
      </Stack>
    </Stack>
  );
};

export default CandidateOverview;
