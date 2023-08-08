"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useSimulationHistory from "../store/simulationHistory";
import useTravelSettingsStore from "../store/travelSettings";

export default function Page() {
  const { simulationHistory } = useSimulationHistory();
  const { travelSettings } = useTravelSettingsStore();
  const router = useRouter();
  console.log("result에용 ", simulationHistory);

  // TODO: 시뮬레이션 히스토리 있는지 없는지.. 체크 (로그인 or not)

  useEffect(() => {
    if (!simulationHistory.length || !travelSettings) {
      router.push("/result/login");
    }
  }, []);

  // if (simulationHistory.length) {
  return <div>hihi</div>;
  // } else {
  //   return <div>아무 것도 없네용~ 로그인 페이지로 이동이동~</div>;
  // }
}
