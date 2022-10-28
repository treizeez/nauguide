import { Add, DeleteForever, SettingsRounded } from "@mui/icons-material";
import {
  Checkbox,
  Divider,
  Grid,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Context } from "../../../Context/Context";
import { DialogLayout } from "../../../styles/layouts";
import { ThemedButton } from "../../../styles/themed";
import { IconBridge } from "../../IconBridge";
import { FieldBridge } from "../bridges";
import { IconExplorer } from "../IconExplorer";

const OpenIconExplorer = ({ value, setValue }) => {
  const [open, setOpen] = React.useState(false);

  const handleDialog = () => setOpen(!open);

  return (
    <>
      <ThemedButton variant="outlined" onClick={handleDialog}>
        Обрати іконку
      </ThemedButton>
      <DialogLayout
        open={open}
        handleDialog={handleDialog}
        title="Обрати іконку для категорії"
      >
        <IconExplorer value={value} setValue={setValue} />
      </DialogLayout>
    </>
  );
};

export const TypeLayout = ({ setValue, value, forbidId }) => {
  const { fields } = React.useContext(Context);

  return (
    <Stack spacing={2}>
      <OpenIconExplorer value={value} setValue={setValue} />
      <TextField
        value={value?.note || ""}
        margin="dense"
        label="Примітка"
        fullWidth
        variant="standard"
        onChange={(e) => setValue({ ...value, note: e.target.value })}
      />
      <TextField
        value={value?.name || ""}
        margin="dense"
        label="Назва"
        fullWidth
        variant="standard"
        required
        onChange={(e) => setValue({ ...value, name: e.target.value })}
      />
      {!forbidId && (
        <TextField
          value={value?.id || ""}
          margin="dense"
          label="ID"
          placeholder="Наприклад: faculties"
          fullWidth
          variant="standard"
          required
          onChange={(e) => setValue({ ...value, id: e.target.value })}
        />
      )}
      <Typography variant="button">Поля</Typography>
      <Stack spacing={2}>
        {fields?.map((field) => (
          <React.Fragment key={field._id}>
            <Grid
              container
              flexWrap="nowrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid container alignItems="center" sx={{ gap: 2 }}>
                <IconBridge icon={field.icon} />
                {field.name}
              </Grid>
              <Grid container justifyContent="flex-end">
                <FieldBridge
                  action="delete"
                  button={
                    <IconButton>
                      <DeleteForever />
                    </IconButton>
                  }
                  obj={field}
                />
                <FieldBridge
                  action="edit"
                  button={
                    <IconButton>
                      <SettingsRounded />
                    </IconButton>
                  }
                  obj={field}
                />
                <Checkbox
                  onChange={() =>
                    setValue(() => {
                      const copy = Object.assign({}, value);
                      if (!copy.fields) {
                        copy.fields = [];
                      }
                      if (copy.fields.includes(field._id)) {
                        copy.fields = copy.fields.filter(
                          (item) => item !== field._id
                        );
                      } else {
                        copy.fields.push(field._id);
                      }
                      return copy;
                    })
                  }
                  checked={value?.fields?.includes(field._id) ? true : false}
                />
              </Grid>
            </Grid>
            <Divider />
          </React.Fragment>
        ))}
        <FieldBridge
          action="add"
          button={
            <ThemedButton startIcon={<Add />}>Додати нове поле</ThemedButton>
          }
        />
      </Stack>
    </Stack>
  );
};
