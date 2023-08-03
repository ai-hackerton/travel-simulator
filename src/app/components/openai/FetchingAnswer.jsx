"use client";

import { fetchGptAnswer } from "@/api/openaiApi";

// TODO: 속도가 오래걸림 ㅎ.ㅎ
export default function FetchingAnswer() {
  const onButtonClick = async (e) => {
    e.preventDefault();
    await fetchGptAnswer("아바이마을");
  };
  return (
    <div
      style={{ backgroundColor: "red", width: 100, height: 100 }}
      onClick={(e) => {
        console.log("1234");
        onButtonClick(e);
      }}
    >
      click here
    </div>
  );
}
