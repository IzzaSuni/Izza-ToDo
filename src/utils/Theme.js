import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const background = "#FCE7E7";
export const Black = "#303030";
export const Green = "#E7F634";
export const Disable = "#97A8A8";

export const Screensize = {
  mobile: 0,
  tablet: 900,
  laptop: 1350,
  desktop: 1700,
};

export const colors = {
  background,
  Black,
  Green,
  Disable,
};
export const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 900,
      laptop: 1350,
      desktop: 1700,
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontSize: 12,
    allVariants: {
      color: "white ",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "Poppins !important",
        },
      },
    },
  },
});

export default theme;
