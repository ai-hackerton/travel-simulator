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
              text="응! 즐거운 여행이었어"
              onClick={() => handleSimulationEnd()}
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center space-y-2 relative">
            <OptionButton
              text="응, 가서 푹 쉬는 게 좋겠어"
              onClick={() => handleClick(32)}
            />
          </div>
        )
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center space-y-2 relative">
          <OptionButton text="관광지에 가서 관광을 즐길래" onClick={() => handleClick(12)} />
          <OptionButton text="근처의 문화시설이 궁금해" onClick={() => handleClick(14)} />
          <OptionButton text="배고픈데 밥이나 먹으러 갈까" onClick={() => handleClick(39)} />
          <OptionButton text="신나는 액티비티가 하고 싶어" onClick={() => handleClick(28)} />
          {isLastDay ?
            !first && <OptionButton text="이제 그만 시뮬레이션을 종료할래" onClick={() => handleSimulationEnd()} /> :
            <OptionButton text="숙소에 가서 푹 쉬고 싶어" onClick={() => handleClick(32)} />}
        </div>
      )}
    </div>
  );
}
