import React, { useState, useEffect } from "react";
import { Box, Grid, styled, Typography } from "@mui/material";
import { format, addDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import { doctors } from "../../utils/constants/doctors";
import { HeaderDoctor } from "./HeaderDoctor";
import PlayIcon from "../../assets/icons/others/play-icon.svg";
import CompletedIcon from "../../assets/icons/status/completed-icon.svg";
import CanceledIcon from "../../assets/icons/status/canceled-icon.svg";
import PendingIcon from "../../assets/icons/status/pending-icon.svg";
import NotConfirmedIcon from "../../assets/icons/status/not-confirmed-icon.svg";
import OptionIcon from "../../assets/icons/others/options-icon.svg";
import { DaysOfWeekCalendar } from "./DaysOfWeekCalender";

type StatusStyles = (status: string, info?: string) => string;

const CustomStatusStyles: StatusStyles = (status, info) => {
  switch (status) {
    case "COMPLETED": {
      return info ? "#25BE22" : "#CBFFD1";
    }
    case "CANCELED": {
      return info ? "#D80E0C" : "#FFDCDC";
    }
    case "IN_PROCESSING": {
      return info ? "#F4CE36" : "#FFF6D2";
    }
    case "NOT_CONFIRMED": {
      return info ? "#A1A0FF" : "#E0E0FF";
    }
    case "NOT_WORKED": {
      return info ? "#F2F2F1" : "#F2F2F1";
    }
    default: {
      return "#FFFFFF";
    }
  }
};

const hours: string[] = Array.from({ length: 16 }, (_, i) => `${i + 9}:00`).flatMap((hour) => [
  hour,
  hour.replace(":00", ":30"),
]);

const roundTimeToNextInterval = (time: string): string => {
  const [hour, minute] = time.split(":").map(Number);
  const totalMinutes = hour * 60 + minute;

  const roundedMinutes = Math.ceil(totalMinutes / 30) * 30;

  const roundedHour = Math.floor(roundedMinutes / 60);
  const roundedMinute = roundedMinutes % 60;

  return `${roundedHour.toString().padStart(2, "0")}:${roundedMinute.toString().padStart(2, "0")}`;
};

const calculateEventPosition = (startTime: string, duration: number) => {
  const startDate = new Date(startTime);
  const hoursFromStart = startDate.getHours() - 9;
  const minutes = startDate.getMinutes();

  const top = hoursFromStart * 60 + minutes;
  const height = (duration / 60) * 60;

  return { top, height };
};
const VISIBLE_COUNT = 7;

export const CalendarByWeek: React.FC = () => {
  const [doctorId, setDoctorId] = useState<number | undefined>(undefined);
  const [currentHour, setCurrentHour] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentDoctors = doctors.slice(currentIndex, currentIndex + VISIBLE_COUNT);

  useEffect(() => {
    const updateCurrentHour = () => {
      const now = format(new Date(), "HH:mm");
      setCurrentHour(roundTimeToNextInterval(now));
    };

    updateCurrentHour();
    const interval = setInterval(updateCurrentHour, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (id: number): void => {
    setDoctorId(id);
  };

  const currentDate = new Date();
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(currentDate, i));

  const selectedDoctor = currentDoctors.find((doctor) => doctor.doctorId === doctorId);
  const doctorEvents = selectedDoctor?.events || [];

  return (
    <Box
      sx={{
        background: "#fff",
        maxWidth: "82vw",
        borderRadius: "24px",
        padding: "9px",
        margin: "0 auto",
        overflowY: "hidden",
      }}
    >
      <HeaderDoctor
        onClick={handleClick}
        doctorId={doctorId}
        doctors={doctors}
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
      />
      <DaysOfWeekCalendar />
      <Box display="flex">
        <Grid container justifyContent="space-between">
          <Grid item style={{ textAlign: "center" }}>
            {hours.map((hour, index) => (
              <StyledHour
                key={index}
                variant="body2"
                style={{
                  height: "30px",
                  width: "50px",
                  borderRadius: "4px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {hour} {currentHour === hour ? <PlayIcon /> : null}
              </StyledHour>
            ))}
          </Grid>

          <Grid item xs={11}>
            <Grid container sx={{ display: "flex", gap: "10px" }}>
              {weekDates.map((date, colIndex) => {
                const columnEvents = doctorEvents.filter((event) => {
                  const eventDate = format(new Date(event.startTime), "yyyy-MM-dd");
                  return eventDate === format(date, "yyyy-MM-dd");
                });

                return (
                  <Grid item xs key={colIndex} style={{ position: "relative" }}>
                    {hours.map((hour, rowIndex) => {
                      const eventsForCurrentHour = columnEvents.filter((event) => {
                        const eventTime = format(
                          toZonedTime(new Date(event.startTime), "UTC"),
                          "HH:mm",
                        );
                        return eventTime === hour;
                      });

                      return (
                        <Box
                          key={rowIndex}
                          sx={{
                            borderTop:
                              rowIndex % 2 === 0 ? "1px solid #e0e0e0" : "0.5px solid #e0e0e0",
                            height: "30px",
                            borderBottom:
                              currentHour === hour ? "1px solid #5865F2" : "0.5px solid #e0e0e0",
                            position: "relative",
                          }}
                        >
                          {colIndex === 0 && currentHour === hour ? (
                            <HourTd>{currentHour}</HourTd>
                          ) : null}

                          {eventsForCurrentHour.map((event, eventIndex) => {
                            const { height } = calculateEventPosition(
                              event.startTime,
                              event.services[0].duration,
                            );
                            const currentHeight = height < 30 ? 30 : height;

                            return (
                              <Box
                                key={eventIndex}
                                sx={{
                                  position: "absolute",
                                  width: "100%",
                                  height: `${currentHeight}px`,
                                  zIndex: 99,
                                  background: CustomStatusStyles(event.appointmentStatus),
                                  borderRadius: "8px",
                                  padding: "5px 3px 3px 6px",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}
                              >
                                {event.appointmentStatus !== "NOT_WORKED" ? (
                                  <>
                                    <section
                                      style={{ display: "flex", justifyContent: "space-between" }}
                                    >
                                      <div style={{ display: "flex", gap: "2px" }}>
                                        {event.appointmentStatus === "COMPLETED" ? (
                                          <CompletedIcon />
                                        ) : event.appointmentStatus === "CANCELED" ? (
                                          <CanceledIcon />
                                        ) : event.appointmentStatus === "IN_PROCESSING" ? (
                                          <PendingIcon />
                                        ) : event.appointmentStatus === "NOT_CONFIRMED" ? (
                                          <NotConfirmedIcon />
                                        ) : null}
                                        <div
                                          style={
                                            currentHeight === 30
                                              ? {
                                                  display: "flex",
                                                  flexDirection: "row-reverse",
                                                  alignItems: "center",
                                                  gap: "2px",
                                                }
                                              : {}
                                          }
                                        >
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              fontSize: currentHeight === 30 ? "10px" : "12px",
                                              fontWeight: "400",
                                              lineHeight: "12px",
                                              color: "#101010",
                                              width: currentHeight === 30 ? "42px" : "100px",
                                              whiteSpace: "nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                            }}
                                          >
                                            Консультация
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              fontSize: currentHeight === 30 ? "10px" : "12px",
                                              fontWeight: "400",
                                              color: "#949393",
                                            }}
                                          >
                                            {format(
                                              toZonedTime(new Date(event.startTime), "UTC"),
                                              "HH:mm",
                                            )}
                                            -
                                            {format(
                                              toZonedTime(new Date(event.endTime), "UTC"),
                                              "HH:mm",
                                            )}
                                          </Typography>
                                        </div>
                                      </div>
                                      <span style={{ cursor: "pointer" }}>
                                        <OptionIcon />
                                      </span>
                                    </section>
                                    {currentHeight === 30 ? null : (
                                      <section
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            background: "#FFFFFF",
                                            borderRadius: "24px",
                                            padding: "2px 4px",
                                            width: "fit-content",
                                          }}
                                        >
                                          <div
                                            style={{
                                              borderRadius: "50%",
                                              width: "7px",
                                              height: "7px",
                                              background: CustomStatusStyles(
                                                event.appointmentStatus,
                                                "info",
                                              ),
                                            }}
                                          />
                                          <Typography
                                            variant="body1"
                                            fontSize="10px"
                                            fontWeight={400}
                                          >
                                            Завершен
                                          </Typography>
                                        </div>
                                      </section>
                                    )}
                                  </>
                                ) : (
                                  <div
                                    style={{
                                      height: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Typography
                                      variant="h3"
                                      fontSize="19px"
                                      fontWeight={400}
                                      color="#000000"
                                    >
                                      Не работает
                                    </Typography>
                                  </div>
                                )}
                              </Box>
                            );
                          })}
                        </Box>
                      );
                    })}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item style={{ textAlign: "center", width: "40px" }}>
            {hours.map((hour, index) => (
              <Typography
                key={index}
                variant="body2"
                style={{
                  height: "30px",
                  borderRadius: "4px",
                  textAlign: "center",
                }}
              >
                {hour}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const StyledHour = styled(Typography)({
  "& svg": {
    position: "absolute",
    bottom: 7,
    right: -5,
  },
});

const HourTd = styled("span")({
  fontSize: "12px",
  fontWeight: "700",
  color: "#5865F2",
  paddingLeft: "10px",
});
