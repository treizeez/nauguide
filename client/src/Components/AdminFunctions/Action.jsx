import React from "react";
import { DialogLayout } from "../../styles/layouts";
import { Context } from "../../Context/Context";
import { action } from "./actions";
import { Alert } from "@mui/material";

export const Action = ({
  state,
  setState,
  type,
  obj,
  button,
  title,
  description,
  layout,
  link,
  myFunc,
}) => {
  const [open, setOpen] = React.useState(false);
  const { admin } = React.useContext(Context);
  const [value, setValue] = React.useState();
  const [error, setError] = React.useState();

  const handleDialog = () => {
    setOpen(!open);
    open ? setValue() : setValue(obj);
    setError();
  };

  const params = {
    state,
    setState,
    admin,
    link,
    type,
    myFunc,
    handleDialog,
    setError,
    obj: value,
  };

  return (
    <>
      {React.cloneElement(button, { onClick: handleDialog })}
      <DialogLayout
        onClick={() => action(params)}
        open={open}
        handleDialog={handleDialog}
        title={title}
        description={description}
      >
        {error && <Alert severity="error">{error}</Alert>}
        {layout && React.cloneElement(layout, { value, setValue, open })}
      </DialogLayout>
    </>
  );
};
