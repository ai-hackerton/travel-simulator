"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//components
import StaticRoadView from "../components/map/StaticRoadView";
import StartingModal from "../components/modal/StartingModal";
import { handleGetAudio } from "../constants/deepgram";
import useTravelSettingsStore from "../store/travelSettings";
import MapSelect from "../components/start/MapSelect";

//hooks
import { useStartings } from "@/hooks/useStartings";
import { contourDensity } from "d3";
import { registerName } from "@/api/firebase";

//data
const DATES_ARR = ["당일치기", "1박 2일", "2박 3일", "3박 4일"];

export default function StartingPage() {
  const router = useRouter();
  const [processStatus, setProcessStatus] = useState(1); // number: 여행 설정 절차
  const [name, setName] = useState(""); // string: 여행자 이름
  const [date, setDate] = useState(""); // string: 여행 기간
  const [city, setCity] = useState(""); // string: 여행 장소
  const [isCityClicked, setIsCityClicked] = useState(false);
  const [startLocation, setStartLocation] = useState(null); // string: 시작 장소
  const [transcript, setTranscript] = useState(""); // string: 음성 응답
  const [isDropdownOpen, setDropdownOpen] = useState(false); // boolean: 드롭다운 메뉴
  const { travelSettings, setTravelSettings } = useTravelSettingsStore(); // zustand: 여행 설정 데이터 저장
  const [ alertMessage, setAlertMessage ] = useState(""); 

  const { filteredPlaces } = useStartings(city);

  console.log("travelSettings: ", travelSettings);

  useEffect(() => {
    // handleGetAudio(setTranscript); // 음성 인식
  }, []);

  useEffect(() => {
    handleVoiceAnswer();
  }, [transcript]);

  // 대화창에 출력되는 콘텐츠
  let content;
  switch (processStatus) {
    // 이름 입력
    case 1:
      content = (
        <>
          <div className="flex flex-col items-center gap-y-4">
            <p className="font-medium text-white text-lg">
              당신의 이름을 알려주세요!
            </p>
            <div className="w-full max-w-fit bg-white px-4 py-2 rounded-xl text-black">
              <input
                className="w-full bg-white"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </>
      );
      break;
    // 이름 입력 완료
    case 2:
      content = (
        <p className="font-medium text-white text-lg text-center">
          {name}님 반가워요~ <br />
          이제 여행 계획을 짜볼까요?
        </p>
      );
      break;
    // 여행 기간 입력
    case 3:
      content = (
        <>
          <p className="font-medium text-white text-lg">
            여행 기간은 며칠이 좋을까요?
          </p>
          <div
            className="bg-gray-500 bg-opacity-80 px-4 py-2 rounded-xl"
            style={{ cursor: "pointer" }}
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            {date || "여행 기간 선택"}
          </div>
          {isDropdownOpen && (
            <div
              className="flex flex-row flex-nowrap overflow-x-auto gap-x-2 scroll-smooth scrollbar-hide"
              style={{ cursor: "pointer" }}
            >
              {DATES_ARR.map((el, idx) => (
                <div
                  key={"dates_idx_" + idx}
                  className="bg-gray-500 rounded-lg px-4 py-2 shrink-0"
                  onClick={() => setDate(el)}
                >
                  {el}
                </div>
              ))}
            </div>
          )}
        </>
      );
      break;
    // 여행 장소 선정
    case 4:
      content = (
        <>
          <p className="font-medium text-white text-lg">
            어디로 가고 싶으신가요?
          </p>
          <MapSelect
            city={city}
            setCity={setCity}
            setIsCityClicked={setIsCityClicked}
          />

          {/* {city !== "" && <div className="text-white">{city}</div>} */}
        </>
      );
      break;
    // 시뮬레이션 시작 장소
    case 5:
      content = (
        <>
          <p
            className="font-medium text-white text-lg text-center"
            style={{ whiteSpace: "normal", wordBreak: "keep-all" }}
          >
            시뮬레이션을 시작할 장소를 골라주세요.
          </p>
          <div className="w-full flex flex-col justify-center items-center gap-y-4">
            {filteredPlaces?.map((el, idx) => {
              return (
                <button
                  key={"location_index_" + idx}
                  className="w-4/5 rounded-xl bg-white hover:bg-red-300 focus:bg-red-300 px-4 py-2 font-bold text-gray-800"
                  onClick={() => setStartLocation(el)}
                >
                  {el.title}
                </button>
              );
            })}
          </div>
        </>
      );
      break;
    // 여행 시뮬레이션 설정 확인
    case 6:
      content = (
        <>
          <div className="w-full flex flex-col gap-y-1 justify-center items-center">
            <p className="font-medium text-white text-lg">
              <span className="text-red-100">여행 기간: </span>
              {date}
            </p>
            <p className="font-medium text-white text-lg">
              <span className="text-red-100">여행 도시: </span>
              {city}
            </p>
            <p className="font-medium text-white text-lg">
              <span className="text-red-100">시작 장소: </span>
              {startLocation?.title}
            </p>
          </div>
          <p
            className="font-medium text-white text-lg text-center"
            style={{ whiteSpace: "normal", wordBreak: "keep-all" }}
          >
            위 조건으로 <br />
            시뮬레이션을 시작해볼까요?
          </p>
        </>
      );
      break;
    default:
      content = null;
  }

  // Process 다음으로 넘기기
  const handleNextProcess = (e) => {
    e.preventDefault();
    if (processStatus === 1 && name) {
      const login = async () => {
        var success = await registerName(name); // 로그인(이름등록) 성공하면 true, 중복이거나 에러 나면 false 반환
        if (success) {
          setProcessStatus((prevStatus) => prevStatus + 1);
        } else {
          setAlertMessage("이미 존재하는 이름입니다");
          setTimeout(() => {
            setAlertMessage("");
          }, 2000);
        }
      }
      login();
    } else if (processStatus === 2) {
      setProcessStatus((prevStatus) => prevStatus + 1);
    } else if (processStatus === 3 && date) {
      setProcessStatus((prevStatus) => prevStatus + 1);
    } else if (processStatus === 4 && city) {
      if (isCityClicked) {
        setProcessStatus((prevStatus) => prevStatus + 1);
      }
    } else if (processStatus === 5 && startLocation) {
      setProcessStatus((prevStatus) => prevStatus + 1);
    } else if (processStatus === 6) {
      // 선택 완료시 저장하고 넘어가기
      setTravelSettings({
        name,
        date,
        city,
        startLocation,
      });

      router.push("/simulation");
    }
  };

  // Process 이전으로 돌리기
  const handleBackProcess = () => {
    if (processStatus === 2) {
      setProcessStatus((prevStatus) => prevStatus - 1);
    } else if (processStatus === 3) {
      setProcessStatus((prevStatus) => prevStatus - 1);
    } else if (processStatus === 4) {
      setProcessStatus((prevStatus) => prevStatus - 1);
    } else if (processStatus === 5) {
      setProcessStatus((prevStatus) => prevStatus - 1);
    } else if (processStatus === 6) {
      setProcessStatus((prevStatus) => prevStatus - 1);
    }
  };

  // 말하기를 통해 핸들링
  const handleVoiceAnswer = () => {
    if (
      transcript === "그래" ||
      transcript === "응" ||
      transcript === "네" ||
      transcript === "좋아" ||
      transcript === "다음" ||
      transcript === "좋았어" ||
      transcript === "예"
    ) {
      handleNextProcess();
      setTranscript("");
    } else if (
      transcript === "아니" ||
      transcript === "이전" ||
      transcript === "뒤로"
    ) {
      handleBackProcess();
      setTranscript("");
    }
  };

  return (
    <>
      <StaticRoadView
        lat={37.5756}
        lng={126.9768}
        pan={2}
        tilt={40}
        fov={100}
      />
      <StartingModal content={content} onClick={handleNextProcess} />
      <AlertMessage message={alertMessage} />
    </>
  );
}

function AlertMessage({message}) {
  if (message == "") return;

  return (
    <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 z-50 bg-black/70 rounded-full px-[17px] text-white text-base font-normal leading-8">
      이미 존재하는 이름입니다
    </div>
  )
}