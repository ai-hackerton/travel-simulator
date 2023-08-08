"use client";
import { useRouter } from "next/navigation";
import useSimulationHistory from "../../store/simulationHistory";
import useTravelSettingsStore from "@/app/store/travelSettings";

export default function Page() {
  const router = useRouter();
  const { setSimulationHistory } = useSimulationHistory();
  const { setTravelSettings } = useTravelSettingsStore();

  // TODO: 더미 지우고 진짜 로그인 -> 가져오는 걸로 바꾸기
  const onMoveClick = () => {
    setSimulationHistory([
      { day: 1, contentid: "2994116", contentTypeId: 12 },
      { day: 1, contentid: "125658", contentTypeId: 12 },
      { day: 1, contentid: "125593", contentTypeId: 12 },
      { day: 1, contentid: "2798406", contentTypeId: 14 },
    ]);

    setTravelSettings({
      name: "이쁘니",
      date: "당일치기",
      city: "강릉시",
      startLocation: {
        title: "강릉역",
        coords: { x: "128.8995705", y: "37.7645689" },
        addr: "강원 강릉시 용지로 176",
      },
    });

    router.push("/result");
  };

  return (
    <div>
      안녕 로그인 부터 해야지??
      <button
        onClick={onMoveClick}
        style={{ width: 100, height: 100, backgroundColor: "red" }}
      >
        불러오기 (로그인)
      </button>
    </div>
  );
}
