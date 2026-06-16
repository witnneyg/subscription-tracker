import { apiFetch } from "./api";
import type { Plan } from "../types/plan";

export function getPlans() {
  return apiFetch<Plan[]>("/plans");
}
