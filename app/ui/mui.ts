import { createTheme } from "@mui/material";
import { golosText } from "./fonts";

export const theme = createTheme({
  typography: {
    fontFamily: golosText.style.fontFamily,
    fontSize: 56 / 3,
    allVariants: {
      textTransform: "none",
    },
  },
});
