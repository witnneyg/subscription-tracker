import { config } from "dotenv";
config();
import cors from "cors";
import express from "express";
import { connectToDataBase } from "./database/mongodb";
import userRouter from "./routes/users-routes";
import authRouter from "./routes/auth-routes";
import { globalLimiter } from "./middlewares/rate-limit";
import subscriptionRouter from "./routes/subscription-routes";
import workFlowRouter from "./routes/workflow-routes";
import planRouter from "./routes/plan-routes";
import stripeRouter from "./routes/stripe-routes";

connectToDataBase();
const PORT = Number(process.env.PORT) || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const app = express();
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(globalLimiter);

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/subscription", subscriptionRouter);
app.use("/workflows", workFlowRouter);
app.use("/plans", planRouter);
app.use("/stripe", stripeRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
