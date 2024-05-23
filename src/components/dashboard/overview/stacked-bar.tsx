"use client";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import * as React from "react";
import { Chart } from "@/components/core/chart";
import type { SxProps } from "@mui/material/styles";
import { ApexOptions } from "apexcharts";
import {
  CandidateCompetencesReport,
  reportsClient,
} from "@/lib/reports/client";

export interface StackedBarProps {
  sx?: SxProps;
}

const StackedBar = ({ sx }: StackedBarProps) => {
  const [data, setData] = React.useState<CandidateCompetencesReport[]>();
  const [error, setError] = React.useState<{ error?: string }>();
  React.useEffect(() => {
    const getData = async () => {
      const res = await reportsClient.competenciesReport();

      if (Array.isArray(res)) {
        setData(res);
        return;
      }

      setError(res);
      return;
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  function useChartOptions(): ApexOptions {
    return {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        defaultLocale: "es",
        locales: [
          {
            name: "es",
            options: {
              toolbar: {
                exportToPNG: "Descargar PNG",
                exportToCSV: "Descargar CSV",
                exportToSVG: "Descargar SVG",
              },
            },
          },
        ],
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true, // Ensure bars are horizontal
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 10,
              style: {
                fontSize: "14px",
                fontWeight: 300,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: Array.isArray(data) && data.map((item) => item.name), // Candidate names on x-axis

        labels: {
          formatter: function (val) {
            return "";
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 10,
      },
    };
  }

  const chartOptions = useChartOptions();

  return (
    <Card sx={sx}>
      <CardHeader title="Competencias de los candidatos" />
      <CardContent>
        {Array.isArray(data) ? (
          <Chart
            height={350}
            options={chartOptions}
            series={data[0].competences.map((competence, index) => ({
              name: competence.name,
              data: data.map((candidate) => candidate.competences[index].value),
            }))}
            type="bar"
            width="100%"
          />
        ) : (
          <Typography>{error?.error}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StackedBar;
