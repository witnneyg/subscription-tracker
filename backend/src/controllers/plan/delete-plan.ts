import { Request, Response } from "express";
import { DeletePlanService } from "../../services/plan/delete-plan-service";

export async function DeletePlan(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Plan ID is required");
    }

    const plan = await DeletePlanService(id as string);

    if (!plan) {
      throw new Error("Plan not found");
    }

    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
}
