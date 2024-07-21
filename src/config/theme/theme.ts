import { createTheme } from "@mui/material/styles";

export const reds = {
  100: "#FFCDD2",
  200: "#F44336",
  300: "#B71C1C",
};

export const purples = {
  300: "#7545EA",
  200: "#A70DF2",
  100: "#B79EF6",
};

export const blues = {
  100: "#A1F9FF",
  200: "#3E83E1",
  300: "#1EA9DB",
  400: "#01CAD7",
  500: "#16295b",
};

export const greyIsh = {
  400: "#0C123A",
  300: "#303045",
  200: "#9494A9",
  100: "#FFFFFF",
};

export const gradients = {
  full: "linear-gradient(90deg, #B100F3 0%, #00C9D6 100%);",
  menu: "linear-gradient(180deg, rgba(157, 62, 244, 0.5) 0%, #5892FD 100%);",
  purples: "linear-gradient(90deg, #A70DF2 0%, #7545EA 100%);",
  purplesDark:
    "linear-gradient(90deg, rgba(167, 13, 242, 0.4) 0%, rgba(117, 69, 234, 0.4) 100%);",
};

export const lightPaletteText = {
  primary: greyIsh[200],
  secondary: greyIsh[400],
  disabled: greyIsh[200],
};

export const darkPaletteText = {
  primary: purples[200],
  secondary: blues[200],
  disabled: greyIsh[300],
  highlight: greyIsh[100],
  contrast: greyIsh[400],
  bluelights: blues[100],
};

const theme = createTheme({
  palette: {
    mode: "dark",
    divider: greyIsh[100],
    text: darkPaletteText,
    common: {
      black: greyIsh[400],
      white: greyIsh[100],
    },
    primary: {
      light: purples[100],
      main: purples[200],
      dark: purples[300],
      contrastText: lightPaletteText.primary,
    },
    secondary: {
      light: blues[400],
      main: blues[200],
      dark: greyIsh[400],
      contrastText: lightPaletteText.primary,
    },
    background: {
      paper: greyIsh[200],
      default: greyIsh[100],
    },
    error: {
      light: reds[100],
      main: reds[200],
      dark: reds[300],
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        body2: {
          fontWeight: 300,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "text",
        color: "inherit",
      },
      styleOverrides: {
        root: {
          margin: "inherit",
        },
      },
    },
  },
});

export default theme;
