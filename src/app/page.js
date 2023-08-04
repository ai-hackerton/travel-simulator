import Link from "next/link";

export default function Home() {
  return (
    <div className="flex grow flex-col justify-center items-center bg-main-200 text-white h-screen">
      <div className="flex grow flex-col justify-center items-center gap-y-12">
        {/* 제목 */}
        <div className="flex flex-col justify-center items-center gap-y-1">
          <h3 className="font-light text-white text-lg tracking-tight">
            가상 관광 시뮬레이션
          </h3>
          <h1 className="font-black text-white text-8xl">가관</h1>
          <h3 className="font-light text-white text-lg tracking-tight">
            GEN AI ∞ TOUR API
          </h3>
        </div>
        {/* 버튼 */}
        <div className="flex flex-col justify-center items-center gap-y-4">
          <Link href="/start">
            <button className="bg-white px-4 py-2 text-center text-black text-lg font-bold rounded-xl shadow-md hover:bg-main-200">
              새로운 시뮬레이션 시작하기
            </button>
          </Link>
          <button className="bg-white px-4 py-2 text-center text-black text-lg font-bold rounded-xl shadow-md hover:bg-main-200">
            시뮬레이션 기록보기
          </button>
        </div>
      </div>
    </div>
  );
}
