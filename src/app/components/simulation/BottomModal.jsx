"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import robotImage from "/public/images/robot-head.png";
import backIcon from "/public/icons/back-arrow.png";
import mapIcon from "/public/icons/map.png";
import nextIcon from "/public/icons/conversation-next.png";
import useMapDisplay from "@/app/store/mapDisplay";
import useSimulationIndex from "@/app/store/simulationIndex";
import useCurrentStatus from "@/app/store/currentStatus";
import useSimulationHistory from "@/app/store/simulationHistory";
import { fetchTourDetailCommon } from "@/api/tourApi";

export default function BottomModal({ text, canGoNext, goNextIndex }) {
    const { currentIndex: currentPage, increaseIndex: goNextPage, decreaseIndex: goPrevPage } = useSimulationIndex();
    const { day, prevDay, setPlace, setLocation } = useCurrentStatus();
    const { simulationHistory, deleteEvent } = useSimulationHistory();
    const { showMap } = useMapDisplay();

    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextAbled, setNextAbled] = useState(false);

    // 타이핑 효과
    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, 50);

            return () => clearTimeout(timeout);
        } else {
            if (canGoNext) setNextAbled(true);
        }
    }, [currentIndex, text]);


    const onClickModal = () => {
        // 타이핑 효과 스킵
        if (currentText != text) {
            setCurrentIndex(text.length);
            setCurrentText(text);
            return;
        }
        // 다음 화면
        if (nextAbled) {
            if (currentPage == 3) { // Overview Page
                setCurrentText('');
                setCurrentIndex(0);
                goNextIndex();
            } else {
                goNextPage();
            }
        }
    }

    const onClickBack = async () => {
        if (currentPage == 0) {
            // 시뮬레이션 기록 삭제
            deleteEvent();

            // 이전 장소 이름, 위도경도로 변경
            const prevContentId = simulationHistory.at(-1).contentId;
            const data = await fetchTourDetailCommon(prevContentId);
            setPlace(data.title);
            setLocation(data.mapx, data.mapy);

            // 하루의 첫 번째 장소였으면 day -1
            if (simulationHistory.filter(x => x.day == day).length == 0) {
                prevDay();
            }
        }
        goPrevPage();
    }


    return (
        <div className="w-full h-auto flex flex-col items-center absolute bottom-5 left-1/2 transform -translate-x-1/2">
            <div className="w-11/12 flex flex-row justify-end mb-1.5 space-x-1.5">
                <div className="w-20 h-8 rounded-[10px] bg-white/70 shadow">
                    <h3 className="text-base text-black font-semibold text-center leading-8">
                        DAY {day}
                    </h3>
                </div>
                <div
                    onClick={onClickBack}
                    className="w-8 h-8 rounded-[10px] bg-black/70 shadow flex justify-center items-center">
                    <Image src={backIcon} width={25} height={25} alt="뒤로가기 아이콘" className="ml-px mb-[1.5px]" />
                </div>
                <div
                    onClick={showMap}
                    className="w-8 h-8 rounded-[10px] bg-black/70 shadow flex justify-center items-center">
                    <Image src={mapIcon} width={17} height={17} alt="지도 아이콘" />
                </div>
            </div>
            <div
                onClick={onClickModal}
                className="w-11/12 h-[126px] bg-black/70 rounded-[10px] shadow p-[17px] relative">
                <Image src={robotImage} width={150} height={150} alt="로봇 이미지" className="absolute -top-[120px] -left-5" />
                <div className="w-full h-full overflow-y-scroll">
                    <p id="chat" className="text-center text-base text-white font-medium whitespace-pre-line">
                        {currentText}
                    </p>
                </div>
                {nextAbled &&
                    <div
                        className="w-6 h-6 flex justify-center items-center absolute bottom-3 right-4 animate-pulse">
                        <Image src={nextIcon} width={15} height={9} alt="다음 아이콘" />
                    </div>}
            </div>
        </div>
    )
}