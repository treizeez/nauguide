import { createTheme, Grid, ThemeProvider } from "@mui/material";
import React from "react";
import { isMobile } from "react-device-detect";
import { Route, Routes, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { globalStyles } from "../styles/globalStyles";
import { ScreenLayout } from "../styles/layouts";
import { Admin } from "./Admin";
import { BookMarks } from "./Bookmarks";
import { Main } from "./Main";
import { Screens } from "./Screens";
import { SideBar } from "./SideBar";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const Navigation = () => {
  const { theme } = React.useContext(UserContext);
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: theme,
        },
      })}
    >
      <style>{globalStyles(theme)}</style>
      <Grid
        container
        alignItems="center"
        flexWrap={isMobile ? "unset" : "nowrap"}
        flexDirection={isMobile ? "column-reverse" : "unset"}
        style={{
          width: "100%",
          height: isMobile ? "auto" : "100vh",
          padding: isMobile ? 0 : 25,
          paddingBottom: isMobile ? "15%" : 0,
          gap: 10,
        }}
      >
        <ScrollToTop />
        <SideBar />
        <ScreenLayout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/bookmarks" element={<BookMarks />} />
            <Route path="/:id" element={<Screens />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </ScreenLayout>
      </Grid>
    </ThemeProvider>
  );
};
