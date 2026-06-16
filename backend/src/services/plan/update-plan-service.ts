import Plan, { IPlan } from "../../models/plan-model";

export function UpdatePlanService(plan: IPlan, id: string) {
  return Plan.findByIdAndUpdate(id, plan, {
    returnDocument: "after",
    runValidators: true,
  });
}
