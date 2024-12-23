import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  Badge,
  IconButton,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SearchInput } from "../UI/SearchInput";
import { useState } from "react";

const doctors = [
  { name: "Анара Казакбаева", specialty: "Неврология", status: "Доступно" },
  { name: "Анара Казакбаева", specialty: "Неврология", status: "Доступно" },
  { name: "Анара Казакбаева", specialty: "Неврология", status: "Недоступно" },
  { name: "Анара Казакбаева", specialty: "Неврология", status: "Доступно" },
  { name: "Анара Казакбаева", specialty: "Неврология", status: "Доступно" },
];

export const Dashboard = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  return (
    <Box sx={{ padding: "16px", backgroundColor: "#F2F2F2", minHeight: "100vh" }}>
      <SearchInput
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Введите текст для поиска"
        iconVariant="start"
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Добро пожаловать!
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" sx={{ borderRadius: "8px", fontWeight: "bold" }}>
            Создать запись
          </Button>
          <IconButton>
            <CalendarTodayIcon />
          </IconButton>
          <Badge badgeContent={2} color="error">
            <NotificationsNoneIcon />
          </Badge>
        </Box>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          {
            title: "Всего посетителей",
            value: "1200",
            subtext: "Получение данных за 1 год",
            percentage: "+2%",
          },
          {
            title: "Записаны на приём",
            value: "30",
            subtext: "Данные на завтра",
          },
          {
            title: "Всего пациентов",
            value: "900",
            subtext: "Данные за 1 декабря 2024",
          },
          {
            title: "Всего посетителей",
            value: "220/300",
            subtext: "Данные на 1 декабря 2024",
          },
        ].map((stat, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card
              sx={{
                borderRadius: "8px",
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    {stat.title}
                  </Typography>
                  <ArrowForwardIosIcon sx={{ fontSize: "16px", color: "#B2B2B2" }} />
                </Box>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {stat.subtext}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Doctors Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Доктора
        </Typography>
        <Grid container spacing={2}>
          {doctors.map((doctor, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  borderRadius: "8px",
                  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Avatar src="/doctor-avatar.jpg" alt={doctor.name} sx={{ width: 56, height: 56 }} />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {doctor.specialty}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: doctor.status === "Доступно" ? "green" : "red",
                    ml: "auto",
                  }}
                >
                  {doctor.status}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
