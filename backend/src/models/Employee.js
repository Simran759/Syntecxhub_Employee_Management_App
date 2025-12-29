import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    role: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    salary: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  { timestamps: true }
);
const Employee=mongoose.model("Employee", employeeSchema);
export default Employee;
