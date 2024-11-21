import { HttpStatusCode } from "axios";
import dbConnect from "../../../../../utils/dbConnect";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs"; // For password hashing
import jwt from "jsonwebtoken"; // For JWT token generation

export type LoginDTO = {
  email: string;
  password: string;
};

const JWT_SECRET_KEY = process.env.JWT_SECRET;

export async function POST(request: Request) {
  await dbConnect();

  const { email, password }: LoginDTO = await request.json();

  // Validate request body
  if (!email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: HttpStatusCode.BadRequest }
    );
  }

  try {
    // Check if user exists in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        role: user.role,
      },
      "10686c37b37cb5c94379af461a37b155f3f1b5df67182d84a050f31bcb768792",
      {
        expiresIn: "1h",
      }
    );

    // Return response with JWT token
    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: {
          email: user.email,
          id: user._id,
          role: user.role,
          customerId: user.customerId,
        },
      },
      { status: HttpStatusCode.Ok }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Server error, please try again later" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
