import { Request, Response } from "express";
import { UpdatePlanService } from "../../services/plan/update-plan-service";

export async function UpdatePlan(req: Request, res: Response) {
  try {
    if (!req.body) {
      res.status(400).json({ message: "Request body is required" });
    }
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Plan ID is required" });
    }

    const plan = req.body;

    const updatedPlan = await UpdatePlanService(plan, id as string);

    if (!updatedPlan) {
      res.status(404).json({ message: "Plan not found" });
    }

    return res.status(200).json({
      message: "Plan updated successfully",
      plan: updatedPlan,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
