"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import StaticRoadView from "../components/map/StaticRoadView";
import StartingModal from "../components/modal/StartingModal";
import { handleGetAudio } from "../constants/deepgram";
import useTravelSettingsStore from "../store/travelSettings";
import MapSelect from "../components/start/MapSelect";

export default function StartingPage() {
  const router = useRouter();
  const [processStatus, setProcessStatus] = useState(1); // number: 여행 설정 절차
  const [name, setName] = useState(""); // string: 여행자 이름
  const [date, setDate] = useState(""); // string: 여행 기간
  const [city, setCity] = useState("강릉시"); // string: 여행 장소
  const [startLocation, setStartLocation] = useState(""); // string: 시작 장소
  const [transcript, setTranscript] = useState(""); // string: 음성 응답
  const [isDropdownOpen, setDropdownOpen] = useState(false); // boolean: 드롭다운 메뉴
  const { travelSettings, setTravelSettings } = useTravelSettingsStore(); // zustand: 여행 설정 데이터 저장

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
          <p className="font-medium text-white text-lg">
            당신의 이름을 알려주세요!
          </p>
          <input
            className="bg-white bg-opacity-80 px-4 py-2 rounded-xl text-black"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
              className="flex flex-row flex-nowrap overflow-x-auto gap-x-2 scroll-smooth"
              style={{ cursor: "pointer" }}
            >
              <div
                className="bg-gray-500 rounded-lg px-4 py-2 shrink-0"
                onClick={() => setDate("당일치기")}
              >
                당일치기
              </div>
              <div
                className="bg-gray-500 rounded-lg px-4 py-2 shrink-0"
                onClick={() => setDate("1박 2일")}
              >
                1박 2일
              </div>
              <div
                className="bg-gray-500 rounded-lg px-4 py-2 shrink-0"
                onClick={() => setDate("2박 3일")}
              >
                2박 3일
              </div>
              <div
                className="bg-gray-500 rounded-lg px-4 py-2 shrink-0"
                onClick={() => setDate("3박 4일")}
              >
                3박 4일
              </div>
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
          <MapSelect />
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
            <button
              className="w-4/5 rounded-xl bg-white hover:bg-red-300 focus:bg-red-300 px-4 py-2 font-bold text-gray-800"
              onClick={() => setStartLocation("강릉역")}
            >
              강릉역
            </button>
            <button
              className="w-4/5 rounded-xl bg-white hover:bg-red-300 focus:bg-red-300 px-4 py-2 font-bold text-gray-800"
              onClick={() => setStartLocation("강릉 시외버스터미널")}
            >
              강릉 시외버스터미널
            </button>
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
              {startLocation}
            </p>
          </div>
          <p
            className="font-medium text-white text-lg text-center"
            style={{ whiteSpace: "normal", wordBreak: "keep-all" }}
          >
            위의 조건으로 <br />
            시뮬레이션을 시작해볼까요?
          </p>
        </>
      );
      break;
    default:
      content = null;
  }

  // Process 다음으로 넘기기
  const handleNextProcess = () => {
    if (processStatus === 1 && name) {
      setProcessStatus((prevStatus) => prevStatus + 1);
      setTravelSettings(name);
    } else if (processStatus === 2) {
      setProcessStatus((prevStatus) => prevStatus + 1);
    } else if (processStatus === 3 && date) {
      setProcessStatus((prevStatus) => prevStatus + 1);
      setTravelSettings(date);
    } else if (processStatus === 4) {
      // setProcessStatus((prevStatus) => prevStatus + 1);
    } else if (processStatus === 5 && startLocation) {
      setProcessStatus((prevStatus) => prevStatus + 1);
      setTravelSettings(startLocation);
    } else if (processStatus === 6) {
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
    </>
  );
}
