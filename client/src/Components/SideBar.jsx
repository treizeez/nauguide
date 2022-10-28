import { Add, ExitToApp } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/Context";
import { borderRadius } from "../styles/constants";
import { BarButton } from "../styles/layouts";
import { ThemedButton } from "../styles/themed";
import { TypeBridge } from "./AdminFunctions/bridges";
import { ToggleDarkTheme } from "./ToggleDarkTheme";

export const SideBar = () => {
  const { types, admin, setAdmin } = React.useContext(Context);
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: isMobile ? "auto" : "100%",
        width: isMobile ? "100%" : 500,
        padding: isMobile ? 0 : 10,
        position: isMobile ? "fixed" : "relative",
        backgroundColor: isMobile ? "#050517" : "inherit",
        zIndex: 1000,
        bottom: 0,
        overflow: isMobile ? "auto" : "inherit",
        whiteSpace: isMobile ? "nowrap" : "inherit",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          gap: isMobile ? 0 : "50px",
          flexDirection: isMobile ? "row" : "column",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            gap: isMobile ? 0 : "15px",
            flexDirection: isMobile ? "row" : "column",
          }}
        >
          {!isMobile && (
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography
                variant="h3"
                sx={{ letterSpacing: 15, color: "#6f7297", fontWeight: "bold" }}
              >
                НАУ
              </Typography>
              <ToggleDarkTheme />
            </Grid>
          )}
          {!isMobile && admin && (
            <Grid container alignItems="center">
              <Typography
                variant="h6"
                sx={{
                  letterSpacing: 5,
                  color: "#6f7297",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                God mode
              </Typography>
              <IconButton onClick={() => setAdmin()}>
                <ExitToApp sx={{ color: "#6f7297" }} />
              </IconButton>
            </Grid>
          )}
          <BarButton
            top
            onClick={() => navigate(`/`)}
            button={{
              id: null,
              name: "Головна",
              icon: "home_rounded_mui",
            }}
          />
          <BarButton
            top
            onClick={() => navigate(`/bookmarks`)}
            button={{
              id: "bookmarks",
              name: "Обране",
              icon: "bookmark_mui",
            }}
          />
        </div>
        <div
          spacing={2}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            gap: 2,
          }}
        >
          {!isMobile && (
            <Typography
              variant="button"
              sx={{ letterSpacing: 5, color: "#6f7297" }}
            >
              Навігація
            </Typography>
          )}
          {types &&
            [
              ...types,
              {
                id: "other",
                name: "Інше",
                icon: "more_vert_mui",
              },
            ].map((type, key) => (
              <BarButton
                onClick={() => navigate(`/${type.id}`)}
                editable
                key={key}
                icon={
                  <div
                    style={{
                      aspectRatio: "1/1",
                      width: 25,
                      borderRadius: "5px",
                      backgroundColor: type.color,
                    }}
                  ></div>
                }
                button={type}
              />
            ))}
          {isMobile && admin && (
            <IconButton onClick={() => setAdmin()}>
              <ExitToApp />
            </IconButton>
          )}
          {admin && (
            <TypeBridge
              button={
                <ThemedButton variant="contained" startIcon={<Add />}>
                  Додати
                </ThemedButton>
              }
              action="add"
            />
          )}
        </div>
      </div>
    </div>
  );
};
