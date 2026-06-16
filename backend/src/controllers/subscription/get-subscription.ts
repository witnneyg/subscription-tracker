import { Request, Response } from "express";
import { getSubscriptionService } from "../../services/subscription/get-subscription-service";

export async function getSubscription(req: Request | any, res: Response) {
  try {
    if (req.params.id !== req.user.id) {
      res.status(401).send("You are not the owner of this account");
    }

    const subscription = await getSubscriptionService(req.params.id);

    res.status(200).send({ success: true, data: subscription });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
}
