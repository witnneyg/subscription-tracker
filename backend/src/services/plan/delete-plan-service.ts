import Plan from "../../models/plan-model";

export function DeletePlanService(id: string) {
  return Plan.findByIdAndDelete(id);
}
