import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  styled,
} from "@mui/material";

import LogoIcon from "../assets/icons/others/logo-icon.svg";
import HomeIcon from "../assets/icons/sidebar/home-sidebar.svg";
import CalendarMonth from "../assets/icons/sidebar/calendar-icon.svg";
import GraphIcon from "../assets/icons/sidebar/copy-document.svg";
import Groups from "../assets/icons/sidebar/patients-sidebar.svg";
import MedicalServices from "../assets/icons/sidebar/Graph-sidebar.svg";
import SendIcon from "../assets/icons/sidebar/send-sidebar.svg";
import WarehouseIcon from "../assets/icons/sidebar/Download-sidebar.svg";
import Assessment from "../assets/icons/sidebar/Graph-sidebar.svg";
import Chat from "../assets/icons/sidebar/chat-sidebar.svg";
import Settings from "../assets/icons/sidebar/settings-sidebar.svg";
import SupportAgent from "../assets/icons/sidebar/headphones-alt.svg";
import Logout from "../assets/icons/sidebar/logout-icon.svg";

const menuItems = [
  { text: "Главная", icon: <HomeIcon /> },
  { text: "Расписание", icon: <CalendarMonth /> },
  { text: "Задачи", icon: <GraphIcon /> },
  { text: "Пациенты", icon: <Groups /> },
  { text: "Доктора", icon: <MedicalServices /> },
  { text: "Рассылки", icon: <SendIcon /> },
  { text: "Склад", icon: <WarehouseIcon /> },
  { text: "Отчеты", icon: <Assessment /> },
  { text: "Чаты", icon: <Chat /> },
];

const footerItems = [
  { text: "Настройки", icon: <Settings /> },
  { text: "Поддержка", icon: <SupportAgent /> },
  { text: "Выход", icon: <Logout /> },
];

export const SideBar = () => {
  return (
    <StyledDrawer variant="permanent">
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: "10px" }}>
        <Box sx={{ pt: 3, pl: 2, mb: 1 }}>
          <LogoIcon />
        </Box>

        <StyledList>
          {menuItems.map((item, index) => (
            <StyledListItem key={index} disablePadding>
              <StyledListItemButton>
                <ListItemIcon sx={{ width: "24px", color: "#fff" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </StyledListItemButton>
            </StyledListItem>
          ))}
        </StyledList>
        <Box flexGrow={1} />
        <StyledList>
          {footerItems.map((item, index) => (
            <StyledListItem key={index} disablePadding>
              <StyledListItemButton>
                <ListItemIcon sx={{ width: "24px", color: "#fff" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </StyledListItemButton>
            </StyledListItem>
          ))}
        </StyledList>
      </Box>

      {}
    </StyledDrawer>
  );
};

const StyledDrawer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: 240,
    boxSizing: "border-box",
    backgroundColor: "#5865F2",
    color: "#fff",
    borderRadius: "35px 0px 0px 35px",
  },
});

const StyledList = styled(List)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const StyledListItem = styled(ListItem)({
  width: "165px",
  height: "36px",
  "& .MuiTypography-root": {
    fontSize: "18px",
  },

  "&:hover": {
    background: "#FFFFFF",
    width: "161px",
    height: "36px",
    borderRadius: "16px",
    "& svg path": {
      fill: "#5865F2",
    },
    "& .MuiTypography-root": {
      color: "#5865F2",
    },
  },
});

const StyledListItemButton = styled(ListItemButton)({
  display: "flex",
  gap: "10px",
  "& .MuiListItemIcon-root": {
    minWidth: "24px",
    fill: "#D8DADC",
  },
});
