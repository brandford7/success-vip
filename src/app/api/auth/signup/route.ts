import { HttpStatusCode } from "axios";
import dbConnect from "../../../../../utils/dbConnect";
import { NextResponse } from "next/server";
import User from "@/models/User";


export type SignUpDTO = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
};

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET; // Ensure this is set in your environment variables

export async function POST(request: Request) {
  await dbConnect(); // Ensure the DB is connected

  const { email, first_name, last_name, phone }: SignUpDTO =
    await request.json();

  // Validate request body
  if (!email || !first_name || !last_name || !phone) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: HttpStatusCode.BadRequest }
    );
  }

  // Create a new customer in Paystack
  const paystackResponse = await fetch("https://api.paystack.co/customer", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, first_name, last_name, phone }),
  });

  const paystackData = await paystackResponse.json();

  // Check if Paystack API call was successful
  if (!paystackResponse.ok) {
    return NextResponse.json(paystackData, { status: paystackResponse.status });
  }

  // Save customer to MongoDB
  try {
    const newCustomer = await User.create({
      email,
      first_name,
      last_name,
      phone,
    });
    await newCustomer.save();
    return NextResponse.json(newCustomer, { status: HttpStatusCode.Created });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error saving customer to database", error },
      { status: 500 }
    );
  }
}
