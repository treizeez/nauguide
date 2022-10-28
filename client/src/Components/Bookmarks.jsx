import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Context } from "../Context/Context";
import { UserContext } from "../Context/UserContext";
import { Card, ScreenContext } from "../styles/layouts";

export const BookMarks = () => {
  const { bookmarks } = React.useContext(UserContext);
  const { state } = React.useContext(Context);
  return (
    <ScreenContext title="Обране">
      {bookmarks && bookmarks.length > 0 ? (
        bookmarks.map((id) => {
          const card = state?.find((i) => i._id === id);
          return <Card card={card} key={id} />;
        })
      ) : (
        <Typography variant="h6" sx={{ color: grey[600] }}>
          Ви ще нічого не додали сюди
        </Typography>
      )}
    </ScreenContext>
  );
};
