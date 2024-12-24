import React, { useState } from "react";
import { Box, IconButton, Typography, Grid, Paper } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day() === 0 ? 6 : startOfMonth.day() - 1;

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const renderDays = () => {
    const days: JSX.Element[] = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<Box key={`empty-${i}`} sx={{ width: 40, height: 40, margin: "4px" }} />);
    }

    for (let day = 1; day <= 7; day++) {
      const isToday = dayjs().isSame(currentDate.set("date", day), "day");

      days.push(
        <Paper
          key={day}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            margin: "4px",
            backgroundColor: isToday ? "#d9d9d9" : "#fff",
            color: isToday ? "black" : "inherit",
            border: isToday ? "2px solid black" : "1px solid #ccc",
            borderRadius: "50%",
          }}
        >
          <Typography>{day}</Typography>
        </Paper>,
      );
    }

    return days;
  };

  return (
    <Box sx={{ maxWidth: 300, margin: "0 auto", textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <IconButton onClick={handlePrevMonth}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
          {currentDate.format("MMMM YYYY")}
        </Typography>
        <IconButton onClick={handleNextMonth}>
          <ChevronRight />
        </IconButton>
      </Box>
      <Grid container columns={7} spacing={0} justifyContent="center">
        {daysOfWeek.map((day) => (
          <Typography
            key={day}
            sx={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            {day}
          </Typography>
        ))}
        {renderDays()}
      </Grid>
    </Box>
  );
};

export default Calendar;
