"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { editPrediction } from "../../utils/predictions/actions";
import {
  postAndEditPredictionSchema,
  PredictionStatus,
  PredictionType,
} from "../../utils/types";
import PredictionStatusSelect from "./customFormSelect";
import CustomInputField from "./customInputField";
import VIPSelect from "./vipSelect";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { useRouter } from "next/navigation";
import { toast, ToastContainer, useToast } from "react-toastify";

interface EditPredictionProps {
  prediction: PredictionType | null;
  predictionId: string;
}

const EditPredictionForm = ({
  prediction,
  predictionId,
}: EditPredictionProps) => {
  const form = useForm<PredictionType>({
    resolver: zodResolver(postAndEditPredictionSchema),
    defaultValues: {
      competition: prediction?.competition || "",
      game: prediction?.game || "",
      tip: prediction?.tip || "",
      odd: prediction?.odd || "",
      result: prediction?.result || "",
      isVIP: prediction?.isVIP || false,
      status: prediction?.status || PredictionStatus.Pending,
      startPeriod: prediction?.startPeriod || "",
    },
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleEdit: SubmitHandler<PredictionType> = async (data) => {
    //console.log("Submitted data:", data); // Log the submitted data
    const payload = {
      ...data,
      startPeriod: new Date(data.startPeriod).toISOString(),
    };
    try {
      const prediction = await editPrediction(predictionId, payload);
      if (prediction) {
        toast.success("Prediction updated successfully!", {
          position: "top-center",
        });
        setSuccessMessage("Prediction updated successfully!");
        setErrorMessage(null);
        router.push("/admin/all-predictions"); // Adjust the path as needed
      } else {
        toast.warn("Failed to update prediction.", {
          position: "bottom-center",
        });
        return "Failed to update prediction.";
      }
    } catch (error: any) {
      setErrorMessage(
        error.message || "An error occurred while updating the prediction."
      );
      setSuccessMessage(null);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleEdit)} // Properly handle submission
        className="flex flex-col items-center bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">
          Edit Prediction
        </h2>
        <CustomInputField name="competition" control={form.control} />
        <CustomInputField name="game" control={form.control} />
        <CustomInputField name="tip" control={form.control} />
        <CustomInputField name="odd" control={form.control} />
        <CustomInputField name="result" control={form.control} />
        <PredictionStatusSelect name="status" control={form.control} />
        <VIPSelect name="isVIP" control={form.control} />
        <label htmlFor="start-period">Start Period</label>
        <input
          id="startPeriod"
          type="date"
          {...form.register("startPeriod")} // Register the input for the form
          className="w-[300px] border-2 rounded-md border-black"
        />
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        <Button
          type="submit"
          variant="default"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Update Prediction
        </Button>
        <ToastContainer />
      </form>
    </Form>
  );
};

export default EditPredictionForm;
