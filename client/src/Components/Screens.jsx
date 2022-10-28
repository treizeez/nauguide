import { Add, SettingsRounded } from "@mui/icons-material";
import { Alert, AlertTitle, Grid, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Context/Context";
import { UserContext } from "../Context/UserContext";
import { borderRadius } from "../styles/constants";
import { Card, ScreenContext, SearchField } from "../styles/layouts";
import { Action } from "./AdminFunctions/Action";
import { TypeBridge } from "./AdminFunctions/bridges";
import { DataLayout } from "./AdminFunctions/layouts/DataLayout";

export const Screens = () => {
  const { id } = useParams();
  const { types, state, setState, admin } = React.useContext(Context);
  const { theme } = React.useContext(UserContext);
  const typeItem = types && types.find((item) => item?.id === id);
  const [value, setValue] = React.useState("");
  const filtered =
    state &&
    state
      .filter((card) =>
        typeItem ? card.type === typeItem?.id : card.type === "other"
      )
      .filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));

  return (
    filtered && (
      <ScreenContext
        top={<SearchField onChange={(e) => setValue(e.target.value)} />}
        header={
          <Grid container flexWrap="nowrap">
            <Grid item>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: theme === "light" ? "#000" : "#fff",
                  width: "100%",
                }}
              >
                {typeItem?.name || "Інше"}
              </Typography>
            </Grid>
            <Grid flexWrap="nowrap" alignItems="center">
              {admin && (
                <>
                  {id !== "other" && (
                    <TypeBridge
                      action="edit"
                      button={
                        <IconButton>
                          <SettingsRounded />
                        </IconButton>
                      }
                      obj={typeItem}
                    />
                  )}
                  <Action
                    state={state}
                    setState={setState}
                    button={
                      <IconButton>
                        <Add />
                      </IconButton>
                    }
                    obj={{
                      type: "",
                      name: "",
                      source: "",
                      home: false,
                      url: "",
                      fields: [],
                    }}
                    title="Додати нове посилання"
                    description="Заповніть необхідні поля, щоб додати нове посилання"
                    layout={<DataLayout />}
                    link="datas"
                    type="add"
                  />
                </>
              )}
            </Grid>
          </Grid>
        }
      >
        {typeItem?.note && (
          <Alert severity="info" sx={{ borderRadius: borderRadius }}>
            <AlertTitle>Примітка</AlertTitle>
            {typeItem?.note}
          </Alert>
        )}
        <Grid container sx={{ gap: 2 }}>
          {filtered &&
            filtered.map((card) => <Card key={card._id} card={card} />)}
        </Grid>
      </ScreenContext>
    )
  );
};
