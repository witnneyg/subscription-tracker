import { Request, Response } from "express";
import { getAllSubscriptionService } from "../../services/subscription/get-all-subscription-service";

export async function getAllSubscription(req: Request, res: Response) {
  try {
    const subscription = await getAllSubscriptionService();

    res.status(200).send({ success: true, data: subscription });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
}
