import Subscription from "../../models/subscription-model";

export async function getSubscriptionByIdService(subscriptionId: string) {
  return Subscription.findById(subscriptionId);
}
