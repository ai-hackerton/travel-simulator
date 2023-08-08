import Image from "next/image";
import Link from "next/link";

import bgImage from "public/images/backgroundImage.gif";

export default function Home() {
  return (
    <div className="flex grow flex-col justify-center items-center bg-gray-800 text-white h-screen">
      <Image
        Image
        src={bgImage}
        layout="fill"
        objectFit="cover"
        alt="배경화면"
      />
      <div className="fixed flex grow flex-col justify-center items-center gap-y-12">
        {/* 제목 */}
        <div className="flex flex-col justify-center items-center gap-y-1 bg-gray-800 bg-opacity-75 px-4 py-4 rounded-lg">
          <h3 className="font-light text-white text-lg tracking-tight">
            <span className="text-main-100 font-medium">가상 관광</span>{" "}
            시뮬레이션
          </h3>
          <h1 className="font-black text-main-100 text-8xl">가관</h1>
          <h3 className="font-light text-white text-lg tracking-tight">
            GEN AI ∞ TOUR API
          </h3>
        </div>
        {/* 버튼 - position: fixed */}
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center gap-y-4 w-full">
          <Link
            href="/start"
            className="w-full flex flex-col justify-center items-center"
          >
            <button className="w-4/5 bg-white px-4 py-2 text-center text-black text-lg font-bold rounded-xl shadow-md hover:bg-red-300">
              새로운 시뮬레이션 시작하기
            </button>
          </Link>
          <button className="w-4/5 bg-white px-4 py-2 text-center text-black text-lg font-bold rounded-xl shadow-md hover:bg-red-300">
            시뮬레이션 기록보기
          </button>
        </div>
      </div>
    </div>
  );
}
