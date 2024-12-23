import { createTheme, PaletteColor } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    muted?: PaletteColor;
    status?: Record<string, string>;
    state?: Record<string, string>;
  }
  interface PaletteOptions {
    muted?: Partial<PaletteColor>;
    status?: Record<string, string>;
    state?: Record<string, string>;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
      light: "#5865F2",
      dark: "#101010",
      contrastText: "#F2F2F2",
    },
    secondary: {
      main: "#949393",
      light: "#A1A0FF",
    },
    muted: {
      main: "#D8DADC",
      light: "#E8EAED",
      contrastText: "#F2F2F1",
    },
    status: {
      error: "#D80E0C",
      success: "#25BE22",
      in_proccess: "#F4CE36",
      confirmed: "#0EA5E9",
    },
    state: {
      hover: "#3745D4",
      light_hover: "#CBFFD1",
      red_hover: "#FFDCDC",
      yellow_hover: "#FFF6D2",
      purple_hover: "#E0E0FF",
    },
  },
});
