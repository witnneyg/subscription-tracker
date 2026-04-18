import { config } from "dotenv";
import express from "express";
import { connectToDataBase } from "./database/mongodb";
import userRouter from "./routes/users-routes";
import authRouter from "./routes/auth-routes";

config();
connectToDataBase();
const PORT = 3000;

const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
