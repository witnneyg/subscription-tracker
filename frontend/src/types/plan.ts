export type PlanFrequency = "weekly" | "monthly" | "quarterly" | "yearly";

export interface Plan {
  _id: string;
  name: string;
  frequency: PlanFrequency;
  price: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LandingPlan {
  id: string;
  name: string;
  frequency: PlanFrequency;
  price: number;
  description: string;
  features: string[];
  badge?: string;
  highlighted?: boolean;
}
