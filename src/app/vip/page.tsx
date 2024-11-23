import VIP from "@/components/vip";
import { fetchVIPPredictions } from "../../../utils/predictions/actions";
import ProtectedRoute from "@/components/protectedRoute";

export default async function VipPage() {
  const predictions = await fetchVIPPredictions();
  return (
    <ProtectedRoute>
      <div >
        <VIP predictions={predictions} />
      </div>
    </ProtectedRoute>
  );
}
