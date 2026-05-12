import { Router } from "express";
import { CreatePlan } from "../controllers/plan/create-plan";
import { GetPlans } from "../controllers/plan/get-all-plans";
import { DeletePlan } from "../controllers/plan/delete-plan";
import { UpdatePlan } from "../controllers/plan/update-plan";

const planRouter = Router();

planRouter.post("/", CreatePlan);
planRouter.get("/", GetPlans);
planRouter.delete("/:id", DeletePlan);
planRouter.patch("/:id", UpdatePlan);

export default planRouter;
