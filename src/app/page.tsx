import {

  fetchTodayPredictions,
  
} from "../../utils/predictions/actions";
import SearchBar from "@/components/searchBar";
import { Suspense } from "react";
import Loading from "./loading";
import PredictionsTable from "@/components/predictions";

async function HomePage({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

const predictions = await fetchTodayPredictions();
console.log(predictions);

  return (
    <div className="h-screen">
      {/*  <SearchBar placeholder={"search prediction"} />*/}
      {/*    <Filter />*/}

      <Suspense key={search + currentPage} fallback={<Loading />}>
        <PredictionsTable
          predictions={predictions}
          header="Free Predictions"
          search={search}
          currentPage={currentPage}
        />
      </Suspense>

      {/* </div>*/}

      {/* <Pagination />*/}
    </div>
  );
}

export default HomePage;
