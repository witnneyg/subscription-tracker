import { loadStripe } from "@stripe/stripe-js";

export async function getLoadStripe() {
  const stripePromise = await loadStripe(import.meta.env.STRIPE_PUBLIC_KEY!);
  return stripePromise;
}
