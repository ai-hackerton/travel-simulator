"use client";

import { useRouter } from "next/navigation";

import useCurrentStatus from "@/app/store/currentStatus";
import OptionButton from "./OptionButton";
import useSimulationIndex from "@/app/store/simulationIndex";
import useTravelSettingsStore from "@/app/store/travelSettings";
import { uploadRecord } from "@/api/firebase";
import useSimulationHistory from "@/app/store/simulationHistory";

export default function TypeOptionModal({ endTheDay, isLastDay, first }) {
  const router = useRouter();

  const { setContentTypeId } = useCurrentStatus();
  const { increaseIndex: goNextPage } = useSimulationIndex();
  const { travelSettings } = useTravelSettingsStore();
  const { simulationHistory } = useSimulationHistory();

  const handleClick = (contentTypeId) => {
    setContentTypeId(contentTypeId);
    goNextPage();
  };

  const handleSimulationEnd = () => {
    const name = travelSettings.name;
    uploadRecord(name, { travelSettings: travelSettings, simulationHistory: simulationHistory });
    router.push("/result");
  };

  return (
    <div className="w-full h-[242px] absolute top-[40%] transform -translate-y-1/2">
      {endTheDay ? (
        isLastDay ? (
          <div className="w-full h-full flex flex-col justify-center items-center space-y-2 relative">
            <OptionButton
              text="시뮬레이션 종료~"
              onClick={() => handleSimulationEnd()}
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center space-y-2 relative">
            <OptionButton
              text="그랭 이제 숙소 가서 쉬자"
              onClick={() => handleClick(32)}
            />
          </div>
        )
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center space-y-2 relative">
          <OptionButton text="관광지 갈래" onClick={() => handleClick(12)} />
          <OptionButton text="문화시설 갈래" onClick={() => handleClick(14)} />
          <OptionButton text="밥 먹을래" onClick={() => handleClick(39)} />
          <OptionButton text="레포츠 할래" onClick={() => handleClick(28)} />
          {isLastDay ?
            !first && <OptionButton text="시뮬레이션 종료~" onClick={() => handleSimulationEnd()} /> :
            <OptionButton text="숙소 갈래" onClick={() => handleClick(32)} />}
        </div>
      )}
    </div>
  );
}
