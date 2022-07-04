const { Schema, model } = require("mongoose");

const VideoSchema = new Schema(
  {
    path: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection:"videos"
  }
);
const Videos = model("Videos", VideoSchema);
module.exports = Videos;
