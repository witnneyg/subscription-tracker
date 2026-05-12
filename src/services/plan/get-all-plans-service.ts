import Plan from "../../models/plan-model";

export function getPlansService() {
  return Plan.find();
}
