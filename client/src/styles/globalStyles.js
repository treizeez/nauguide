import { isMobile } from "react-device-detect";

export const globalStyles = (theme) =>
  `body {background-color: ${
    isMobile ? (theme === "light" ? "#fff" : "#050517") : "#050517"
  }; color: #fff; height: 100vh}`;
