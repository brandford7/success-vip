import { fetchTodayPredictions } from "../../utils/predictions/actions";
import SearchBar from "@/components/searchBar";
import { Suspense } from "react";
import Loading from "./loading";
import PredictionsTable from "@/components/predictions";
import { GoogleTagManager } from "@next/third-parties/google";
import Hero from "@/components/hero";

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

  return (
    <div >
      {/*  <SearchBar placeholder={"search prediction"} />*/}
      {/*    <Filter />*/}
      <Hero />
      <Suspense key={search + currentPage} fallback={<Loading />}>
        <PredictionsTable
          predictions={predictions}
          header="Free Predictions"
          search={search}
          currentPage={currentPage}
        />
      </Suspense>

      {/* </div>*/}
      {/*google tag mananger */}
      <GoogleTagManager gtmId={"G-4DPV6V4MS0"} />

      {/* <Pagination />*/}
    </div>
  );
}

export default HomePage;
