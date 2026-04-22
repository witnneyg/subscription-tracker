import { Router } from "express";
import { createSubscription } from "../controllers/subscription/create-subscription";
import { authMiddleware } from "../middlewares/auth-middleware";
import { getSubscription } from "../controllers/subscription/get-subscription";
import { getAllSubscription } from "../controllers/subscription/get-all-subscription";

const subscriptionRouter = Router();

subscriptionRouter.get("/:id", authMiddleware, getSubscription);
subscriptionRouter.get("/", getAllSubscription);
subscriptionRouter.post("/", authMiddleware, createSubscription);
// subscriptionRouter.put("/", updateSubscription)
// subscriptionRouter.delete("/", deleteSubscription)

export default subscriptionRouter;
