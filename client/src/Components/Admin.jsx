import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React from "react";
import { api } from "../api";
import { Context } from "../Context/Context";
import { ThemedButton } from "../styles/themed";

export const Admin = () => {
  const [value, setValue] = React.useState("");
  const [err, setErr] = React.useState(null);
  const { setAdmin } = React.useContext(Context);
  return (
    <form
      style={{ width: "100%" }}
      onSubmit={(e) => {
        e.preventDefault();
        axios
          .get(`${api}/signInAdmin?identificator=${value}`)
          .then(
            (res) =>
              res.data === "err"
                ? setErr({ severity: "error", text: "Помилка" })
                : (setAdmin(res.data),
                  setErr({ severity: "success", text: "Успішно" })),
            setValue("")
          );
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "80vh" }}
      >
        <Stack sx={{ width: "40%", minWidth: 300 }} spacing={2}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Адмінка
          </Typography>
          {err && <Alert severity={err.severity}>{err.text}</Alert>}
          <TextField
            type="password"
            required
            fullWidth
            placeholder="ідентифікатор"
            onChange={(e) => setValue(e.target.value)}
          />
          <ThemedButton type="submit" variant="contained">
            God mode
          </ThemedButton>
        </Stack>
      </Grid>
    </form>
  );
};
