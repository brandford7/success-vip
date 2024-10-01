"use client";
import { VscCheck, VscChromeClose } from "react-icons/vsc";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQueryClient } from "react-query";
import { usePredictions } from "@/app/context/predictionContext";
import { useAuth } from "@/app/context/authContext";
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
import { headers } from "next/headers";
// Define a mutation function for deleting a prediction

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
    <Table className=" mx-[50px]">
      <TableCaption className="">{header}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Competition</TableHead>
          <TableHead className="w-[100px]">Match</TableHead>
          <TableHead className="w-[100px]">Tip</TableHead>
          <TableHead className="w-[50px]">Odd</TableHead>
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
            <TableCell>{prediction?.result}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PredictionsTable;