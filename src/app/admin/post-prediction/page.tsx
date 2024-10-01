"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import {
  postAndEditPredictionSchema,
  PredictionStatus,
  PredictionType,
} from "../../../../utils/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInputField from "@/components/customInputField";
import { PredictionStatusSelect } from "@/components/customFormSelect";
import VIPSelect from "@/components/vipSelect";

import { toast, ToastContainer } from "react-toastify";
import { postPrediction } from "../../../../utils/predictions/actions";
import { Button } from "@/components/ui/button";

const PostPrediction = () => {
  const form = useForm<PredictionType>({
    resolver: zodResolver(postAndEditPredictionSchema),
    defaultValues: {
      competition: "",
      game: "",
      tip: "",
      odd: "",
      result: "pending",
      isVIP: false,
      status: PredictionStatus.Pending,
      startPeriod: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handlePost: SubmitHandler<PredictionType> = async (data) => {
    console.log("Submitted data:", data); // Log the submitted data
    const payload = {
      ...data,
      startPeriod: new Date(data.startPeriod).toISOString(),
    };
    try {
      const prediction = await postPrediction(payload);
      if (prediction) {
        toast.success("Prediction posted successfully!", {
          position: "top-center",
        });
        setSuccessMessage("Prediction posted successfully!");
        setErrorMessage(null);
        router.push("/admin/all-predictions"); // Adjust the path as needed
      } else {
        toast.success("Failed to post prediction.", {
          position: "bottom-center",
        });
        throw new Error("Failed to post prediction.");
      }
    } catch (error: any) {
      setErrorMessage(
        error.message || "An error occurred while posting the prediction."
      );
      setSuccessMessage(null);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handlePost)} // Properly handle submission
        className="flex flex-col items-center bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">
          Post Prediction
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
          Post Prediction
        </Button>
        <ToastContainer />
      </form>
    </Form>
  );
};

export default PostPrediction;
