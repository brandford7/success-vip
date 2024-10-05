import React from "react";
import { PredictionType } from "../../utils/types";
import { filterPredictionsByDate } from "../../utils/predictions/actions";
import { start } from "repl";

interface FilterProps {
  predictions: PredictionType[];
  date: string;
}

const PredictionFilter = async (formdata: FormData,date:string) => {
  const predictions = await filterPredictionsByDate(date);
  //startPeriod = formdata.get("startPeriod", startPeriod);

  return (
    <form>
      <input
        id="startPeriod"
        type="date"
        className="w-[300px] border-2 rounded-md border-black"
      />
    </form>
  );
};

export default PredictionFilter;
