let mongoose = require("mongoose");
let { Schema } = mongoose;
let bcrypt = require("bcryptjs");

const registerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  confirmPassword: {
    type: String,
    required: true,
  },
});

registerSchema.pre("save", async function (next) {

  if (this.isModified("password")) {
    console.log(`The current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`The current password is ${this.password}`);
  }
  next();
});


registerSchema.pre("save", async function (next) {

  if (this.isModified("confirmPassword")) {
    console.log(`The current password is ${this.confirmPassword}`);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);
    console.log(`The current password is ${this.confirmPassword}`);
  }
  next();
});

//now collection part
const Register = mongoose.model("user", registerSchema);
module.exports = Register;
