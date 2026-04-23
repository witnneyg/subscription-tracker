import { serve } from "@upstash/workflow/express";
import Subscription from "../../models/subscription-model";
import dayjs from "dayjs";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload as any;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`,
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate,
      );
    }

    await triggerReminder(context, `Reminder ${daysBefore} days before`);
  }
});

export const fetchSubscription = async (
  context: any,
  subscriptionId: string,
) => {
  return await context.run("get subscription", async () => {
    const subscription = await Subscription.findById(subscriptionId).populate(
      "user",
      "name email",
    );

    if (!subscription) {
      throw new Error("Subscription not found");
    }

    if (!subscription.user) {
      throw new Error("User not found in subscription");
    }

    return subscription;
  });
};

const sleepUntilReminder = async (context: any, label: string, date: any) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);

  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context: any, label: string) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);
  });
};
