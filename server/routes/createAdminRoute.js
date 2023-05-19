import express from "express";
import { deleter } from "../functions/delete.js";
import { edit } from "../functions/edit.js";
import { editMany } from "../functions/editMany.js";
import { get } from "../functions/get.js";
import { post } from "../functions/post.js";

export const createAdminRoute = (model) => {
  const router = express.Router();

  router.get("/", (req, res) => get(req, res, model));

  router.post("/", (req, res) => post(req, res, model));

  router.put("/:id", (req, res) => edit(req, res, model));

  router.post("/updateMany", (req, res) => editMany(req, res, model));

  router.delete("/:id", (req, res) => deleter(req, res, model));

  return router;
};
