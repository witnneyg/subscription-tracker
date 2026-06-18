export type PlanFrequency = "week" | "month" | "quart" | "year";

export interface Plan {
  name: string;
  frequency: PlanFrequency;
  description: string;
  price: number;
  stripePriceId: string;
}
