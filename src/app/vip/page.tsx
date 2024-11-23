import VIP from "@/components/vip";
import { fetchVIPPredictions } from "../../../utils/predictions/actions";

export default async function VipPage() {
  const predictions = await fetchVIPPredictions();
  return (
    <div>
      <VIP predictions={predictions} />
    </div>
  );
}
