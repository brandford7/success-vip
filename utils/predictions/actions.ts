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

export async function fetchPredictions({
  search,
  currentPage = 1,
  status,
  competition,
  game,
  tip,
  odd,
  isVIP,
  startPeriod,
  limit = 10,
}: FetchAllPredictionsTypes): Promise<{
  predictions: PredictionType[] | null;
  count: number;
  currentPage: number;
  totalPages: number;
}> {
  // Perform authentication
  //authenticateAndRedirect();

  try {
    // Build the query object
    await dbConnect();

    const query: Record<string, any> = {};

    // Add filters based on provided parameters
    if (search) {
      query.$or = [
        { game: { $regex: search, $options: "i" } },
        { competition: { $regex: search, $options: "i" } },
        { tip: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
        { isVIP: { $regex: search, $options: "i" } },
        { result: { $regex: search, $options: "i" } },
      ];
    }

    if (competition) {
      query.competition = competition;
    }

    if (game) {
      query.game = game;
    }

    if (tip) {
      query.tip = tip;
    }

    if (odd) {
      query.odd = odd;
    }

    if (isVIP !== undefined) {
      // Check for isVIP only if specified
      query.isVIP = isVIP;
    }

    if (startPeriod) {
      query.startPeriod = startPeriod;
    }

    if (status) {
      query.status = status;
    }

    const skip = (currentPage - 1) * limit;

    // Fetch predictions from the database
    const predictions: PredictionType[] = await Prediction.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: "desc" });

    // Get the total count of predictions matching the query
    const count: number = await Prediction.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    return {
      predictions: JSON.parse(JSON.stringify(predictions)),
      count,
      currentPage,
      totalPages,
    };
  } catch (error) {
    console.error(error);
    return { predictions: [], count: 0, currentPage: 1, totalPages: 0 };
  }
}

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
    }).sort({ createdAt: 1 });

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
