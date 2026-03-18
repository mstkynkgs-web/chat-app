import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#006bd6",
        },
        secondary: {
            main: "#f50057",
        },
        background: {
            default: "#f1f3f7",
        },
    },
    typography: {
        fontFamily: "var(--font-roboto), sans-serif",
    },
});

export default theme;