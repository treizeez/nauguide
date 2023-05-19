import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  url: { type: Boolean, default: false },
});

export const Field = mongoose.model("Field", FieldSchema);
