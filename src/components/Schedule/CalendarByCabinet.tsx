import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Avatar, Typography } from "@mui/material";
import FeMaleDoctor from "../../assets/images/female-doctor.png";
import MaleDoctor from "../../assets/images/male-doctor.png";
import ArrowBlock from "../UI/ArrowBlock";
import { EventContentArg } from "@fullcalendar/core";

import CanceledIcon from "../../assets/icons/status/canceled-icon.svg";

interface Doctor {
  name: string;
  specialty: string;
  schedule: string;
  color: string;
  avatar: string;
  doctorId: number;
  events?: {
    title: string;
    start: string;
    end: string;
    status: string;
  }[];
}

const doctors: Doctor[] = [
  {
    name: "Анеля Торалиева",
    specialty: "Терапевт",
    schedule: "10:00 - 20:00",
    color: "#5865F2",
    avatar: FeMaleDoctor,
    doctorId: 1,
    events: [
      {
        title: "Прием Анели Торалиевой",
        start: "2024-12-24T09:30:00",
        end: "2024-12-24T10:00:00",
        status: "not-confirmed",
      },
      {
        title: "Прием Максата Аманова",
        start: "2024-12-25T12:00:00",
        end: "2024-12-25T13:30:00",
        status: "completed",
      },
      {
        title: "Прием Алтынбека Жумадил уулу",
        start: "2024-12-29T15:00:00",
        end: "2024-12-29T16:00:00",
        status: "canceled",
      },
    ],
  },
  {
    name: "Максат Аманов",
    specialty: "Терапевт",
    schedule: "10:00 - 20:00",
    color: "#25BE22",
    avatar: MaleDoctor,
    doctorId: 2,
  },
  {
    name: "Алтынбек Жумадил уулу",
    specialty: "Терапевт",
    schedule: "10:00 - 20:00",
    color: "#D80E0C",
    avatar: MaleDoctor,
    doctorId: 3,
    events: [
      {
        title: "Прием Анели Торалиевой",
        start: "2024-12-25T10:00:00",
        end: "2024-12-25T11:00:00",
        status: "not-confirmed",
      },
    ],
  },
  {
    name: "Алтынбек Жумадил уулу",
    specialty: "Терапевт",
    schedule: "10:00 - 20:00",
    color: "#D80E0C",
    avatar: MaleDoctor,
    doctorId: 4,
  },
  {
    name: "Алтынбек Жумадил уулу",
    specialty: "Терапевт",
    schedule: "10:00 - 20:00",
    color: "#D80E0C",
    avatar: MaleDoctor,
    doctorId: 5,
    events: [
      {
        title: "Прием Анели Торалиевой",
        start: "2024-12-24T10:00:00",
        end: "2024-12-24T11:00:00",
        status: "not-confirmed",
      },
      {
        title: "Прием Максата Аманова",
        start: "2024-12-25T12:00:00",
        end: "2024-12-25T13:30:00",
        status: "completed",
      },
      {
        title: "Прием Алтынбека Жумадил уулу",
        start: "2024-12-25T15:00:00",
        end: "2024-12-25T16:00:00",
        status: "canceled",
      },
    ],
  },
  {
    name: "Алтынбек Жумадил уулу",
    specialty: "Терапевт",
    schedule: "10:00 - 20:00",
    color: "#D80E0C",
    avatar: MaleDoctor,
    doctorId: 6,
  },
  {
    name: "Алтынбек Жумадил уулу",
    specialty: "Терапевт",
    schedule: "10:00 - 20:00",
    color: "#D80E0C",
    avatar: MaleDoctor,
    doctorId: 7,
  },
];

export const Schedule: React.FC = () => {
  const [doctorId, setDoctorId] = useState<number>();

  const handleClick = (id: number) => {
    setDoctorId(id);
  };
  const selectedDoctor = doctors.find((doctor) => doctor.doctorId === doctorId);
  const events = selectedDoctor ? selectedDoctor.events : [];

  const eventContent = ({ event }: EventContentArg) => {
    const status = event.extendedProps.status;
    let backgroundColor = "";
    let icon: React.ReactNode = "";

    switch (status) {
      case "completed":
        backgroundColor = "#D80E0C";
        icon = "✔️";
        break;
      case "not-confirmed":
        backgroundColor = "#5865F2";
        icon = "❓";
        break;
      case "canceled":
        backgroundColor = "#25BE22";
        icon = <CanceledIcon />; // JSX element can now be assigned
        break;
      default:
        backgroundColor = "#F5F5F5";
        icon = "🔘";
    }

    return (
      <Box
        sx={{
          backgroundColor,
          padding: "5px",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", gap: "3.25", alignItems: "center" }}>
          {icon}
          <span>Консультация</span>
        </div>
        <Typography variant="inherit" color="#949393">
          #949393
        </Typography>
        <div>
          <div>
            <div
              style={{
                width: "7px",
                height: "7px",
                background: backgroundColor,
                borderRadius: "50%",
              }}
            >
              {" "}
            </div>
            <p>Завершен</p>
          </div>
        </div>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        background: "#fff",
        maxWidth: "82vw",
        borderRadius: "24px",
        padding: "20px",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "5px",
          marginBottom: "20px",
        }}
      >
        <ArrowBlock rotate />
        {doctors.map((doctor) => (
          <Box
            key={doctor.doctorId}
            onClick={() => handleClick(doctor.doctorId)}
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              width: "146px",
              borderRadius: "16px",
              background: doctor.doctorId === doctorId ? "#E0E0FF" : "",
              cursor: "pointer",
            }}
          >
            <Avatar alt={doctor.name} src={doctor.avatar} sx={{ width: "54px", height: "54px" }} />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: doctor.color,
                  fontWeight: "500",
                  fontSize: "17px",
                  lineHeight: "18px",
                }}
              >
                {doctor.name}
              </Typography>
              <Typography variant="body2" color="#949393" fontSize="12px" fontWeight={400}>
                {doctor.specialty}
              </Typography>
              <Typography variant="body2" color="#101010">
                {doctor.schedule}
              </Typography>
            </Box>
          </Box>
        ))}
        <ArrowBlock />
      </Box>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={false}
        allDaySlot={false}
        events={events}
        editable={true}
        selectable={true}
        dayMaxEvents={true}
        locale="ru"
        firstDay={1}
        slotMinTime="09:00:00"
        slotMaxTime="21:00:00"
        eventContent={eventContent} // Применяем кастомизированное содержимое событий
        dayHeaderContent={({ date }) => {
          const days = [
            "Воскресенье",
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
          ];
          const dayName = days[date.getDay()];
          const formattedDate = date.toLocaleDateString("ru", {
            day: "numeric",
            month: "long",
          });

          return (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  color: dayName === "Воскресенье" ? "#D80E0C" : "#5865F2",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                {dayName}
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#000",
                }}
              >
                {formattedDate}
              </div>
            </div>
          );
        }}
      />
    </Box>
  );
};
