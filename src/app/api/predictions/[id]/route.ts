import Prediction from "@/models/Prediction";
import dbConnect from "../../../../../utils/dbConnect";
import { HttpStatusCode } from "axios";

export type UpdatePredictionDTO = {
  competition: string;
  game: string;
  tip: string;
  odd: string;
  isVIP: boolean;
  result: string;
  startPeriod: string;
  status: Status;
};

enum Status {
  Pending = "pending",
  Won = "won",
  Lost = "lost",
}

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await dbConnect();
    const prediction = await Prediction.findById(params.id);
    if (!prediction) {
      return Response.json(
        { message: `Prediction ${params.id} not found` },
        { status: HttpStatusCode.NotFound }
      );
    }
    return Response.json({ data: prediction }, { status: HttpStatusCode.Ok });
  } catch (error) {
    return Response.json({ error });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await dbConnect();
    const prediction = await Prediction.findById(params.id);
    const body: UpdatePredictionDTO = await request.json();
    if (!prediction) {
      return Response.json(
        { message: `Prediction ${params.id} not found` },
        { status: HttpStatusCode.NotFound }
      );
    }
    if (body.competition) {
      prediction.competition = body.competition;
    }
    if (body.game) {
      prediction.game = body.game;
    }
    if (body.tip) {
      prediction.tip = body.tip;
    }
    if (body.odd) {
      prediction.odd = body.odd;
    }
    if (body.isVIP) {
      prediction.isVIP = body.isVIP;
    }
    if (body.result) {
      prediction.result = body.result;
    }
    if (body.startPeriod) {
      prediction.startPeriod = body.startPeriod;
    }
    if (body.status) {
      prediction.status = body.status;
    }
    prediction.save();
    return Response.json({ prediction });
  } catch (error) {
    return Response.json({ error });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await dbConnect();
    const prediction = await Prediction.findById(params.id);
    if (!prediction) {
      return Response.json(
        { message: `Prediction ${params.id} not found` },
        { status: HttpStatusCode.NotFound }
      );
    }
    await Prediction.findByIdAndDelete(prediction._id);
    return Response.json({ data: prediction }, { status: HttpStatusCode.Ok });
  } catch (error) {
    return Response.json({ message: error });
  }
};
