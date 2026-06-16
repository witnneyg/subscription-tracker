import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { GetUserWithPasswordService } from "../../services/users/get-user-with-password";

export async function SignIn(req: Request, res: Response) {
  const expiresIn = (process.env.JWT_EXPIRES_IN || "1h") as any;
  const jwtSecret = process.env.JWT_SECRET as string;

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await GetUserWithPasswordService(email);

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign(
      {
        sub: user._id,
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn,
      },
    );

    const { password: _, ...safeUser } = user.toObject();

    res.status(200).json({
      success: true,
      message: "User signed in  successfully",
      data: {
        token,
        user: safeUser,
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
