"use client";
import useTravelSettingsStore from "../../store/travelSettings";

import Image from "next/image";
import backArrow from "public/icons/back-arrow.png";

import { useRouter } from "next/navigation";

export default function TopTripInfo() {
  const { travelSettings } = useTravelSettingsStore();
  const router = useRouter();

  const onBackClick = () => {
    router.push("/");
  };

  return (
    <div className="relative">
      <div className="text-light text-gray-600">{travelSettings?.name}님</div>
      <h2
        className="text-2xl font-semibold mb-1 text-main-200"
        style={{ alignSelf: "start" }}
      >
        <span className="text-2xl text-black">행복한</span>{" "}
        {travelSettings?.city.slice(0, -1)} {travelSettings?.date}
        {/* 행복한  {city} {travelSettings.date}  */}
      </h2>
      <h2 className="text-xl font-base mb-5  " style={{ alignSelf: "start" }}>
        여행 되세요!
      </h2>

      <div
        onClick={() => {
          onBackClick();
        }}
        className="w-8 h-8 rounded-[10px] bg-black/70 shadow flex justify-center items-center absolute"
        style={{top: 5, right: 5}}
      >
        <Image
          src={backArrow}
          width={25}
          height={25}
          alt="뒤로가기 아이콘"
          className="ml-px mb-[1.5px]"
        />
      </div>
    </div>
  );
}
