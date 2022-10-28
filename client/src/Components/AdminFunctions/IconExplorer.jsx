import { Grid, Icon, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Stack } from "@mui/system";
import React from "react";
import icons from "../../assets/icons.json";
import fontAwesome from "../../assets/fontAwesome.json";
import { IconBridge } from "../IconBridge";

const getIcons = () => {
  const arrOficons = [];
  fontAwesome.map((icon) =>
    arrOficons.push({ ligature: `fa-brands fa-${icon}` })
  );
  icons.categories.map((category) =>
    category.icons.map((icon) =>
      arrOficons.push({ ligature: `${icon.ligature}_mui` })
    )
  );
  return arrOficons.concat([{ ligature: "telegram" }]);
};

export const IconExplorer = ({ value, setValue }) => {
  const [search, setSearch] = React.useState("");

  const arrOfIcons = getIcons();

  return (
    <Stack spacing={4}>
      <Typography variant="button">Оберіть іконку</Typography>
      <TextField
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Пошук іконки (англ)"
      />
      <Grid container sx={{ gap: 6 }}>
        {arrOfIcons
          .filter((icon) => icon.ligature.includes(search.toLowerCase()))
          .map((icon, key) => (
            <div
              key={key}
              onClick={() => setValue({ ...value, icon: icon.ligature })}
              style={{
                padding: 5,
                borderRadius: 5,
                cursor: "pointer",
                backgroundColor:
                  value?.icon === icon.ligature ? blue[500] : "inherit",
              }}
            >
              <IconBridge icon={icon.ligature} />
            </div>
          ))}
      </Grid>
    </Stack>
  );
};
