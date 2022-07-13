import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "../header/Header";
import { ReactNode } from "react";
import { darkTheme } from "../themes/dark";
import { lightTheme } from "../themes/light";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter, NextRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  const router: NextRouter = useRouter();
  const { locale } = router;
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  let currentTheme = themeMode === "light" ? lightTheme : darkTheme;
  const direction = locale === "en" ? "ltr" : "rtl";
  currentTheme = { ...currentTheme, direction };
  const theme = createTheme(currentTheme);

  const handleChangeTheme = (mode: "dark" | "light") => {
    setThemeMode(mode)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{
        marginTop: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "300px",
        ["@media (min-width: 900px)"]: {
          maxWidth: "900px",
        },
      }}
      >
        <Box
          sx={{
            width: "100%",
            marginTop: "32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header handleChangeTheme={handleChangeTheme} />
          <Box> {props.children} </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Layout;