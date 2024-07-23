import axios from "axios";
import { cache } from "react";
import { axiosInstance } from "../config";
import { useSearchParams } from "next/navigation";


export const fetchAllPredictions = cache(async () => {
    
    const predictions = await axiosInstance(``)
});
