"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { ArrowClockwise as ArrowClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowClockwise";
import { Chart } from "@/components/core/chart";
import type { SxProps } from "@mui/material/styles";
import { ApexOptions } from "apexcharts";
import { YearClientReport, reportsClient } from "@/lib/reports/client";

export interface StackedBarProps {
  chartSeries?: { name: string; data: number[] }[];
  sx?: SxProps;
}

const StackedBar = ({ chartSeries, sx }: StackedBarProps) => {
  const [data, setData] = React.useState<YearClientReport[]>();
  const [error, setError] = React.useState<{ error?: string }>();
  const [year, setYear] = React.useState<number>(2024);

  React.useEffect(() => {
    const getData = async () => {
      const res = await reportsClient.getYearReport(year);

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
          Array.isArray(data) && data[0].statistics.map((item) => item.name), //[2008, 2009, 2010, 2011, 2012, 2013, 2014],
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

  const handleChangeYear = async () => {
    const res = await reportsClient.getYearReport(year);

    if (Array.isArray(res)) {
      setData(res);
      return;
    }

    setError(res);
    return;
  };

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
        <Box
          sx={{
            display: "flex",
            gap: "14px",
            alignItems: "center",
            alignContent: "center",
            marginBottom: "20px",
          }}
        >
          <TextField
            label="Año"
            variant="outlined"
            placeholder="Año"
            onChange={(e: any) => setYear(e.target.value)}
            value={year}
          />
          <Button onClick={handleChangeYear} variant="text">
            Continuar
          </Button>
        </Box>
        {Array.isArray(data) ? (
          <Chart
            height={350}
            options={chartOptions}
            series={data.map((item) => {
              return {
                name: item.companyName,
                data: item.statistics.map((res) => res.value),
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
