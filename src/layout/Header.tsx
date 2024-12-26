import React, { useState } from "react";
import {
  FormControl,
  SelectChangeEvent,
  styled,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import UserIcon from "../assets/icons/header/user-icon.svg";
import SquarePen from "../assets/icons/header/square-pen.svg";
import DownloadIcon from "../assets/icons/header/download-icon.svg";
import RetryRefresh from "../assets/icons/header/retry-refresh.svg";
import { Button, Box, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { format, addDays, subDays } from "date-fns";
import { ru } from "date-fns/locale";
import { Select } from "../components/UI/Select";
import ArrowBlock from "../components/UI/ArrowBlock";

const options = [
  { value: "option1", label: "Опция 1" },
  { value: "option2", label: "Опция 2" },
  { value: "option3", label: "Опция 3", disabled: true },
];

export const Header = () => {
  const [weekSelectedValue, setWeekSelectedValue] = useState<string | number | undefined>("");
  const [monthSelectedValue, setMonthSelectedValue] = useState<string | number | undefined>("");

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setWeekSelectedValue(event.target.value as string | number);
  };

  const handleMonthChange = (event: SelectChangeEvent<unknown>) => {
    setMonthSelectedValue(event.target.value as string | number);
  };

  return (
    <StyledHeader>
      <FirstBlock>
        <ArrowBlock />
        <CustomDatePicker />
      </FirstBlock>

      <ActionContainer>
        <ToggleSwitch />
        <TabButton>День</TabButton>

        <FormControl sx={{ width: "125px" }}>
          <Select
            options={options}
            value={weekSelectedValue}
            onChange={handleChange}
            placeholder="Неделя"
            error={false}
          />
        </FormControl>
        <FormControl sx={{ width: "125px" }}>
          <Select
            options={options}
            value={monthSelectedValue}
            onChange={handleMonthChange}
            placeholder="Месяц"
            error={false}
          />
        </FormControl>

        <TabButton>Дата</TabButton>

        <WrapperIcon>
          <UserIcon />
        </WrapperIcon>
        <WrapperIcon>
          <SquarePen />
        </WrapperIcon>
        <WrapperIcon>
          <DownloadIcon />
        </WrapperIcon>
        <WrapperIcon>
          <RetryRefresh />
        </WrapperIcon>
      </ActionContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled("header")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "30px 22px 20px 15px",
  marginLeft: "240px",
});

const ActionContainer = styled("section")({
  display: "flex",
  gap: "10px",
  alignItems: "center",
});
const FirstBlock = styled("section")({
  display: "flex",
  gap: "20px",
  alignItems: "center",
});

const WrapperIcon = styled("span")({
  width: "44px",
  height: "46px",
  borderRadius: "16px",
  background: "#fff",
  cursor: "pointer",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const TabButton = styled("div")({
  padding: "15px 20px",
  borderRadius: "16px",
  background: "#FFFFFF",

  fontSize: "15px",
  fontWeight: "700",
  color: "#5865F2",
});

export const ToggleSwitch: React.FC = () => {
  const [selected, setSelected] = useState<string>("doctors");

  const handleChange = (event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
    if (newSelection !== null) {
      setSelected(newSelection);
    }
  };

  return (
    <ToggleButtonGroup
      value={selected}
      exclusive
      onChange={handleChange}
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        padding: "3px",
        overflow: "hidden",
        display: "flex",
        gap: "2px",
      }}
    >
      <ToggleButton
        value="doctors"
        sx={{
          textTransform: "none",

          borderRadius: "16px",
          "&.MuiButtonBase-root": {
            color: selected === "doctors" ? "#fff" : "#5865F2",
            background: selected === "doctors" ? "#5865F2" : "#fff",
            borderRadius: "16px",
            padding: "10px",
            "&:hover": {
              backgroundColor: selected === "doctors" ? "#525ee2" : "#f4f4f4",
            },
          },

          border: "none",
        }}
      >
        Врачи
      </ToggleButton>
      <ToggleButton
        value="offices"
        sx={{
          textTransform: "none",

          "&.MuiButtonBase-root": {
            color: selected === "offices" ? "#fff" : "#5865F2",
            background: selected === "offices" ? "#5865F2" : "#fff",
            padding: "10px",
            borderRadius: "16px",

            "&:hover": {
              backgroundColor: selected === "offices" ? "#525ee2" : "#f4f4f4",
            },
          },
          border: "none",
        }}
      >
        Кабинеты
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const CustomDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handlePrevDay = () => {
    setSelectedDate((prevDate) => subDays(prevDate, 1));
  };

  const handleNextDay = () => {
    setSelectedDate((prevDate) => addDays(prevDate, 1));
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={0.2}
      sx={{ backgroundColor: "#f4f4f4", borderRadius: "20px" }}
    >
      <Button
        onClick={handlePrevDay}
        sx={{
          minWidth: "40px",
          height: "44px",
          borderRadius: "16px 10px 10px 16px",
          backgroundColor: "#e0e0e0",
          "&:hover": { backgroundColor: "#d6d6d6" },
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </Button>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          padding: "3px 15px",
          height: "44px",
          backgroundColor: "#e0e0e0",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" fontSize="15px" fontWeight="700" lineHeight={1.3}>
          {selectedDate.toDateString() === new Date().toDateString()
            ? "Сегодня"
            : format(selectedDate, "eeee", { locale: ru })}
        </Typography>
        <Typography variant="body1" fontSize="15px" fontWeight="700" lineHeight={1}>
          {format(selectedDate, "d MMMM, EEE", { locale: ru })}
        </Typography>
      </Box>

      <Button
        onClick={handleNextDay}
        sx={{
          minWidth: "40px",
          height: "44px",
          borderRadius: "10px 16px 16px 10px",
          backgroundColor: "#e0e0e0",
          "&:hover": { backgroundColor: "#d6d6d6" },
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </Button>
    </Box>
  );
};

export default CustomDatePicker;
