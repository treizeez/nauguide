import axios from "axios";
import { api } from "../../api";

export const action = async ({
  state,
  setState,
  admin,
  obj,
  link,
  type,
  handleDialog,
  setError,
  myFunc,
}) => {
  switch (type) {
    case "add":
      try {
        await axios
          .post(`${api}/api/${link}`, {
            admin: admin,
            value: obj,
          })
          .then((res) => {
            setState(() => {
              const copy = [...state];
              copy.push(res.data);
              return copy;
            });
            handleDialog();
          });
      } catch (err) {
        console.error(err.response.data);
        setError(err.message);
      }
      break;

    case "edit":
      try {
        await axios
          .put(`${api}/api/${link}/${obj._id}`, {
            admin: admin,
            value: obj,
          })
          .then((res) => {
            handleDialog();
          });
        setState(() => {
          const copy = [...state];
          return copy.map((item) =>
            item._id === obj._id ? { ...item, ...obj } : item
          );
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
      break;

    case "delete":
      try {
        await axios
          .delete(`${api}/api/${link}/${obj._id}`, {
            data: {
              admin: admin,
            },
          })
          .then(() => {
            myFunc && myFunc();
            handleDialog();
          });
        setState(() => {
          const copy = [...state];
          return copy.filter((item) => item._id !== obj._id);
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
      break;
  }
};
