import { FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import React from "react";
import { ColorPicker } from "../../ColorPicker";
import { IconExplorer } from "../IconExplorer";

export const SocialLayout = ({ value, setValue }) => {
  return (
    <Stack spacing={5}>
      <TextField
        value={value?.name || ""}
        onChange={(e) => setValue({ ...value, name: e.target.value })}
        placeholder="Назва"
        required
      />
      <ColorPicker value={value} setValue={setValue} />
      <IconExplorer value={value} setValue={setValue} />
    </Stack>
  );
};
