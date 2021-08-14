const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    level1: {
      type: Number,
      required: true,
      min: 0,
    },
    level2: {
      type: Number,
      required: true,
      min: 0,
    },
    level3: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const vanillaSchema = new Schema(
  {
    class: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    tables: [tableSchema],
  },
  {
    timestamps: true,
  }
);

const Vanilla = mongoose.model("Vanilla", vanillaSchema);

module.exports = Vanilla;
