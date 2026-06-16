import { Request, Response } from "express";
import { getPlansService } from "../../services/plan/get-all-plans-service";

export async function GetPlans(req: Request, res: Response) {
  try {
    const plans = await getPlansService();
    res.status(200).json(plans);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
}
