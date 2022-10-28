import { Add, DeleteForever, Settings } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../Context/Context";
import { ThemedButton } from "../../../styles/themed";
import { IconBridge } from "../../IconBridge";
import { Action } from "../Action";
import { FieldBridge } from "../bridges";
import { SocialLayout } from "./SocialLayout";

const TextFields = ({ field, setValue, value }) => {
  const [disabled, setDisabled] = React.useState(true);
  const exactField = value?.fields?.find((i) => i.id === field._id);

  React.useEffect(() => {
    const found = value?.fields?.find((i) => i.id === field._id);

    if (found && found.value !== "") {
      setDisabled(false);
    }
  }, [value]);

  return (
    <Grid container alignItems="center" flexWrap="nowrap" sx={{ gap: 2 }}>
      <TextField
        margin="dense"
        value={exactField?.value}
        label={field.name}
        InputProps={{
          startAdornment: <IconBridge icon={field.icon} />,
        }}
        onChange={(e) =>
          setValue(() => {
            const text = e.target.value;
            const copy = Object.assign({}, value);
            const found = copy?.fields?.find((i) => i.id === field._id);
            if (text !== "" && !found) {
              copy.fields.push({
                id: field._id,
                value: text,
                url: "",
              });
              return copy;
            }

            if (text === "") {
              copy.fields = copy?.fields?.filter((i) => i.id !== field._id);
              return copy;
            }

            found.value = text;

            return copy;
          })
        }
        fullWidth
        variant="outlined"
      />
      {field.url && (
        <TextField
          margin="dense"
          label="Посилання"
          disabled={disabled}
          value={exactField?.url}
          onChange={(e) =>
            setValue(() => {
              const copy = Object.assign({}, value);
              const found = copy?.fields?.find((i) => i.id === field._id);
              found.url = e.target.value;
              return copy;
            })
          }
          fullWidth
          variant="outlined"
        />
      )}
      <FieldBridge
        action="edit"
        button={
          <IconButton>
            <Settings />
          </IconButton>
        }
        obj={field}
      />
    </Grid>
  );
};

export const DataLayout = ({ value, setValue, open }) => {
  const { id } = useParams();
  const { types, fields, socials, setSocials } = React.useContext(Context);
  const [currentData, setCurrentData] = React.useState();
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };
  const handleChange = (event) => {
    setValue({ ...value, type: event.target.value });
  };

  const handleClose = () => {
    setCurrentData();
    setContextMenu(null);
  };

  React.useEffect(() => {
    !value.type && setValue({ ...value, type: id });
  }, [id]);

  const fieldsID = types.find((i) => i.id === value?.type)?.fields;

  const socialParams = {
    state: socials,
    setState: setSocials,
    link: "socials",
  };

  return (
    <Stack spacing={2}>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {" "}
        <Action
          {...socialParams}
          obj={currentData}
          layout={<SocialLayout />}
          button={<MenuItem>Редагувати</MenuItem>}
          title={`Редагувати ${currentData?.name}`}
          type="edit"
        />
        <Action
          {...socialParams}
          obj={currentData}
          button={<MenuItem>Видалити</MenuItem>}
          title={`Видалити ${currentData?.name}`}
          description={`Ви впевнені, що хочете видалити ${currentData?.name}?`}
          type="delete"
        />
      </Menu>
      <FormControl fullWidth>
        <InputLabel>Категорія</InputLabel>
        <Select value={value?.type || ""} onChange={handleChange}>
          {[...types, { id: "other", name: "Інше" }].map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Джерело</InputLabel>
        <Select
          value={value?.source ? value.source : ""}
          onChange={(e) => setValue({ ...value, source: e.target.value })}
        >
          {socials.map((social) => (
            <MenuItem
              value={social._id}
              onContextMenu={(e) => {
                setCurrentData(social);
                handleContextMenu(e);
              }}
              key={social._id}
              sx={{ width: "100%" }}
            >
              <Grid container alignItems="center" sx={{ gap: 2 }}>
                <IconBridge icon={social?.icon} />
                {social.name}
              </Grid>
            </MenuItem>
          ))}
          <MenuItem value="">
            <em>Джерело</em>
          </MenuItem>
          <Action
            {...socialParams}
            obj={{ name: "", icon: "" }}
            layout={<SocialLayout />}
            button={
              <MenuItem>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  Додати нове джерело
                  <Add />
                </Grid>
              </MenuItem>
            }
            title="Додати нове джерело посилань"
            type="add"
          />
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={value?.home || false}
            onChange={() => setValue({ ...value, home: !value?.home })}
          />
        }
        label="Відображати на головній"
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
      <TextField
        value={value?.url || ""}
        margin="dense"
        label="Посилання"
        fullWidth
        variant="standard"
        onChange={(e) => setValue({ ...value, url: e.target.value })}
      />
      {fields
        .filter((field) =>
          value?.type !== "other" ? fieldsID?.includes(field._id) : field
        )
        .map((field) => (
          <TextFields
            field={field}
            key={field._id}
            value={value}
            setValue={setValue}
          />
        ))}
      {value?.type === "other" && (
        <FieldBridge
          action="add"
          button={
            <ThemedButton startIcon={<Add />}>Додати нове поле</ThemedButton>
          }
        />
      )}
    </Stack>
  );
};
