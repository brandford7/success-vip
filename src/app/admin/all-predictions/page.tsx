import Loading from "@/app/loading";
import { Suspense } from "react";
import { fetchPredictions } from "../../../../utils/predictions/actions";
import PredictionsTable from "@/components/predictions";

async function AllPredictions({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

  const predictions = await fetchPredictions({ search, currentPage });
  //const { predictions} = await fetchPredictions({ search, currentPage });

  return (
    <div className="">
      {/*  <SearchBar placeholder={"search prediction"} />*/}
      {/*    <Filter />*/}

      <Suspense key={search + currentPage} fallback={<Loading />}>
        <PredictionsTable
          predictions={predictions}
          header="All Predictions"
          search={search}
          currentPage={currentPage}
        />
      </Suspense>

      {/* </div>*/}

      {/* <Pagination />*/}
    </div>
  );
}

export default AllPredictions;
