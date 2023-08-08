"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import resultImage from "public/images/resultImage.png";
import resultImage2 from "public/images/resultImage.jpg";
import defaultImage from "public/images/default-image.png";

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

  const city =
    travelSettings?.city[travelSettings?.city?.length - 1] === "시"
      ? travelSettings?.city + "로"
      : travelSettings?.city + "으로";

  if (simulationHistory?.length && travelSettings) {
    return (
      <div className="h-screen bg-white overflow-y-scroll scrollbar-hide ">
        {/* <Image
        Image
        src={resultImage2}
        layout="fill"
        objectFit="cover"
        alt="배경화면"
      /> */}
        <div
          className=" py-5 px-5 bg-black/0 backdrop-blur-[1px] inset-0  flex flex-col "
          //  style={{backgroundColor: 'red'}}
        >
          <h2
            className="text-2xl font-semibold mb-8  "
            style={{ alignSelf: "start" }}
          >
            {city} 떠나는 여행
          </h2>

          <div className=" overflow-y-scroll flex flex-col scrollbar-hide ">
            {resultData?.map((el, idx) => {
              return (
                <div
                  key={"day_" + idx}
                  className="flex flex-col mb-10 "
                  style={{ height: 1000, width: "100%", flex: 1 }}
                >
                  <div
                    className="bg-main-200 px-2 py-1 text-white mb-3"
                    style={{ alignSelf: "start", borderRadius: 5 }}
                  >
                    DAY {idx + 1}
                  </div>
                  {el.map((p, index) => (
                    <div key={"result_" + idx + index}>
                      {/* <div>{p.title}</div> */}
                      <div
                        className="mb-3 shadow"
                        style={{
                          width: "100%",
                          height: 150,
                          borderRadius: 10,
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={p.firstimage || defaultImage}
                          alt="이미지"
                          className="object-cover"
                          fill={true}
                          // objectFit="cover"
                          // layout="fill"
                          // width={100}
                          // height={100}
                        />
                        <div
                          className="backdrop-blur-[1px]
                        bg-gradient-to-t from-black/60 text-white flex flex-col p-3 
                        "
                          style={{
                            position: "absolute",
                            right: 0,
                            bottom: 0,
                            height: "100%",
                            width: "100%",
                            justifyContent: 'flex-end', 
                          }}
                        >
                          <p className="text-lg text-bold">{p.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
