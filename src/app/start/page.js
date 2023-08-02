"use client";

import React, { useState } from "react";

import RoadView from "../components/map/RoadView";
import StartingModal from "../components/modal/StartingModal";

export default function StartingPage() {
  const [processStatus, setProcessStatus] = useState(1);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  let content;

  switch (processStatus) {
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
    case 2:
      content = (
        <p className="font-medium text-white text-lg text-center">
          {name}님 반가워요~ <br />
          이제 여행 계획을 짜볼까요?
        </p>
      );
      break;
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

  const handleModalClick = () => {
    if (processStatus === 1 && name) {
      setProcessStatus((prevStatus) => prevStatus + 1);
    } else if (processStatus === 2) {
      setProcessStatus((prevStatus) => prevStatus + 1);
    } else if (processStatus === 3 && date) {
      setProcessStatus((prevStatus) => prevStatus + 1);
    }
  };

  return (
    <div>
      <RoadView />
      <StartingModal content={content} onClick={handleModalClick} />
    </div>
  );
}
