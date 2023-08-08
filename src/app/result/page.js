"use client";

import useSimulationHistory from "../store/simulationHistory";

export default function Page() {
  const { simulationHistory } = useSimulationHistory();
  console.log("result에용 ", simulationHistory);
  return <div>hihi</div>;
}
