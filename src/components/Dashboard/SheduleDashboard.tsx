import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  SelectChangeEvent,
} from "@mui/material";
import CheckCircleIcon from "../../assets/icons/dashboard/success-dashboard.svg";
import CancelIcon from "../../assets/icons/dashboard/rejected-dashboard.svg";
import HourglassEmptyIcon from "../../assets/icons/dashboard/pending-dashboard.svg";

import { SelectDashboard } from "./SelectDashboard";
import Calendar from "./CalendarDashboard";

const appointments = [
  { id: 1, name: "Айдана Искадерова", time: "10:00", status: "success" },
  { id: 2, name: "Айдана Искадерова", time: "10:00", status: "error" },
  { id: 3, name: "Айдана Искадерова", time: "10:00", status: "success" },
  { id: 4, name: "Айдана Искадерова", time: "10:00", status: "success" },
  { id: 5, name: "Айдана Искадерова", time: "10:00", status: "error" },
  { id: 6, name: "Айдана Искадерова", time: "10:00", status: "pending" },
  { id: 7, name: "Айдана Искадерова", time: "10:00", status: "pending" },
  { id: 8, name: "Айдана Искадерова", time: "10:00", status: "error" },
];

const doctors = [
  {
    label: "Айдана Искадерова",
    value: "10:00",
    doctorImage:
      "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww",
  },
  { label: "Айдана Искадерова", value: "10:00", doctorImage: "error" },
  { label: "Айдана Искадерова", value: "10:00", doctorImage: "success" },
  { label: "Айдана Искадерова", value: "10:00", doctorImage: "success" },
  { label: "Айдана Искадерова", value: "10:00", doctorImage: "error" },
  { label: "Айдана Искадерова", value: "10:00", doctorImage: "pending" },
  { label: "Айдана Искадерова", value: "10:00", doctorImage: "pending" },
  { label: "Айдана Искадерова", value: "10:00", doctorImage: "error" },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
      return <CheckCircleIcon />;
    case "error":
      return <CancelIcon />;
    case "pending":
      return <HourglassEmptyIcon />;
    default:
      return null;
  }
};

export const ScheduleDashboard: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string | number | undefined>(undefined);

  const handleSelectChange = (e: SelectChangeEvent<unknown>) => {
    setSelectedValue(e.target.value as string | number);
  };

  return (
    <Box p={3} height="100vh" maxWidth="450px">
      <SelectDashboard options={doctors} value={selectedValue} onChange={handleSelectChange} />
      <Calendar />

      <Grid
        container
        spacing={2}
        sx={{
          "&.MuiGrid-root": {
            paddingTop: "16px",
          },
        }}
      >
        {appointments.map((appointment) => (
          <Grid
            item
            xs={12}
            key={appointment.id}
            sx={{
              "& .MuiPaper-root": { boxShadow: "none" },
              "&.MuiGrid-root": {
                padding: "0",
              },
            }}
          >
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ mr: 2 }}>A</Avatar>
                  <Box>
                    <Typography variant="subtitle1">{appointment.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Консультация
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      mr: 2,
                      border: "1px solid #949393",
                      borderRadius: "10px",
                      color: "#101010",
                      fontSize: "19px",
                      fontWeight: "400",
                      p: 0,
                    }}
                  >
                    {appointment.time}
                  </Button>
                  {getStatusIcon(appointment.status)}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
