import Subscription from "../../models/subscription-model";

export async function getAllSubscriptionService() {
  return Subscription.find();
}
