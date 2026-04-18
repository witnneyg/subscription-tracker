import mongoose from "mongoose";

export const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    console.log("✅ MongoDB conectado com sucesso!");
  } catch (err: any) {
    console.error("❌ Erro ao conectar ao MongoDB:", err.message);
    process.exit(1);
  }
};
