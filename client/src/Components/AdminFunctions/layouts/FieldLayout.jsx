import { FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import React from "react";
import { IconExplorer } from "../IconExplorer";

export const FieldLayout = ({ value, setValue }) => {
  return (
    <Stack spacing={2}>
      <TextField
        value={value?.name || ""}
        onChange={(e) => setValue({ ...value, name: e.target.value })}
        placeholder="Назва"
        required
      />
      <FormControlLabel
        control={
          <Switch
            checked={value?.url || false}
            onChange={() => setValue({ ...value, url: !value?.url })}
          />
        }
        label="Посилання"
      />
      <IconExplorer value={value} setValue={setValue} />
    </Stack>
  );
};
