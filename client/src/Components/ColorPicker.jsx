import { CheckCircle } from "@mui/icons-material";
import { Grid, Slider, Typography } from "@mui/material";
import {
  amber,
  blue,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import { Stack } from "@mui/system";
import React from "react";

export const ColorPicker = ({ value, setValue }) => {
  const [val, setVal] = React.useState(300);

  return (
    <Stack spacing={2}>
      <Typography variant="button">Колір</Typography>
      <Grid
        container
        orientation="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle2">Насиченість кольору</Typography>
        <Slider
          value={val}
          onChange={(e, newValue) => setVal(newValue)}
          min={100}
          max={900}
          sx={{ width: "100%" }}
          step={100}
          marks
        />
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          {val}
        </Typography>
      </Grid>
      <Grid container sx={{ gap: 1 }}>
        {[
          red,
          pink,
          purple,
          deepPurple,
          indigo,
          blue,
          lightBlue,
          cyan,
          teal,
          green,
          lightGreen,
          lime,
          yellow,
          amber,
          orange,
          deepOrange,
        ].map((color, key) => {
          return (
            <div
              key={key}
              onClick={() => setValue({ ...value, color: color[val] })}
              style={{
                aspectRatio: "1/1",
                width: 50,
                backgroundColor: color[val],
                display: "flex",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                "&:active": {
                  transform: "scale(0.5)",
                },
              }}
            >
              {color[val] === value?.color && <CheckCircle />}
            </div>
          );
        })}
      </Grid>
    </Stack>
  );
};
