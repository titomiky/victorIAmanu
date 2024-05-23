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
import { Chart } from "@/components/core/chart";
import type { SxProps } from "@mui/material/styles";
import { ApexOptions } from "apexcharts";
import { YearClientReport, reportsClient } from "@/lib/reports/client";

export interface StackedBarProps {
  sx?: SxProps;
}

const StackedBar = ({ sx }: StackedBarProps) => {
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
              enabled: false,
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
        categories: Array.isArray(data) && data.map((item) => item.companyName), // Candidate names on x-axis

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
      <CardHeader title="Aptitudes " />

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
            series={data[0].statistics.map((competence, index) => ({
              name: competence.name,
              data: data.map((candidate) => candidate.statistics[index].value),
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
