import { Button, styled } from "@mui/material";
import { borderRadius } from "./constants";

export const ThemedButton = styled(Button)((props) => ({
  fontWeight: "bold",
  textTransform: "none",
  borderRadius: borderRadius,
}));
