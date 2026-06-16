import Plan, { IPlan } from "../../models/plan-model";

export function CreatePlanService(plan: IPlan) {
  return Plan.create(plan);
}
