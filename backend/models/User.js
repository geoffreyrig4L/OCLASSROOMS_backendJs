const mongoose = require("mongoose");

//permet de renforcer la validation unique
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  //unique: true empêche la création de plusieurs users avec le ^m email
  password: { type: String, required: true },
});

//applique le validator au schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
