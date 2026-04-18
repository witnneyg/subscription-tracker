import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GetUserService } from "../../services/users/get-user-service";
import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/create-user-service";

export async function SignUp(req: Request, res: Response) {
  const session = await mongoose.startSession();

  const expiresIn = (process.env.JWT_EXPIRES_IN || "1h") as any;
  const jwtSecret = process.env.JWT_SECRET as string;

  try {
    await session.withTransaction(async () => {
      const { name, email, password } = req.body;

      const userAlreadyExist = await GetUserService(email);

      if (userAlreadyExist) {
        return res.status(401).send("User already exist");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUsers = await CreateUserService(
        {
          name,
          email,
          password: hashedPassword,
        },
        session,
      );

      const token = jwt.sign(
        {
          sub: newUsers[0]._id,
          email: newUsers[0].email,
        },
        jwtSecret,
        {
          expiresIn,
        },
      );

      const { password: _, ...safeUser } = newUsers[0].toObject();

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          token,
          user: safeUser,
        },
      });
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  } finally {
    session.endSession();
  }
}
