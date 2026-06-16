import { serve } from "@upstash/workflow/express";
import dayjs from "dayjs";
import Subscription from "../../models/subscription-model";
import { sendReminderEmail } from "../../utils/send-email";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context: any) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription({ context, subscriptionId });

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`,
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder({
        context,
        label: `Reminder ${daysBefore} days before`,
        date: reminderDate,
      });
    }

    const label =
      daysBefore === 1
        ? "1 day before reminder"
        : `${daysBefore} days before reminder`;

    if (dayjs().isSame(reminderDate, "day")) {
      await triggerReminder({
        context,
        label,
        subscription,
      });
    }
  }
});

const fetchSubscription = async ({ context, subscriptionId }: any) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async ({ context, label, date }: any) => {
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async ({ context, label, subscription }: any) => {
  return await context.run(label, async () => {
    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    });
  });
};
