import axios from "axios";
import React from "react";
import { api } from "../../api";
import { Context } from "../../Context/Context";
import { Action } from "./Action";
import { FieldLayout } from "./layouts/FieldLayout";
import { TypeLayout } from "./layouts/TypeLayout";

const switcher = (action, add, edit, del) => {
  switch (action) {
    case "add":
      return add;
    case "edit":
      return edit;
    case "delete":
      return del;
  }
};

function Info(title, description) {
  this.title = title;
  this.description = description;
}

const BridgeCreator = ({ action, params, addInfo, editInfo, obj }) => {
  const info = switcher(
    action,
    addInfo,
    editInfo,
    new Info(
      `Видалити ${obj?.name}`,
      `Ви впевнені, що хочете видалити ${obj?.name}?`
    )
  );

  return <Action {...params} {...info} />;
};

const checkLayout = (action, layout) => action !== "delete" && layout;

const checkObj = (obj, initial) => (obj ? obj : initial);

export const TypeBridge = ({ action, button, obj }) => {
  const { types, setTypes, admin, state, setState } = React.useContext(Context);
  const initital = {
    name: "",
    id: "",
    icon: "",
    note: "",
    fields: [],
  };
  const params = {
    state: types,
    setState: setTypes,
    layout: checkLayout(action, <TypeLayout forbidId={action === "edit"} />),
    obj: checkObj(obj, initital),
    link: "types",
    type: action,
    button,
    myFunc:
      action === "delete"
        ? () =>
            axios
              .post(`${api}/api/datas/updateMany/`, {
                admin: admin,
                first: obj.id,
                second: "other",
              })
              .then(() =>
                setState(() => {
                  const copy = [...state];
                  return copy.map((item) =>
                    item.type === obj.id ? { ...item, type: "other" } : item
                  );
                })
              )
              .catch((err) => console.error(err))
        : null,
  };

  const addInfo = new Info(
    "Додати нову категорію",
    "Ви можете додати нову категорію, щоб сортувати по ним посилання"
  );

  const editInfo = new Info(
    `Редагувати ${obj?.name}`,
    "Ви можете змінити інформацію данної категорії"
  );

  const all = { addInfo, editInfo, params, action, obj };

  return <BridgeCreator {...all} />;
};

export const FieldBridge = ({ action, button, obj }) => {
  const { fields, setFields } = React.useContext(Context);

  const initial = {
    name: "",
    icon: "",
    url: false,
  };

  const params = {
    state: fields,
    setState: setFields,
    layout: checkLayout(action, <FieldLayout />),
    link: "fields",
    obj: checkObj(obj, initial),
    type: action,
    button,
  };

  const addInfo = new Info(
    "Додати нове поле",
    "Додайте нове поле, щоб поміщати в нього необхідну інформацію"
  );

  const editInfo = new Info(
    `Редагувати ${obj?.name}`,
    "Ви можете відредагувати інформацію поля"
  );

  const all = { addInfo, editInfo, params, action, obj };

  return <BridgeCreator {...all} />;
};
