import React, { FC } from "react";
import { Box, Typography, Tabs, Tab, styled } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  Chart,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const PatientStatistics: FC = () => {
  const [tabValue, setTabValue] = React.useState<number>(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const createGradient = (
    ctx: CanvasRenderingContext2D,
    chartArea: Chart["chartArea"] | undefined,
  ) => {
    if (!chartArea) {
      return "rgba(0, 0, 0, 0)";
    }
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "#1DBD22");
    gradient.addColorStop(1, "#DA0B0B");
    return gradient;
  };

  const data: ChartData<"bar"> = {
    labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    datasets: [
      {
        label: "Пациенты",
        data: [30, 7, 15, 10, 9, 27, 4],
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return "rgba(0, 0, 0, 0)";
          }

          return createGradient(ctx, chartArea);
        },
        borderRadius: 10,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <StyledBox>
      <StyledTypography variant="h6">Статистика пациентов</StyledTypography>
      <Bar data={data} options={options} />
      <StyledTabs value={tabValue} onChange={handleChange} variant="fullWidth">
        <Tab label="За неделю" />
        <Tab label="За месяц" />
        <Tab label="За год" />
      </StyledTabs>
    </StyledBox>
  );
};

const StyledBox = styled(Box)({
  padding: "16px",
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  maxWidth: "228px",
  height: "336px",
});

const StyledTypography = styled(Typography)({
  color: "#101010",
  fontSize: "15px",
  fontWeight: "700",
  marginBottom: "16px",
  textAlign: "center",
});

const StyledTabs = styled(Tabs)({
  marginTop: "16px",
});
