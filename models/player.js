const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    level: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
      required: true,
    },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
