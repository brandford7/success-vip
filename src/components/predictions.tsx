"use client";

import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
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
import { Trash2, FilePenLine, X, Check } from "lucide-react";
import { Button } from "./ui/button";
import { deletePrediction } from "../../utils/predictions/actions";
import { PredictionType } from "../../utils/types";
import { useAuth } from "@/context/authContext";

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
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-center text-primary font-bold md:text-2xl mt-10 ">
        {header}
      </h1>

      <Table className=" mx-[50px] ">
        <TableCaption />
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Competition</TableHead>
            <TableHead className="w-[100px]">Match</TableHead>
            <TableHead className="w-[100px]">Tip</TableHead>
            <TableHead className="w-[20px]">Odd</TableHead>
            <TableHead className="w-[20px]">Result</TableHead>
            {user?.role == "admin" && (
              <TableHead className="w-[100px]">Actions</TableHead>
            )}
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
                {prediction?.result}
                {prediction?.status === "won" ? (
                  <Check className="text-green-500" />
                ) : prediction?.status === "lost" ? (
                  <X className="text-red-500" />
                ) : (
                  ""
                )}
              </TableCell>
              {user?.role == "admin" && (
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
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PredictionsTable;
