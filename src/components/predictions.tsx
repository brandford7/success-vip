"use client";
import { Check, X } from "lucide-react";
import { PredictionType } from "../../utils/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface PredictionProps {
  predictions: PredictionType[] | null;
  header: string;
  search: string;
  currentPage: number;
}

const PredictionsTable = ({
  predictions,
  header,
  search,
  currentPage,
}: PredictionProps) => {
  return (
    <div>
      <h1 className="text-center text-primary font-bold md:text-2xl mt-10 ">
        {header}
      </h1>
      <Table className=" mx-[50px]  ">
        <TableCaption />
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Competition</TableHead>
            <TableHead className="w-[100px]">Match</TableHead>
            <TableHead className="w-[100px]">Tip</TableHead>
            <TableHead className="w-[100px]">Odd</TableHead>
            <TableHead className="w-[100px]">Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {predictions?.map((prediction) => (
            <TableRow key={prediction?._id}>
              <TableCell className="font-medium">
                {prediction?.competition}
              </TableCell>
              <TableCell>{prediction?.game}</TableCell>
              <TableCell>{prediction?.tip}</TableCell>
              <TableCell>{prediction?.odd}</TableCell>
              <TableCell>
                {prediction?.result}{" "}
                {prediction?.status === "won" ? (
                  <Check className="text-green-500" />
                ) : prediction?.status === "lost" ? (
                  <X className="text-red-500" />
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PredictionsTable;
