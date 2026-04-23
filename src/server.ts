import { config } from "dotenv";
config();
import express from "express";
import { connectToDataBase } from "./database/mongodb";
import userRouter from "./routes/users-routes";
import authRouter from "./routes/auth-routes";
import { globalLimiter } from "./middlewares/rate-limit";
import subscriptionRouter from "./routes/subscription-routes";
import workFlowRouter from "./routes/workflow-routes";

connectToDataBase();
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(globalLimiter);

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/subscription", subscriptionRouter);
app.use("/workflows", workFlowRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
