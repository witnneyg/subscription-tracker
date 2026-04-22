import Subscription from "../../models/subscription-model";

export async function getSubscriptionService(userId: string) {
  return Subscription.find({ user: userId });
}
