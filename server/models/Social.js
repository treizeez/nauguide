import mongoose from "mongoose";

const SocialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },
});

export const Social = mongoose.model("Social", SocialSchema);
