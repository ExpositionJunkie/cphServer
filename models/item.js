const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d

const Item = new Schema({
  img: { data: Buffer, contentType: String },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
