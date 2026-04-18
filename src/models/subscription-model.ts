import { Schema, model, Types } from "mongoose";

export interface ISubscription {
  name: string;
  price: number;
  currency: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  category: "entertainment" | "health" | "education" | "finance" | "other";
  paymentMethod: string;
  status: "active" | "cancelled" | "expired";
  startDate: Date;
  renewalDate: Date;
  user: Types.ObjectId;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "BRL", "GBP"],
      default: "BRL",
      uppercase: true,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },
    category: {
      type: String,
      enum: ["entertainment", "health", "education", "finance", "other"],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return value <= new Date();
        },
        message: "Start date must be in the past or present",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (this: any, value: Date) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

subscriptionSchema.pre("save", function (next: any) {
  if (!this.renewalDate) {
    const renewalDate = new Date(this.startDate);

    switch (this.frequency) {
      case "daily":
        renewalDate.setDate(renewalDate.getDate() + 1);
        break;

      case "weekly":
        renewalDate.setDate(renewalDate.getDate() + 7);
        break;

      case "monthly":
        renewalDate.setMonth(renewalDate.getMonth() + 1);
        break;

      case "yearly":
        renewalDate.setFullYear(renewalDate.getFullYear() + 1);
        break;

      default:
        return next(new Error("Invalid frequency"));
    }

    this.renewalDate = renewalDate;
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});
const Subscription = model<ISubscription>("Subscription", subscriptionSchema);

export default Subscription;
