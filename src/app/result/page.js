"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useSimulationHistory from "../store/simulationHistory";
import useTravelSettingsStore from "../store/travelSettings";

//componenets
import TopTripInfo from "../components/result/TopTripInfo";
import ResultList from "../components/result/ResultList"

export default function Page() {
  const { simulationHistory } = useSimulationHistory();
  const { travelSettings } = useTravelSettingsStore();

  const router = useRouter();

  useEffect(() => {
    if (!simulationHistory.length || !travelSettings) {
      router.push("/result/login");
    }
  }, []);


  if (simulationHistory?.length && travelSettings) {
    return (
      <div className="h-screen bg-white overflow-y-scroll scrollbar-hide py-5 px-5  flex flex-col ">
        <TopTripInfo />
        <ResultList />
      </div>
    );
  } else {
    return null;
  }
}
