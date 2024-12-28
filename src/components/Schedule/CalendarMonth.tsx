import React, { useState } from "react";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { HeaderDoctor } from "./HeaderDoctor";
import { doctors } from "../../utils/constants/doctors";
import { styled } from "@mui/material";

const weekdays: { [key: number]: string } = {
  0: "Воскресенье",
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
};

export const CalendarMonth: React.FC = () => {
  const [doctorId, setDoctorId] = useState<number>();

  const handleClick = (id: number) => {
    setDoctorId(id);
  };
  const selectedDoctor = doctors.find((doctor) => doctor.doctorId === doctorId);
  const events = selectedDoctor ? selectedDoctor.events : [];

  return (
    <Container style={{ padding: "20px" }}>
      <HeaderDoctor doctorId={doctorId} onClick={handleClick} doctors={doctors} />
      <Calendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="ru"
        events={events}
        headerToolbar={false}
        firstDay={1}
        dayHeaderContent={(args) => {
          const day = args.date.getDay();
          const className = day === 0 ? "sunday" : "weekday";
          return (
            <span className={className} style={{ textAlign: "left", paddingLeft: "5px" }}>
              {weekdays[day]}
            </span>
          );
        }}
      />
    </Container>
  );
};

const Container = styled("div")({
  "& span": {
    fontSize: "19px",
    fontWeight: "700",
  },
  "& .sunday": {
    color: "#D80E0C",
  },
  "& .weekday": {
    color: "#5865F2",
  },

  tr: {
    height: "43px",
    "& th > div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "43px",
    },
  },

  "& .fc-daygrid-day-top": {
    flexDirection: "row",
    color: "#101010",
    fontSize: "15px",
    fontWeight: "700",
  },

  "& .fc-day-sun": {
    "& .fc-daygrid-day-top": {
      color: "#D80E0C",
    },
  },
});
