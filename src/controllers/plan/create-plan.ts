import { Request, Response } from "express";
import { CreatePlanService } from "../../services/plan/create-plan-service";

export async function CreatePlan(req: Request, res: Response) {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const plan = await CreatePlanService(req.body);

    if (!plan) {
      return res.status(400).json({ error: "Failed to create plan" });
    }
    return res.status(201).json(plan);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
