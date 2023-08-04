"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import robotImage from "/public/images/robot-head.png";
import backIcon from "/public/icons/back-arrow.png";
import mapIcon from "/public/icons/map.png";
import nextIcon from "/public/icons/conversation-next.png";
import useMapDisplay from "@/app/store/mapDisplay";

export default function BottomModal({ day, text, handleNext, handleBack }) {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextAbled, setNextAbled] = useState(false);

    const showMap = useMapDisplay((state) => state.showMap);

    // 타이핑 효과
    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, 50);

            return () => clearTimeout(timeout);
        } else {
            if (handleNext) setNextAbled(true);
        }
    }, [currentIndex, text]);

    return (
        <div className="w-full h-auto flex flex-col items-center absolute bottom-5 left-1/2 transform -translate-x-1/2">
            <div className="w-11/12 flex flex-row justify-end mb-1.5 space-x-1.5">
                <div className="w-20 h-8 rounded-[10px] bg-white/70 shadow">
                    <h3 className="text-base text-black font-semibold text-center leading-8">
                        DAY {day}
                    </h3>
                </div>
                {handleBack &&
                    <div
                        onClick={handleBack}
                        className="w-8 h-8 rounded-[10px] bg-black/70 shadow flex justify-center items-center">
                        <Image src={backIcon} width={25} height={25} alt="뒤로가기 아이콘" className="ml-px mb-[1.5px]" />
                    </div>}
                <div
                    onClick={showMap}
                    className="w-8 h-8 rounded-[10px] bg-black/70 shadow flex justify-center items-center">
                    <Image src={mapIcon} width={17} height={17} alt="지도 아이콘" />
                </div>
            </div>
            <div className="w-11/12 h-[126px] bg-black/70 rounded-[10px] shadow p-5 relative">
                <Image src={robotImage} width={150} height={150} alt="로봇 이미지" className="absolute -top-28 -left-5" />
                <p id="chat" className="text-center text-base text-white font-medium">
                    {currentText}
                </p>
                {nextAbled &&
                    <div
                        onClick={handleNext}
                        className="w-6 h-6 flex justify-center items-center absolute bottom-4 right-4 animate-pulse">
                        <Image src={nextIcon} width={15} height={9} alt="다음 아이콘" />
                    </div>}
            </div>
        </div>
    )
}