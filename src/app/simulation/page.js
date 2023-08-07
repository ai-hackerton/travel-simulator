"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

import StaticRoadView from "../components/map/StaticRoadView";
import MapModal from "../components/simulation/MapModal";
import PlaceLabel from "../components/simulation/PlaceLabel";
import BottomModal from "../components/simulation/BottomModal";
import TypeOptionModal from "../components/simulation/TypeOptionModal";
import PlaceOptionModal from "../components/simulation/PlaceOptionModal";
import ImageModal from "../components/simulation/ImageModal";
import OverviewOptionModal from "../components/simulation/OverviewOptionModal";

import useSimulationIndex from "../store/simulationIndex";
import useCurrentStatus from "../store/currentStatus";
import useSimulationHistory from "../store/simulationHistory";

import { fetchLocationBasedTourData } from "@/api/tourApi";
import carImage from "/public/images/car.png";


export default function SimulationPage() {
    const { currentIndex } = useSimulationIndex();
    const { location } = useCurrentStatus();

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


    return (
        <>
            <StaticRoadView
                lat={location.y}
                lng={location.x}
                pan={2}
                tilt={40}
                fov={100}
            />
            <CurrentPage />
            <MapModal />
        </>
    );
}


// 0
function ArrivalPage() {
    const { simulationHistory } = useSimulationHistory();
    const { place } = useCurrentStatus();
    const bottomText = `휴.. 오늘 정말 덥죠?\n 드디어 ${place}에 왔네요 하하~`;

    console.log(simulationHistory);

    return <>
        <PlaceLabel/>
        <BottomModal 
            text={bottomText} 
            canGoNext={true}
        />
    </>
}


// 1
function SelectTypePage() {
    const bottomText = `머시기~ 이제 어디를 가볼까요?`;

    return <>
        <PlaceLabel/>
        <TypeOptionModal/>
        <BottomModal
            text={bottomText} 
            canGoNext={false}
        />
    </>
}


// 2
function SelectPlacePage() {
    const { location, contentTypeId } = useCurrentStatus();
    const [placeList, setPlaceList] = useState(null);

    const bottomText = (contentTypeId) => {
        switch (contentTypeId) {
            case 12:
                return "가까운 관광지 몇 군데를 추천해드릴게요~";
            case 14:
                return "가까운 문화시설 몇 군데를 추천해드릴게요~";
            case 28:
                return "레포츠를 즐길 수 있는 곳들이에요~";
            case 32:
                return "가까운 숙소 몇 군데를 추천해드릴게요~";
            case 39:
                return "가까운 음식점 몇 군데를 추천해드릴게요~";
        }
    }

    useEffect(() => {
        if (!placeList) {
            const fetchData = async () => {
                try {
                    var dataList = await fetchLocationBasedTourData(location.x, location.y, contentTypeId, 2000);
                    setPlaceList(dataList);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData();
        }
        console.log(placeList);
    }, [placeList]);    

    
    return <>
        <PlaceLabel/>
        <PlaceOptionModal placeList={placeList} />
        <BottomModal
            text={bottomText(contentTypeId)} 
            canGoNext={false}
        />
    </>
}


// 3
function OverviewPage() {
    const [ overviewIndex, setOverviewIndex ] = useState(0);
    const [ showOption, setShowOption ] = useState(false);

    // 로컬에서 불러올 예정 (summary || overview)
    const totalIndex = 3;
    const texts = ["개요 요약 1 ~~~~ ~~ ~~~~ ~~~ ~~~ ~~~~~~ ~~~~ ~~ ~~", 
        "개요 요약 2 ~~~~ ~~ ~~~~ ~~~ ~~~ ~~~~~~ ~~~~ ~~ ~~", 
        "개요 요약 3 ~~~~ ~~ ~~~~ ~~~ ~~~ ~~~~~~ ~~~~ ~~ ~~"
    ];

    const goNextIndex = () => {
        if (overviewIndex < totalIndex - 1) {   // 사진 & 개요 넘기기
            setOverviewIndex(overviewIndex + 1);
        } else if (!showOption) {   // 선택지 띄우기 (여기로 결정 or 다른 장소 보기)
            setShowOption(true);
        }
    };

    return <>
        <PlaceLabel/>
        <ImageModal index={overviewIndex}/>
        {showOption && <OverviewOptionModal />}
        <BottomModal
            text={texts[overviewIndex]} 
            canGoNext={true}
            goNextIndex={goNextIndex}
        />
    </>
}


// 4
function MovingPage() {
    const { day, contentId, setPlace, setLocation } = useCurrentStatus();
    const { addEvent } = useSimulationHistory();
    const { increaseIndex: goNextPage } = useSimulationIndex();

    useEffect(() => {
        // 시뮬레이션 기록에 저장
        addEvent({
            day: day,
            contentId: contentId,
        });

        // 오늘 스케줄 수 +1, ArrivalPage로 이동
        setTimeout(() => {
            // 로컬 데이터에서 title, mapx, mapy 불러오기
            // setPlace();
            // setLocation();
            goNextPage();
        }, 2000);
    }, []);

    return <>
        <PlaceLabel/>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center">
            <Image src={carImage} width={208} height={208} alt="자동차 이미지" className="animate-bounce"/> 
        </div>
        <BottomModal
            text={`~로 이동 중입니다`} 
            canGoNext={false}
        />
    </>
}