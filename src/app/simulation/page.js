"use client"

import { useState } from "react";
import BottomModal from "../components/simulation/BottomModal";
import PlaceOptionModal from "../components/simulation/PlaceOptionModal";
import MapModal from "../components/simulation/MapModal";
import OptionModal from "../components/simulation/OptionModal";
import ImageModal from "../components/simulation/ImageModal";


export default function SimulationPage() {
    const [currentPage, setCurrentPage] = useState(0);

    const day = 1;
    const place = "강릉역";
    const location = [37.7637611, 128.8990861];

    const allPages = ["Arrival", "SelectType", "SelectPlace", "Overview", "Moving"];

    const goNextPage = () => {
        if (currentPage < allPages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            console.log("시뮬레이션 종료");
            // 결과 페이지로 이동
        }
    };

    const goPrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    function CurrentPage() {
        switch (currentPage) {
            case 0:
                return <ArrivalPage />;
            case 1:
                return <SelectTypePage />;
            case 2:
                return <SelectPlacePage />;
            case 3:
                return <OverviewPage />;
            case 4:
                return <MovingPage />;
    }}

    function ArrivalPage() {
        return <>
            <BottomModal 
                day={day} 
                text={`휴.. 오늘 정말 덥죠?\n 드디어 ${place}에 왔네요 하하~`} 
                handleNext={goNextPage}
                handleBack={null}
            />
        </>
    }

    function SelectTypePage() {
        return <>
            <OptionModal/>
            <BottomModal
                day={day}
                text={`머시기~ 이제 어디를 가볼까요?`} 
                handleNext={goNextPage}
                handleBack={goPrevPage}
            />
        </>
    }

    function SelectPlacePage() {
        return <>
            <PlaceOptionModal/>
            <BottomModal
                day={day}
                text={`가까운 ~~~ 몇 군데를 추천해드릴게요`} 
                handleNext={goNextPage}
                handleBack={goPrevPage}
            />
        </>
    }

    function OverviewPage() {
        return <>
            <ImageModal/>
            <BottomModal
                day={day}
                text={`강릉 사천면 모래내한과마을은 전통방식으로 맛있는 한과를 생산하는 고소득 마을입니다.`} 
                handleNext={goNextPage}
                handleBack={goPrevPage}
            />
        </>
    }

    function MovingPage() {
        return <>
            <BottomModal
                day={day}
                text={`~로 이동 중입니다`} 
                handleNext={goNextPage}
                handleBack={goPrevPage}
            />
        </>
    }
    

    return (
        <div className="w-full h-screen bg-[#9ca3af]">
            <CurrentPage />
            <MapModal location={location} />
        </div>
    );
}