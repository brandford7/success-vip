"use server";
import {
  PostAndEditPredictionType,
  PredictionStatus,
  PredictionType,
} from "../types";
import { axiosInstance } from "../../config";
import Prediction from "@/models/Prediction";
import { endOfDay, startOfDay } from "date-fns";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";

//const today = startOfDay(new Date()).toISOString();

type FetchAllPredictionsTypes = {
  search?: string;
  currentPage?: number;
  status?: PredictionStatus; // or use PredictionStatus type if defined
  competition?: string;
  game?: string;
  tip?: string;
  odd?: string;
  isVIP?: boolean;
  startPeriod?: string;
  limit?: number;
};

const dynamic = "force-dynamic";
export const fetchPredictions = async ({
  status, // or use PredictionStatus type if defined
  competition,
  game,
  tip,
  odd,
  isVIP,
  search,
  startPeriod,
  currentPage,
  limit = 10,
}: FetchAllPredictionsTypes): Promise<PredictionType[] | null> => {
  try {
    await dbConnect();
    const data: PredictionType[] = await Prediction.find({}).sort({
      startPeriod: -1,
    });

    return JSON.parse(JSON.stringify(data));
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

export const fetchPrediction = async (
  id: string
): Promise<PredictionType | null> => {
  try {
    await dbConnect();
    const data: PredictionType | null = await Prediction.findById(id);
    return JSON.parse(JSON.stringify(data));
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

/*
export const fetchVIP = async (): Promise<PredictionType[] | null> => {
  await dbConnect();
  try {
    const data: PredictionType[] = await Prediction.find({
      startPeriod: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date()),
      },
    });

    return JSON.parse(JSON.stringify(data));
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
*/
export const fetchTodayPredictions = async (): Promise<
  PredictionType[] | null
> => {
  const todayStart = startOfDay(new Date()).toISOString();
  const todayEnd = endOfDay(new Date()).toISOString();

  try {
    await dbConnect();
    const data: PredictionType[] = await Prediction.find({
      startPeriod: {
        $gte: todayStart,
        $lte: todayEnd,
      },
    }).sort({ startPeriod: -1 });

    return JSON.parse(JSON.stringify(data));
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

export const postPrediction = async (
  values: PostAndEditPredictionType
): Promise<PredictionType | null> => {
  try {
    const response = await axiosInstance.post(`/predictions`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 201) {
      throw new Error("Failed to post prediction");
    }
    revalidatePath("/");
    return response.data.data; // Directly return the prediction data
  } catch (error) {
    console.error("Error in postPrediction:", error); // Log the error
    return null;
  }
};

export const deletePrediction = async (
  id: string
): Promise<PredictionType | null> => {
  await dbConnect();
  try {
    const prediction: PredictionType | null = await Prediction.findOneAndDelete(
      {
        _id: id,
      }
    );
    revalidatePath("/");
    return JSON.parse(JSON.stringify(prediction));
    //return prediction;
  } catch (error: any) {
    console.log(error.message);

    return null;
  }
};

// Function to edit a prediction by ID
export const editPrediction = async (
  id: string,
  values: PostAndEditPredictionType
): Promise<PredictionType | null> => {
  try {
    await dbConnect();
    const prediction: PredictionType | null = await Prediction.findOneAndUpdate(
      { _id: id },
      { ...values },
      { new: true }
    );
    revalidatePath("/");
    return JSON.parse(JSON.stringify(prediction));
    //return prediction;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
