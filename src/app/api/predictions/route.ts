//import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import dbConnect from "../../../../utils/dbConnect";
import Prediction from "@/models/Prediction";
import { NextResponse, NextRequest } from "next/server";
import { PredictionStatus } from "../../../../utils/types";

export type CreatePredictionDTO = {
  competition: string;
  game: string;
  tip: string;
  odd: string;
  isVIP: boolean;
  result: string;
  startPeriod: string;
  status: PredictionStatus;
};

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get("search") || "";
    const filter = searchParams.get("filter") || "";
    const sort = searchParams.get("sort") || "";
    const page = Number(searchParams.get("page")) || 1; // Default to page 1
    const limit = Number(searchParams.get("limit")) || 10; // Default to 10

    // Build query for filtering
    const query: any = {};
    if (filter) {
      // Assuming filter is a JSON string e.g. {"status": "active"}
      Object.assign(query, JSON.parse(filter));
    }

    // Perform the search if a search term is provided
    const searchQuery = search
      ? {
          $or: [
            { game: { $regex: search, $options: "i" } },
            { competition: { $regex: search, $options: "i" } },
            { tip: { $regex: search, $options: "i" } },
            { status: { $regex: search, $options: "i" } },
            { isVIP: { $regex: search, $options: "i" } },
            { result: { $regex: search, $options: "i" } },
          ],
        }
      : {};
    // Combine search and filter queries
    const combinedQuery = { ...query, ...searchQuery };

    // Sorting
    const sortOptions: any = {};
    if (sort) {
      // Assuming sort is a string like "fieldName:1" or "fieldName:-1"
      const [field, order] = sort.split(":");
      sortOptions[field] = order === "asc" ? 1 : -1; // Ascending or descending
    }

    // Pagination
    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const predictions = await Prediction.find(combinedQuery)
      .sort(sortOptions)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const totalPredictions = await Prediction.countDocuments(combinedQuery);
    const totalPages = Math.ceil(totalPredictions / pageSize);

    return NextResponse.json({
      data: predictions,
      totalPredictions,
      totalPages,
      currentPage: pageNumber,
      status: HttpStatusCode.Ok,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};

/*

export const POST = async (request: Request) => {
  try {
    await dbConnect();
    const body: CreatePredictionDTO = await request.json();
    if (!body) {
      return Response.json(
        { message: "Some fields are missing" },
        { status: HttpStatusCode.BadRequest }
      );
    }
    const prediction = await Prediction.create(body);
    return Response.json(
      { data: prediction },
      { status: HttpStatusCode.Created }
    );
  } catch (error) {
    return Response.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
};
*/

export const POST = async (request: Request) => {
  try {
    await dbConnect();
    const body: CreatePredictionDTO = await request.json();

    if (!body.startPeriod) {
      return NextResponse.json(
        { message: "start is required " },
        { status: HttpStatusCode.BadRequest }
      );
    }
    if (!body.game) {
      return NextResponse.json(
        { message: "game is required " },
        { status: HttpStatusCode.BadRequest }
      );
    }
    if (!body.competition) {
      return NextResponse.json(
        { message: "competition is required " },
        { status: HttpStatusCode.BadRequest }
      );
    }
    if (!body.tip) {
      return NextResponse.json(
        { message: "tip is required " },
        { status: HttpStatusCode.BadRequest }
      );
    }
    if (!body.odd) {
      return NextResponse.json(
        { message: "odd is required " },
        { status: HttpStatusCode.BadRequest }
      );
    }
    if (!body.result) {
      return NextResponse.json(
        { message: "result is required " },
        { status: HttpStatusCode.BadRequest }
      );
    }

    if (!body.status) {
      return NextResponse.json(
        { message: "status is required " },
        { status: HttpStatusCode.BadRequest }
      );
    }

    if (body.isVIP === undefined) {
      return NextResponse.json(
        { message: " isVIP required " },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const prediction = await Prediction.create(body);

    return NextResponse.json(
      { data: prediction },
      { status: HttpStatusCode.Created }
    );
  } catch (error) {
    console.error("Error creating prediction:", error); // Log the error for debugging
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
};
