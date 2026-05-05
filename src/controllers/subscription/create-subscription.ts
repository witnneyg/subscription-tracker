import { Request, Response } from "express";
import { createSubscriptionService } from "../../services/subscription/create-subscription-service";
import { workFlowClient } from "../../config/upstash";

export async function createSubscription(req: Request | any, res: Response) {
  try {
    if (!req.body) {
      return res.status(404).send("body is missing property");
    }

    const subscription = await createSubscriptionService({
      ...req.body,
      user: req.user.id,
    });

    const { workflowRunId } = await workFlowClient.trigger({
      url: "https://tipping-skinning-crisply.ngrok-free.dev/workflows/subscription/reminder",
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res
      .status(201)
      .send({ success: true, data: { subscription, workflowRunId } });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
}
