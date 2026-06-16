import mongoose, { Schema, model, Types } from "mongoose";

export interface ISubscription {
  plan: Types.ObjectId;
  user: Types.ObjectId;

  paymentMethod: string;
  priceAtSubscription?: number;

  status: "active" | "cancelled" | "expired";

  startDate: Date;
  renewalDate: Date;

  nextPlan?: Types.ObjectId;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    plan: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required: [true, "Plan is required"],
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
    priceAtSubscription: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
    nextPlan: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
    },
  },
  {
    timestamps: true,
  },
);

subscriptionSchema.pre("save", async function () {
  let plan = null;

  if (!this.priceAtSubscription || !this.renewalDate) {
    plan = await mongoose.model("Plan").findById(this.plan);

    if (!plan) {
      throw new Error("Plan not found");
    }
  }

  if (!this.priceAtSubscription) {
    this.priceAtSubscription = plan.price;
  }

  if (!this.renewalDate) {
    const renewalPeriods: Record<string, number> = {
      weekly: 7,
      monthly: 1,
      quarterly: 3,
      yearly: 12,
    };

    const renewalDate = new Date(this.startDate);

    if (plan.frequency === "weekly") {
      renewalDate.setDate(
        renewalDate.getDate() + renewalPeriods[plan.frequency],
      );
    } else {
      renewalDate.setMonth(
        renewalDate.getMonth() + renewalPeriods[plan.frequency],
      );
    }

    this.renewalDate = renewalDate;
  }
});

const Subscription = model<ISubscription>("Subscription", subscriptionSchema);

export default Subscription;
