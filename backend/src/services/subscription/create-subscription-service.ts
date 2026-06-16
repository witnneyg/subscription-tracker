import Subscription from "../../models/subscription-model";

export async function createSubscriptionService(subscription: any) {
  return Subscription.create(subscription);
}
