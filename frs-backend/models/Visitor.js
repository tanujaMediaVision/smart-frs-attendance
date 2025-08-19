import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  phone_number: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  category: { type: String },
  address: { type: String },
  visitDate: { type: Date },
  entryTime: { type: String },
  exitTime: { type: String },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.model("Visitor", visitorSchema);
