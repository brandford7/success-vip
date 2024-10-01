import mongoose, { model, models, Schema } from "mongoose";

const PredictionSchema = new Schema(
  {
    game: {
      type: String,
      required: true,
      index: true,
    },
    competition: {
      type: String,
      required: true,
      index: true,
    },
    startPeriod: {
      type: String,
      required: true,
      index: true,
    },
    tip: {
      type: String,
      required: true,
      index: true,
    },
    result: {
      type: String,
      default: "pending",
      index: true,
    },
    odd: {
      type: String,
      index: true,
    },
    isVIP: {
      type: Boolean,
      default: false, // Set to true for VIP predictions
    },
    status: {
      type: String,
      enum: ["pending", "won", "lost"],
      default: "pending",
      index: true,
    },

    // Add more fields as needed
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Prediction = models.Prediction || model("Prediction", PredictionSchema);

export default Prediction;
