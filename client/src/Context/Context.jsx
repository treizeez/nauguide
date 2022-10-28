import axios from "axios";
import React from "react";
import { api } from "../api";

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const [state, setState] = React.useState();
  const [types, setTypes] = React.useState();
  const [fields, setFields] = React.useState();
  const [socials, setSocials] = React.useState();
  const [admin, setAdmin] = React.useState(localStorage.getItem("adminOn"));

  const requests = [
    {
      get: "datas",
      func: (param) => setState(param),
    },
    {
      get: "types",
      func: (param) => setTypes(param),
    },
    {
      get: "fields",
      func: (param) => setFields(param),
    },
    {
      get: "socials",
      func: (param) => setSocials(param),
    },
  ];

  React.useEffect(() => {
    admin
      ? localStorage.setItem("adminOn", admin)
      : localStorage.removeItem("adminOn");
  }, [admin]);

  React.useEffect(() => {
    admin &&
      axios({
        url: `${api}/checkAdmin`,
        method: "post",
        data: { admin: admin },
      }).then((res) => !res.data && setAdmin());
  }, [admin]);

  React.useEffect(() => {
    window.addEventListener("storage", () => {
      axios({
        url: `${api}/checkAdmin`,
        method: "post",
        data: { admin: localStorage.getItem("adminOn") },
      }).then((res) => !res.data && localStorage.removeItem("adminOn"));
    });
  }, []);

  React.useEffect(() => {
    requests.map((request) => {
      const { get, func } = request;
      return axios
        .get(`${api}/api/${get}`)
        .then((res) => (res?.data ? func(res.data) : func([])));
    });
  }, []);

  return (
    <Context.Provider
      value={{
        state,
        setState,
        types,
        setTypes,
        admin,
        setAdmin,
        fields,
        setFields,
        socials,
        setSocials,
      }}
    >
      {children}
    </Context.Provider>
  );
};
