import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ArrowBlock from "../UI/ArrowBlock";

const getDaysOfWeek = (startOfWeek: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push({
      day: day.toLocaleString("ru-RU", { weekday: "long" }),
      date: day.toLocaleDateString("ru-RU"),
      isWeekend: i === 6 || i === 0,
    });
  }

  return days.map((week) => {
    const formattedDay = week.day.charAt(0).toUpperCase() + week.day.slice(1).toLowerCase();
    return {
      ...week,
      day: formattedDay,
    };
  });
};

const getMonday = (date: Date) => {
  const monday = new Date(date);
  const day = monday.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  monday.setDate(monday.getDate() + diff);
  return monday;
};

export const DaysOfWeekCalendar: React.FC = () => {
  const [startOfWeek, setStartOfWeek] = useState(getMonday(new Date()));
  const [daysOfWeek, setDaysOfWeek] = useState(getDaysOfWeek(startOfWeek));
  const [selectedDate, setSelectedDate] = useState("");

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    const newStartOfWeek = new Date(startOfWeek);
    newStartOfWeek.setDate(startOfWeek.getDate() + (direction === "left" ? -7 : 7));
    setStartOfWeek(getMonday(newStartOfWeek));
  };

  useEffect(() => {
    setDaysOfWeek(getDaysOfWeek(startOfWeek));
  }, [startOfWeek]);

  const today = new Date().toLocaleDateString("ru-RU");

  return (
    <Box display="flex" alignItems="center" gap={2} padding="5px 0" marginBottom="10px">
      <ArrowBlock rotate onClick={() => handleScroll("left")} />

      <Box
        ref={scrollRef}
        display="flex"
        overflow="auto"
        gap={1}
        sx={{
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {daysOfWeek.map(({ day, date, isWeekend }) => (
          <Box
            key={date}
            onClick={() => setSelectedDate(date)}
            sx={{
              padding: "4px 0px",
              minWidth: "100px",
              textAlign: "center",
              borderRadius: "10px",
              width: "100vw",
              backgroundColor: date === today ? "#c5d3ff" : "transparent",
              color: isWeekend ? (selectedDate === date ? "red" : "blue") : "inherit",
            }}
          >
            <Typography variant="body2" color={isWeekend ? "#D80E0C" : "#5865F2"}>
              {day}
            </Typography>
            <Typography
              variant="body1"
              color={isWeekend ? "#D80E0C" : "#101010"}
              sx={{
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              {date}
            </Typography>
          </Box>
        ))}
      </Box>

      <ArrowBlock onClick={() => handleScroll("right")} />
    </Box>
  );
};
