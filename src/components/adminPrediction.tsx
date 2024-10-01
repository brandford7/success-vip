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
import { Trash2, FilePenLine } from "lucide-react";
import { Button } from "./ui/button";
import { deletePrediction } from "../../utils/predictions/actions";

interface PredictionProps {
  predictions: PredictionType[] | null;
  header: string;
  search: string;
  currentPage: number;
}

const AdminPredictionsTable = ({
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
          <TableHead className="w-[20px]">Odd</TableHead>
          <TableHead className="w-[20px]">Result</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
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
            <TableCell className="flex gap-2 ">
              <Link
                href={`/admin/all-predictions/edit-prediction/${prediction._id}`}
              >
                <FilePenLine />
              </Link>

              <Button
                variant="link"
                onClick={() => deletePrediction(prediction._id)}
              >
                <Trash2 className="text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminPredictionsTable;
