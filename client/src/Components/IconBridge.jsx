import { Icon } from "@mui/material";

export const IconBridge = ({ icon, sx }) => (
  <Icon sx={{ ...sx }} className={icon.includes("fa") ? icon : null}>
    {icon.includes("mui") && icon}
  </Icon>
);
