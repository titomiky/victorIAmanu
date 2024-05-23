"use client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import * as React from "react";
import { ArrowClockwise as ArrowClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowClockwise";
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
          horizontal: true,
          dataLabels: {
            total: {
              enabled: false,
              offsetX: 0,
              style: {
                fontSize: "13px",
                fontWeight: 900,
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
        categories:
          Array.isArray(data) && data[0].competences.map((item) => item.name), //[2008, 2009, 2010, 2011, 2012, 2013, 2014],
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
        offsetX: 0,
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
            series={data.map((item) => {
              return {
                name: item.name,
                data: item.competences.map((res) => res.value),
              };
            })}
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
