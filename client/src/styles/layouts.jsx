import {
  Bookmark,
  BookmarkBorder,
  ContentCopyRounded,
  DeleteForever,
  Edit,
  LocationOnRounded,
  Search,
  Telegram,
} from "@mui/icons-material";
import {
  Avatar,
  ButtonBase,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Slide,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import React from "react";
import { isMobile } from "react-device-detect";
import { matchPath } from "react-router-dom";
import { Action } from "../Components/AdminFunctions/Action";
import { TypeBridge } from "../Components/AdminFunctions/bridges";
import { DataLayout } from "../Components/AdminFunctions/layouts/DataLayout";
import { IconBridge } from "../Components/IconBridge";
import { Context } from "../Context/Context";
import { UserContext } from "../Context/UserContext";
import { borderRadius, secondaryColor } from "./constants";
import { ThemedButton } from "./themed";

export const ScreenLayout = (props) => {
  const { theme } = React.useContext(UserContext);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        backgroundColor: isMobile
          ? "transparent"
          : theme === "light"
          ? "#fff"
          : "#050517",
        width: "100%",
        height: isMobile ? "auto" : "100%",
        borderRadius: isMobile ? `0` : borderRadius,
        color: theme === "light" ? "#000" : "#fff",
        overflowY: isMobile ? "hidden:" : "scroll",
        padding: isMobile ? 18 : 75,
      }}
    >
      {props.children}
    </div>
  );
};

