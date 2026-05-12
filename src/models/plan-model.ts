import { model, Schema } from "mongoose";

type PlanName = "Semanalmente" | "Mensal" | "Trimestral" | "Anual";

export interface IPlan {
  name: PlanName;
  frequency: "weekly" | "monthly" | "quarterly" | "yearly";
  price: number;
  active: boolean;
}

const planSchema = new Schema<IPlan>(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    frequency: {
      type: String,
      enum: ["weekly", "monthly", "quarterly", "yearly"],
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Plan = model<IPlan>("Plan", planSchema);

export default Plan;
