"use client"

import { useEffect, useState } from "react";
import StaticRoadView from "../components/map/StaticRoadView";
import BottomModal from "../components/simulation/BottomModal";
import PlaceOptionModal from "../components/simulation/PlaceOptionModal";
import MapModal from "../components/simulation/MapModal";
import TypeOptionModal from "../components/simulation/TypeOptionModal";
import ImageModal from "../components/simulation/ImageModal";
import useSimulationIndex from "../store/simulationIndex";
import PlaceLabel from "../components/simulation/PlaceLabel";
import useCurrentStatus from "../store/currentStatus";
import { fetchLocationBasedTourData } from "@/api/tourApi";


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


function ArrivalPage() {
    const { place } = useCurrentStatus();
    const bottomText = `휴.. 오늘 정말 덥죠?\n 드디어 ${place}에 왔네요 하하~`;

    return <>
        <PlaceLabel/>
        <BottomModal 
            text={bottomText} 
            canGoNext={true}
        />
    </>
}


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


function SelectPlacePage() {
    const { location, contentTypeId } = useCurrentStatus();
    const [placeList, setPlaceList] = useState(null);

    const bottomText = `가까운 ~~~ 몇 군데를 추천해드릴게요`;

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
            text={bottomText} 
            canGoNext={false}
        />
    </>
}


function OverviewPage() {
    return <>
        <PlaceLabel/>
        <ImageModal/>
        <BottomModal
            text={`강릉 사천면 모래내한과마을은 전통방식으로 맛있는 한과를 생산하는 고소득 마을입니다.`} 
            canGoNext={true}
        />
    </>
}


function MovingPage() {
    return <>
        <PlaceLabel/>
        <BottomModal
            text={`~로 이동 중입니다`} 
            canGoNext={true}
        />
    </>
}