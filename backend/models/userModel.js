const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  address: {
    delivery: {
      type: String,
      default: "",
    },
    billing: {
      type: String,
      default: "",
    },
  },
  phone: {
    work: {
      type: Number,
      default: "",
    },
    home: {
      type: Number,
      default: "",
    },
    mobile: {
      type: Number,
      default: "",
    },
  },
});

module.exports = User = mongoose.model("users", UserSchema);
