"use client"

import { useState } from "react";
import BottomModal from "../components/simulation/BottomModal";
import PlaceOptionModal from "../components/simulation/PlaceOptionModal";
import MapModal from "../components/simulation/MapModal";
import OptionModal from "../components/simulation/OptionModal";
import ImageModal from "../components/simulation/ImageModal";
import useSimulationIndex from "../store/simulationIndex";


export default function SimulationPage() {
    const { currentIndex } = useSimulationIndex();

    const day = 1;
    const place = "강릉역";

    function CurrentPage() {
        switch (currentIndex) {
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
            />
        </>
    }

    function SelectTypePage() {
        return <>
            <OptionModal/>
            <BottomModal
                day={day}
                text={`머시기~ 이제 어디를 가볼까요?`} 
            />
        </>
    }

    function SelectPlacePage() {
        return <>
            <PlaceOptionModal/>
            <BottomModal
                day={day}
                text={`가까운 ~~~ 몇 군데를 추천해드릴게요`} 
            />
        </>
    }

    function OverviewPage() {
        return <>
            <ImageModal/>
            <BottomModal
                day={day}
                text={`강릉 사천면 모래내한과마을은 전통방식으로 맛있는 한과를 생산하는 고소득 마을입니다.`} 
            />
        </>
    }

    function MovingPage() {
        return <>
            <BottomModal
                day={day}
                text={`~로 이동 중입니다`} 
            />
        </>
    }
    

    return (
        <div className="w-full h-screen bg-[#9ca3af]">
            <CurrentPage />
            <MapModal />
        </div>
    );
}