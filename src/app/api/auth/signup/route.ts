import { HttpStatusCode } from "axios";
import dbConnect from "../../../../../utils/dbConnect";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export enum Role {
  Admin = "admin",
  User = "user",
}

export type SignUpDTO = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  role?: Role;
};

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;

export async function POST(request: Request) {
  await dbConnect();

  const { email, first_name, last_name, phone, password }: SignUpDTO =
    await request.json();

  if (!email || !first_name || !last_name || !phone || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: HttpStatusCode.BadRequest }
    );
  }

  try {
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: HttpStatusCode.Conflict }
      );
    }

    const existingUserPhone = await User.findOne({ phone });
    if (existingUserPhone) {
      return NextResponse.json(
        { message: "User with this phone already exists" },
        { status: HttpStatusCode.Conflict }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new customer in Paystack
    const paystackResponse = await fetch("https://api.paystack.co/customer", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, first_name, last_name, phone }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok) {
      return NextResponse.json(paystackData, {
        status: paystackResponse.status,
      });
    }

    const customerCode = paystackData.data?.customer_code || null;
    const customerId = paystackData.data?.id || null;

    // Save new user to MongoDB
    const newUser = await User.create({
      email,
      first_name,
      last_name,
      phone,
      password: hashedPassword,
      role: Role.User,
      customerId,
      customerCode,
    });


    return NextResponse.json(
      {
        message: "User registered successfully",
        user: newUser,
        data: paystackResponse,
      },
      { status: HttpStatusCode.Created }
    );
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { message: "Error saving user to database", error },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