export const SearchField = (props) => {
  const { theme } = React.useContext(UserContext);
  const initial = {
    borderRadius: borderRadius,
    backgroundColor: secondaryColor(theme),
    margin: 0,
    width: "100%",
  };
  const [style, setStyle] = React.useState(initial);

  React.useEffect(() => {
    const handleScroll = () => {
      if (isMobile) {
        if (window.scrollY <= 5) {
          return setStyle(initial);
        }

        return setStyle({
          backgroundColor: theme === "light" ? "#e5e5e5" : "#02020b",
          borderRadius: 0,
          width: "110%",
          margin: -5,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      flexWrap="nowrap"
      sx={{
        padding: "10px 50px",
        borderRadius: style.borderRadius,
        width: "100%",
        backgroundColor: isMobile
          ? style.backgroundColor
          : secondaryColor(theme),
        position: isMobile ? "sticky" : "relative",
        transition: "all 0.2s ease-out",
        zIndex: 1000,
        margin: style.margin,
        width: style.width,
        left: 0,
        top: 0,
      }}
    >
      <input
        {...props}
        type="text"
        placeholder="Пошук"
        style={{
          background: "none",
          border: "none",
          width: "100%",
          height: "100%",
          color: theme === "light" ? "#000" : "#fff",
        }}
      />
      <IconButton>
        <Search />
      </IconButton>
    </Grid>
  );
};

export const BarButton = ({ button, editable, onClick, top }) => {
  const id = matchPath(
    {
      path: "/:id",
    },
    location.pathname
  );

  const { state, admin, types } = React.useContext(Context);

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

  const handleClose = () => {
    setContextMenu(null);
  };

  React.useEffect(() => {
    setContextMenu(null);
  }, [types]);

  return (
    <>
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
        <TypeBridge
          button={<MenuItem>Редагувати</MenuItem>}
          obj={button}
          action="edit"
        />
        <TypeBridge
          button={<MenuItem>Видалити</MenuItem>}
          obj={button}
          action="delete"
        />
      </Menu>
      <ButtonBase
        onContextMenu={(e) =>
          admin && editable && button?.id !== "other" && handleContextMenu(e)
        }
        onClick={onClick}
        sx={{
          padding: "15px 25px",
          width: isMobile ? "auto" : "100%",
          borderRadius: borderRadius,
          backgroundColor:
            id === button.id || id?.params.id === button.id
              ? "#3f60c5"
              : "transparent",
        }}
      >
        <Grid
          container
          flexWrap="nowrap"
          alignItems="center"
          flexDirection={isMobile ? "column" : "unset"}
        >
          <Grid container alignItems="center" sx={{ gap: 3, width: "100%" }}>
            <IconBridge
              sx={{ color: top ? "#9ba0cb" : grey[400] }}
              icon={button.icon}
            />
            {!isMobile && (
              <Typography variant="subtitle1" sx={{ whiteSpace: "nowrap" }}>
                {button.name}
              </Typography>
            )}
          </Grid>
          {!isMobile && !top && (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{
                aspectRatio: "2/1",
                width: 50,
                borderRadius: "5px",
                backgroundColor: "#292c4d",
              }}
            >
              {state && state.filter((item) => item.type === button.id).length}
            </Grid>
          )}
        </Grid>
      </ButtonBase>
    </>
  );
};

const ItemInList = ({ item, field }) => {
  const { icon, name } = item;
  const { value, url } = field;
  const { theme } = React.useContext(UserContext);
  return (
    <ListItemButton
      disableRipple={!url}
      onClick={() => url && window.open(url, "_blank")}
    >
      <ListItemAvatar>
        <Avatar>
          <IconBridge icon={icon} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={value}
        sx={{ color: theme === "light" ? "#000" : "#fff" }}
      />
    </ListItemButton>
  );
};

export const DialogContext = (props) => {
  return (
    <>
      <DialogTitle>{props.label}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
        <Stack spacing={2}>{props.children}</Stack>
      </DialogContent>
      <DialogActions>
        <ThemedButton onClick={props.handleDialog}>Скасувати</ThemedButton>
        <ThemedButton
          variant="contained"
          onClick={props.handleDialog}
          type="submit"
        >
          Готово
        </ThemedButton>
      </DialogActions>
    </>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogLayout = ({
  open,
  handleDialog,
  title,
  description,
  children,
  onClick,
  res,
  setRes,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleDialog}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>{title}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        <ThemedButton onClick={handleDialog}>Скасувати</ThemedButton>
        <ThemedButton
          variant="contained"
          onClick={() => {
            onClick ? onClick() : handleDialog();
          }}
          type="submit"
        >
          Готово
        </ThemedButton>
      </DialogActions>
    </Dialog>
  );
};

export const Card = ({ card }) => {
  const { admin, fields, state, setState, socials } = React.useContext(Context);
  const { bookmarks, setBookmarks, theme } = React.useContext(UserContext);
  const [copied, setCopied] = React.useState(false);

  const params = {
    state: state,
    setState: setState,
    obj: card,
    link: "datas",
  };

  const foundSource = socials?.find((social) => social?._id === card?.source);

  return (
    <Grid
      container
      justifyContent="space-between"
      flexWrap="nowrap"
      sx={{
        position: "relative",
        width: "100%",
        padding: isMobile ? 2 : 5,
        borderRadius: borderRadius,
        background: secondaryColor(theme),
      }}
    >
      <Grid container alignItems="center">
        <Grid container flexWrap="nowrap" sx={{ gap: 2 }}>
          {foundSource && (
            <Avatar sx={{ bgcolor: foundSource.color }}>
              <IconBridge icon={foundSource.icon} />
            </Avatar>
          )}
          <Stack style={{ width: "70%" }}>
            <Typography
              variant="h6"
              sx={{
                cursor: card?.url ? "pointer" : "inherit",
              }}
              onClick={() => card?.url && window.open(card.url, "_blank")}
            >
              {card?.name}
            </Typography>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
              }}
            >
              {card?.fields?.map((field) => {
                const exactField = fields?.find((i) => i._id === field?.id);
                return (
                  exactField && (
                    <ItemInList
                      key={field.id}
                      item={exactField}
                      field={field}
                    />
                  )
                );
              })}
            </List>
          </Stack>
        </Grid>
      </Grid>
      <div>
        <Grid container flexDirection="column">
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(card.url);
              setCopied(true);
              setTimeout(() => setCopied(false), 1000);
            }}
          >
            <ContentCopyRounded
              sx={{ color: copied ? green[400] : "inherit" }}
            />
          </IconButton>
          <Checkbox
            checked={bookmarks?.includes(card?._id) ? true : false}
            onChange={() =>
              setBookmarks(() => {
                let arr;
                if (!bookmarks) {
                  arr = [];
                } else {
                  arr = bookmarks;
                }
                const copy = [...arr];
                if (copy?.includes(card._id)) {
                  return copy.filter((i) => i !== card._id);
                } else {
                  copy?.push(card._id);
                }
                return copy;
              })
            }
            icon={<BookmarkBorder />}
            checkedIcon={<Bookmark />}
          />
          {admin && (
            <Action
              {...params}
              button={
                <IconButton>
                  <Edit />
                </IconButton>
              }
              title={`Редагувати ${card?.name}`}
              description="Ви можете відредагувати посилання"
              type="edit"
              layout={<DataLayout />}
            />
          )}
          {admin && (
            <Action
              {...params}
              button={
                <IconButton>
                  <DeleteForever />
                </IconButton>
              }
              title={`Видалити ${card?.name}`}
              description={`Ви впевнені, що хочете видалити ${card?.name}?`}
              type="delete"
            />
          )}
        </Grid>
      </div>
    </Grid>
  );
};

export const ScreenContext = (props) => {
  const { theme } = React.useContext(UserContext);
  return (
    <Stack spacing={5} sx={{ width: "100%" }}>
      {props.top}
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: theme === "light" ? "#000" : "#fff" }}
      >
        {props.title}
      </Typography>
      {props.header}
      {props.children}
    </Stack>
  );
};
