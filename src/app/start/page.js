"use client";

import React, { useState, useEffect } from "react";

import StaticRoadView from "../components/map/StaticRoadView";
import StartingModal from "../components/modal/StartingModal";
import { handleGetAudio } from "../constants/deepgram";

export default function StartingPage() {
  const [processStatus, setProcessStatus] = useState(1); // number: 여행 설정 절차
  const [name, setName] = useState(""); // string: 여행자 이름
  const [date, setDate] = useState(""); // string: 여행 기간
  const [transcript, setTranscript] = useState(""); // string: 음성 응답
  const [isDropdownOpen, setDropdownOpen] = useState(false); // boolean: 드롭다운 메뉴

  useEffect(() => {
    // handleGetAudio(setTranscript);
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
            className="bg-gray-500 bg-opacity-80 px-4 py-2 rounded-xl"
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
              className="bg-gray-500 bg-opacity-80 px-4 py-2 rounded-xl mt-1"
              style={{ cursor: "pointer" }}
            >
              <div onClick={() => setDate("당일치기")}>당일치기</div>
              <div onClick={() => setDate("1박 2일")}>1박 2일</div>
              <div onClick={() => setDate("2박 3일")}>2박 3일</div>
              <div onClick={() => setDate("3박 4일")}>3박 4일</div>
            </div>
          )}
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
    } else if (processStatus === 2) {
      setProcessStatus((prevStatus) => prevStatus + 1);
    } else if (processStatus === 3 && date) {
      setProcessStatus((prevStatus) => prevStatus + 1);
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
    <div>
      <StaticRoadView
        lat={37.5756}
        lng={126.9768}
        pan={2}
        tilt={40}
        fov={100}
      />
      <StartingModal content={content} onClick={handleNextProcess} />
    </div>
  );
}
