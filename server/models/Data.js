import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  home: { type: Boolean, default: false },
  source: { type: mongoose.Schema.Types.Mixed, default: null },
  fields: { type: Array, default: [] },
  url: { type: mongoose.Schema.Types.Mixed, default: null },
});

export const Data = mongoose.model("Data", DataSchema);
