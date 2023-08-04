// d3.js 로 구현 예정

import React from "react";
import Image from "next/image";

import mapGangWon from "/public/images/map-gangwon.png";

export default function MapSelect() {
  return (
    <div className="w-full flex flex-row justify-center items-center relative">
      <Image src={mapGangWon} width={280} height={280} alt="강원도 지도" />
      <div className="absolute top-12 left-3">
        <button className="text-black font-black">철원군</button>
      </div>
      <div className="absolute top-16 left-16">
        <button className="text-black font-black">철원군</button>
      </div>
    </div>
  );
}
