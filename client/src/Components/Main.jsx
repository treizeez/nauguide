import { ArrowForward, ArrowRight } from "@mui/icons-material";
import {
  Button,
  Chip,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Stack } from "@mui/system";
import React from "react";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/Context";
import { Card, ScreenContext } from "../styles/layouts";
import { IconBridge } from "./IconBridge";
import { ToggleDarkTheme } from "./ToggleDarkTheme";

export const Main = () => {
  const { state, setState, types, setAdmin, socials } =
    React.useContext(Context);
  const navigate = useNavigate();

  const [params, setParams] = React.useState([]);

  return (
    <ScreenContext
      header={
        isMobile && (
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Головна
            </Typography>
            <ToggleDarkTheme />
          </Grid>
        )
      }
      title={!isMobile && "Головна"}
    >
      <Grid
        container
        flexWrap="nowrap"
        sx={{
          gap: 1,
          overflow: isMobile ? "auto" : "inherit",
          whiteSpace: isMobile ? "nowrap" : "inherit",
        }}
      >
        {socials?.map((social) => (
          <Chip
            icon={<IconBridge icon={social.icon} />}
            key={social._id}
            label={social.name}
            variant={params.includes(social._id) ? "contained" : "outlined"}
            onClick={() =>
              setParams(() => {
                const copy = [...params];
                if (copy.includes(social._id)) {
                  return copy.filter((i) => i !== social._id);
                }
                copy.push(social._id);
                return copy;
              })
            }
          />
        ))}
      </Grid>
      {types &&
        [...types, { id: "other", name: "Інше", _id: "other" }]?.map((type) => {
          const filtered = state
            ?.filter((card) => card.type == type.id && card.home)
            .filter((card) =>
              params.length > 0 ? params.includes(card.source) : card
            );
          return (
            filtered?.length > 0 && (
              <Stack key={type._id} spacing={2}>
                <Grid container alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {type.name}
                  </Typography>
                  <IconButton onClick={() => navigate(type.id)}>
                    <ArrowForward />
                  </IconButton>
                </Grid>
                {filtered.map((card) => (
                  <Card card={card} key={card._id} />
                ))}
              </Stack>
            )
          );
        })}
    </ScreenContext>
  );
};
