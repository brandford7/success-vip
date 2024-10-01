import Loading from "@/app/loading";
import { Suspense } from "react";
import { fetchPredictions } from "../../../../utils/predictions/actions";
import AdminPredictionsTable from "@/components/adminPrediction";

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

  const {
    predictions,
   
  } = await fetchPredictions({ search, currentPage });
  //const { predictions} = await fetchPredictions({ search, currentPage });
  console.log(predictions);

  return (
    <div className="h-screen">
      {/*  <SearchBar placeholder={"search prediction"} />*/}
      {/*    <Filter />*/}

      <Suspense key={search + currentPage} fallback={<Loading />}>
        <AdminPredictionsTable
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

export default AllPredictions;
