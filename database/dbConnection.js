import { connect } from "mongoose";

export const conn = connect("mongodb://127.0.0.1:27017/e-commerce")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB Connection Error:", err));
  // 'mongodb://127.0.0.1:27017/test'