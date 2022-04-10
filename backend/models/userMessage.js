import mongoose from "mongoose";

const userModel = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  id: {
    type: String,
  },
});

export default mongoose.model("User", userModel);
