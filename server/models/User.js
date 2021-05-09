import mongoose from "mongoose";

//this is the mongoose database schema that connects to mongoDB for the information stored for users
const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  major: {type: String, required: false },
  gradYear: {type: String, required: false},
  clubPosition: {type: String, required: false},
  isAdmin: {type: Boolean, required: false},
  id: { type: String },
});

//exportable mongoDB model/schema
var USER = mongoose.model("User", userSchema);

export default USER;