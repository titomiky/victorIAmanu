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
  candidatureClient,
} from "@/lib/canidature/client";

export interface StackedBarProps {
  chartSeries?: { name: string; data: number[] }[];
  sx?: SxProps;
}

const StackedBar = ({ chartSeries, sx }: StackedBarProps) => {
  const [data, setData] = React.useState<CandidateCompetencesReport[]>();
  const [error, setError] = React.useState<{ error?: string }>();
  React.useEffect(() => {
    const getData = async () => {
      const res = await candidatureClient.competenciesReport();

      if (Array.isArray(res)) {
        setData(res);
        return;
      }

      setError(res);
      return;
    };
    getData();
  }, []);

  function useChartOptions(): ApexOptions {
    return {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
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
      title: {
        text: "Competencias",
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
      <CardHeader
        action={
          <Button
            color="inherit"
            size="small"
            startIcon={
              <ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />
            }
          >
            Sync
          </Button>
        }
        title="Aptitudes "
      />
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
