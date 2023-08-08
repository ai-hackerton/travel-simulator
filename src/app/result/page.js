"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import resultImage from "public/images/resultImage.png";
import resultImage2 from "public/images/resultImage.jpg";

import useSimulationHistory from "../store/simulationHistory";
import useTravelSettingsStore from "../store/travelSettings";
import { usePlaces } from "@/hooks/usePlaces";

export default function Page() {
  const { simulationHistory } = useSimulationHistory();
  const { travelSettings } = useTravelSettingsStore();
  const { getPlacesFromLocalDataWithHistory } = usePlaces();
  const router = useRouter();

  const resultData = getPlacesFromLocalDataWithHistory();

  // TODO: 시뮬레이션 히스토리 있는지 없는지.. 체크 (로그인 or not)

  useEffect(() => {
    if (!simulationHistory.length || !travelSettings) {
      router.push("/result/login");
    }
  }, []);

  return (
    <div className="h-screen">
      <Image
        Image
        src={resultImage2}
        layout="fill"
        objectFit="cover"
        alt="배경화면"
      />
      <div className="fixed  backdrop-blur-[1px]">
        {resultData?.map((el, idx) => {
          return (
            <div key={"day_" + idx}>
              <div>DAY {idx + 1}</div>
              {el.map((p, index) => (
                <div key={"result_" + idx + index}>{p.title}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
