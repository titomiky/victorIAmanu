"use client";
import { Stack, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import React from "react";
import { Chart } from "../core/chart";
import { UserCompetenceReport, reportsClient } from "@/lib/reports/client";
import Image from "next/image";
import Loading from "../core/loading";

const CandidateOverview = () => {
  const [data, setData] = React.useState<UserCompetenceReport[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<{ error?: string }>();
  const [isDataPending, setIsDataPending] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getData = async () => {
      const res = await reportsClient.candidateReport();

      setIsDataPending(false);
      if (Array.isArray(res)) {
        setData(res);
        return;
      }
      setErrorMessage(res);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
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
    <Stack
      spacing={2}
      sx={{
        padding: "16px",
        minHeight: "80vh",
        display: "flex",
      }}
    >
      {data.length > 0 ? (
        <Chart
          height={600}
          sx={{
            width: "100%",
            height: "auto",
            maxWidth: "100%",
            margin: "auto",
          }}
          options={options}
          series={values}
          type="donut"
          width="100%"
        />
      ) : (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "grid",
            placeContent: "center",
            gap: "16px",
            minHeight: "calc(80vh - 70px)",
          }}
        >
          {isDataPending ? (
            <Loading variable={isDataPending} />
          ) : errorMessage?.error ? (
            errorMessage?.error
          ) : (
            <>
              <Typography
                sx={{ display: "inline" }}
                component="h1"
                variant="h4"
              >
                Por el momento no cuentas con estadísticas ...
              </Typography>

              <Image
                src={"/assets/undraw_empty.svg"}
                alt="Image"
                width={500}
                height={500}
                style={{ maxWidth: "100%", margin: "auto" }}
              />
            </>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default CandidateOverview;
