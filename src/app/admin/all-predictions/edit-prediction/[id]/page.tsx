import React from "react";
import { fetchPrediction } from "../../../../../../utils/predictions/actions";
import EditPredictionForm from "@/components/editPredictionForm";

const EditPredictionPage = async ({ params }: { params: { id: string } }) => {
  const prediction = await fetchPrediction(params.id);

  return (
    <div>
      <EditPredictionForm prediction={prediction} predictionId={params.id} />
    </div>
  );
};

export default EditPredictionPage;
