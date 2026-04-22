import { Request, Response } from "express";
import { createSubscriptionService } from "../../services/subscription/create-subscription-service";

export async function createSubscription(req: Request | any, res: Response) {
  try {
    if (!req.body) {
      return res.status(404).send("body is missing property");
    }

    const subscription = await createSubscriptionService({
      ...req.body,
      user: req.user.id,
    });

    console.log(subscription);

    res.status(201).send({ success: true, data: subscription });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
}
