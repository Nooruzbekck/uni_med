import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Badge,
  styled,
  Paper,
  Grid,
  Container,
} from "@mui/material";
import PlusIcon from "../../assets/icons/others/normal-plus.svg";
import NotificationIcon from "../../assets/icons/others/notification-icon.svg";
import CalendarIcon from "../../assets/icons/others/calendar.svg";
import ArrowUpIcon from "../../assets/icons/others/arrow-up-green.svg";
import ArrowRightIcon from "../../assets/icons/others/arrow-right.svg";

import { SearchInput } from "../UI/SearchInput";
import { useState } from "react";
import { Button } from "../UI/Button";
import { PatientStatistics } from "./PatientStatistics";

const doctors = [
  { name: "Анара Казакбаева", specialty: "Неврология", status: "Доступно" },
  { name: "Анара Казакбаева", specialty: "Неврология", status: "Доступно" },
  { name: "Анара Казакбаева", specialty: "Неврология", status: "Недоступно" },
  { name: "Анара Казакбаева", specialty: "Неврология", status: "Доступно" },
  { name: "Анара Казакбаева", specialty: "Неврология", status: "Доступно" },
];

export const DashboardInfo = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box
      sx={{ padding: "30px 21px", backgroundColor: "#F2F2F2", minHeight: "100vh", width: "743px" }}
    >
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
          mt: 2,
        }}
      >
        <WrapperTitle>
          <WellcomeTitle variant="h5">Добро пожаловать!</WellcomeTitle>
          <Typography variant="h6" color="#5865F2">
            Хорошего и продуктивного дня.
          </Typography>
        </WrapperTitle>
        <StyledButton>
          <StyledWrapperIcon>
            <PlusIcon />
          </StyledWrapperIcon>
          Создать запись
        </StyledButton>

        <StyledRecording>
          <CalenderContianer>
            <CalendarIcon />
          </CalenderContianer>
          <CalendarRecording>
            <Typography variant="h1">30</Typography>
            <Typography variant="body1">Записей</Typography>
          </CalendarRecording>
          <Block>
            <ArrowUpIcon />
            <Typography variant="h2">2%</Typography>
            <Typography variant="body1">Сегодня</Typography>
          </Block>
        </StyledRecording>

        <CalenderContianer>
          <Badge badgeContent={2} color="error">
            <NotificationIcon />
          </Badge>
        </CalenderContianer>
      </Box>

      <Container
        sx={{
          display: "flex",
          gap: "10px",
          "&.MuiContainer-root": {
            padding: "0",
          },
        }}
      >
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
              percentage: null,
            },
            {
              title: "Всего пациентов",
              value: "900",
              subtext: "Данные за 1 декабря 2024",
              percentage: null,
            },
            {
              title: "Всего посетителей",
              value: "220/300",
              subtext: "Данные на 1 декабря 2024",
              percentage: "+4%",
            },
          ].map((stat, index) => (
            <Grid item xs={12} md={6} key={index}>
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="#000000" fontSize="15px" fontWeight={700}>
                      {stat.title}
                    </Typography>
                    <ContainerIcon>
                      <ArrowRightIcon />
                    </ContainerIcon>
                  </Box>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}
                  >
                    <Typography variant="h4" fontWeight="bold" fontSize="37px" color="#101010">
                      {stat.value}
                    </Typography>
                    {stat.percentage && (
                      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <ArrowUpIcon />
                        <Typography
                          variant="inherit"
                          color="#000000"
                          fontSize="15px"
                          fontWeight={700}
                        >
                          {stat.percentage}
                        </Typography>
                      </div>
                    )}
                  </div>

                  <Typography variant="caption" color="#101010" fontSize="12px" fontWeight={700}>
                    {stat.subtext}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <PatientStatistics />
      </Container>
      <Paper sx={{ mb: 3, padding: "22px 27px 43px 16px", borderRadius: "24px" }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Доктора
        </Typography>
        <DoctorVisit>
          <div>
            <Typography variant="h1">15</Typography>
            <Typography variant="body1">Сегодня</Typography>
          </div>
          <div>
            <Typography variant="h1">30</Typography>
            <Typography variant="body1">Всего</Typography>
          </div>
          <div>
            <Typography variant="h1">15</Typography>
            <Typography variant="body1">Отсутствуют</Typography>
          </div>
        </DoctorVisit>
        <Box>
          {doctors.map((doctor, i) => (
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                "&.MuiPaper-root": {
                  boxShadow: "none",
                },
              }}
              key={i}
            >
              <Avatar src="/doctor-avatar.jpg" alt={doctor.name} sx={{ width: 56, height: 56 }} />
              <Box>
                <Typography variant="body1" fontWeight="400" fontSize="15px" color="#101010">
                  {doctor.name}
                </Typography>
                <Typography variant="body2" fontWeight="400" fontSize="12px" color="#949393">
                  {doctor.specialty}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: doctor.status === "Доступно" ? "#1DBD22" : "#D80E0C",
                  background: doctor.status === "Доступно" ? "#CBFFD1" : "#FFDCDC",
                  ml: "auto",
                  fontSize: "12px",
                  fontWeight: "400",
                  p: 1,
                  borderRadius: "16px",
                }}
              >
                {doctor.status}
              </Typography>
            </Card>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

const WrapperTitle = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "4px",

  "& h6": {
    fontSize: "12px",
    fontWeight: "700",
  },
  "& h5": {
    fontSize: "19px",
    fontWeight: "700",
  },
});

const WellcomeTitle = styled(Typography)({
  color: "#101010",
  fontSize: "19px",
  fontWeight: "700",
});

const StyledWrapperIcon = styled("span")({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& svg path": {
    fill: "#5865F2",
  },
  "& svg": {
    width: "18px",
    height: "18px",
  },
});

const StyledButton = styled(Button)({
  borderRadius: "24px",
});

const StyledRecording = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "15px",
});

const CalenderContianer = styled("span")({
  width: "52px",
  height: "52px",
  borderRadius: "50%",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg path": {
    fill: "#5865F2",
    stroke: "#5865F2",
  },
});

const CalendarRecording = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& h1": {
    fontSize: "29px",
    fontWeight: "700",
    color: "#101010",
  },
  "& p": {
    fontSize: "15px",
    fontWeight: "400",
    color: "#101010",
  },
});

const Block = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "4px",

  width: "112px",
  height: "26px",
  borderRadius: "24px",
  background: "#fff",

  "& h2": {
    fontSize: "15px",
    fontWeight: "700",
    color: "#101010",
  },

  "& p": {
    fontSize: "15px",
    fontWeight: "400",
    color: "#949393",
  },
});

const ContainerIcon = styled("span")({
  width: "32px",
  height: "32px",
  background: "#5865F2",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const DoctorVisit = styled("section")({
  width: "436px",
  display: "flex",
  justifyContent: "space-between",
  margin: "0 auto",
  marginBottom: "30px",

  "& > div": {
    textAlign: "center",
  },

  "& h1": {
    color: "#5865F2",
    fontSize: "46px",
    fontWeight: "700",
  },
  "& p": {
    color: "#949393",
    fontSize: "15px",
    fontWeight: "400",
  },
});
