import { z } from "zod";

export type PredictionType = {
  _id: string;
  competition: string;
  game: string;
  tip: string;
  odd: string;
  isVIP: boolean;
  result: string;
  startPeriod: string;
  status: PredictionStatus;
};

export enum PredictionStatus {
  Pending = "pending",
  Won = "won",
  Lost = "lost",
}

export const postAndEditPredictionSchema = z.object({
  competition: z.string().min(2, {
    message: "competition must be at least 2 characters.",
  }),
  game: z.string().min(5, {
    message: "game must be at least 5 characters.",
  }),
  tip: z.string().min(2, {
    message: "tip must be at least 2 characters.",
  }),
  result: z
    .string()
    .min(2, { message: "result must be at least 2 characters" }),
  status: z.nativeEnum(PredictionStatus),
  odd: z.string().min(1, { message: "odd must be at least 1 character" }),
  startPeriod: z.string(),
  // TODO: add validation for startPeriod format
  isVIP: z.boolean(),
});
export type PostAndEditPredictionType = z.infer<
  typeof postAndEditPredictionSchema
>;
