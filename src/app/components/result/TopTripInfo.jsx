"use client";
import useTravelSettingsStore from "../../store/travelSettings";

export default function TopTripInfo() {
  const { travelSettings } = useTravelSettingsStore();

  return (
    <div>
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
    </div>
  );
}
