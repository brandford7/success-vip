import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  customerId: { type: Number, required: false }, // Ensure this field exists and is of type String
  customerCode: { type: String, required: false }, // Ensure this field exists and is of type String
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
