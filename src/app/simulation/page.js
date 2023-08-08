"use client";

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

import toursData from "/public/data/places/tours.json";
import culturalsData from "/public/data/places/culturals.json";
import foodsData from "/public/data/places/foods.json";
import activitiesData from "/public/data/places/activities.json";
import accommodationsData from "/public/data/places/accommodations.json";

//hooks
import { usePlaces } from "@/hooks/usePlaces";

import {
  fetchLocationBasedTourData,
  fetchTourDetailCommon,
} from "@/api/tourApi";
import carImage from "/public/images/car.png";
import useTravelSettingsStore from "../store/travelSettings";

export default function SimulationPage() {
  const { currentIndex } = useSimulationIndex();
  const { location } = useCurrentStatus();

  useEffect(() => {
    console.log(location);
  }, []);

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
    }
  }

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

  return (
    <>
      <PlaceLabel />
      <BottomModal text={bottomText} canGoNext={true} />
    </>
  );
}

// 1
function SelectTypePage() {
  const { day } = useCurrentStatus();
  const { simulationHistory } = useSimulationHistory();
  const { travelSettings } = useTravelSettingsStore();
  const [ text, setText ] = useState("");
  const [ endTheDay, setEndTheDay ] = useState();
  const [ isLastDay, setIsLastDay ] = useState();

  useEffect(() => {
    if (
      (travelSettings.date == "당일치기" && day == 1) ||
      (travelSettings.date == "1박 2일" && day == 2) ||
      (travelSettings.date == "2박 3일" && day == 3) ||
      (travelSettings.date == "3박 4일" && day == 4)
    ) {
      setIsLastDay(true);
    } else {
      setIsLastDay(false);
    }

    if (simulationHistory.filter((x) => x.day == day).length >= 5) {
      setEndTheDay(true);
    } else {
      setEndTheDay(false);
    }

    if (endTheDay) {
      if (isLastDay) {
        setText("대충 일정 끝났으니 시뮬레이션 종료하자는 멘트");
      } else {
        setText("오늘 벌써 5개의 일정을 소화했어요! 이제 그만 숙소에 가서 쉴까요?");
      }
    } else {
      setText("머시기~ 이제 어디를 가볼까요?");
    }
  }, []);


  return (
    <>
      <PlaceLabel />
      <TypeOptionModal
        endTheDay={endTheDay}
        isLastDay={isLastDay}
      />
      <BottomModal text={text} canGoNext={false} />
    </>
  );
}

// 2
// TODO: 아무것도 없는 경우에 처리해야함
function SelectPlacePage() {
  const { location, contentTypeId } = useCurrentStatus();
  const [placeList, setPlaceList] = useState(null);
  const { filterVisitedPlaces } = usePlaces();

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
  };

  //   TODO: 여기 이미 돌은 곳, 현재 위치인 곳 필터링 해서 거르기
  useEffect(() => {
    if (!placeList) {
      const fetchData = async () => {
        try {
          let dataList = [];
          let count = 1;
          while (!(dataList?.length || count > 10)) {
            dataList = await fetchLocationBasedTourData(
              location.x,
              location.y,
              contentTypeId,
              2000 * count
            );
            dataList = dataList ? filterVisitedPlaces(dataList) : [];
            count++;
          }
          setPlaceList(dataList);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
    console.log(placeList);
  }, [placeList]);

  return (
    <>
      <PlaceLabel />
      <PlaceOptionModal placeList={placeList} />
      <BottomModal text={bottomText(contentTypeId)} canGoNext={false} />
    </>
  );
}

// 3
function OverviewPage() {
  const [ overviewIndex, setOverviewIndex ] = useState(0);
  const [ showOption, setShowOption ] = useState(false);
  const [ texts, setText ] = useState([""]);
  const { contentTypeId, contentId } = useCurrentStatus();

  const jsonData = {
    12: toursData,
    14: culturalsData,
    28: activitiesData,
    32: accommodationsData,
    39: foodsData
  }

  // summary 또는 overview 불러와서 표시
  useEffect(() => {
    const placeData = jsonData[contentTypeId][contentId];
    const textData = placeData.summary || placeData.overview;
    const separators = /(?:\<br \/>|<br>|\.|\n)/;
    const splited = textData.split(separators);
    const filtered = splited.filter(text => text != "" && !(/^\(출처.*\)$/.test(text)) && !(/^<출처.*>$/.test(text)) && !(/^\[출처.*\]$/.test(text)));
    const trimmed = filtered.map(text => text.trim() + ".");
    setText(trimmed);
  }, []);

  
  const goNextIndex = () => {
    if (overviewIndex < texts.length - 1) {
      // 사진 & 개요 넘기기
      setOverviewIndex(overviewIndex + 1);
    } else if (!showOption) {
      // 선택지 띄우기 (여기로 결정 or 다른 장소 보기)
      setShowOption(true);
    }
  };

  return (
    <>
      <PlaceLabel />
      <ImageModal index={overviewIndex} />
      {showOption && <OverviewOptionModal />}
      <BottomModal
        text={texts[overviewIndex]}
        canGoNext={true}
        goNextIndex={goNextIndex}
      />
    </>
  );
}

// 4
function MovingPage() {
  const { travelSettings } = useTravelSettingsStore();
  const { day, nextDay, contentTypeId, contentId, setPlace, setLocation } =
    useCurrentStatus();
  const { simulationHistory, addEvent, visitedPlaces, addVisitedPlaces } =
    useSimulationHistory();
  const { increaseIndex: goNextPage } = useSimulationIndex();

  console.log("visited~ ", visitedPlaces);
  useEffect(() => {
    // 시뮬레이션 기록에 저장
    addEvent({
      day: day,
      contentId: contentId,
      contentTypeId: contentTypeId,
    });

    addVisitedPlaces(contentId);

    // 오늘 스케줄 수 +1, ArrivalPage로 이동
    setTimeout(async () => {
      // api로 title, mapx, mapy 불러오기 (장소명, 로드뷰 업데이트)
      const data = await fetchTourDetailCommon(contentId);
      setPlace(data.title);
      setLocation(data.mapx, data.mapy);

      // 숙박 선택했으면 다음날로 넘어감 or 당일치기인 경우
      if (contentTypeId == 32) {
        nextDay();
      }

      // 다음페이지
      goNextPage();
    }, 2000);
  }, []);

  return (
    <>
      <PlaceLabel />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center">
        <Image
          src={carImage}
          width={208}
          height={208}
          alt="자동차 이미지"
          className="animate-bounce"
        />
      </div>
      <BottomModal text={`~로 이동 중입니다`} canGoNext={false} />
    </>
  );
}
