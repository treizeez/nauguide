import mongoose from "mongoose";

const TypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    unique: true,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  fields: { type: Array, default: [] },
  note: { type: String, default: "" },
});

export const Type = mongoose.model("Type", TypeSchema);
