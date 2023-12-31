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
} from "@/api/tourApi";
import carImage from "/public/images/car.png";
import useTravelSettingsStore from "../store/travelSettings";

const jsonData = {
  12: toursData,
  14: culturalsData,
  28: activitiesData,
  32: accommodationsData,
  39: foodsData
}

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

  // 랜덤 출력
  const bottomText = (place) => {
    const randomText = [
      `휴.. 오늘 정말 덥죠?\n 드디어 ${place}에 도착했어요~`, 
      `와~ ${place}에 도착했습니다~!`, 
      `${place}에 도착했어요!\n주변을 한번 둘러볼까요?`, 
    ]
    const randomIndex = Math.floor(Math.random() * randomText.length);
    return randomText[randomIndex];
  }

  console.log(simulationHistory);

  return (
    <>
      <PlaceLabel />
      <BottomModal text={bottomText(place)} canGoNext={true} />
    </>
  );
}

// 1
function SelectTypePage() {
  const { day } = useCurrentStatus();
  const { simulationHistory, visitedPlaces } = useSimulationHistory();
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
        setText("벌써 여행의 마지막이 다가왔어요..\n아쉽지만 여기서 시뮬레이션을 종료할까요?");
      } else {
        setText("오늘 벌써 5개의 일정을 소화했어요!\n이제 그만 숙소에 가서 쉴까요?");
      }
    } else {
      setText("이제 어떤 곳에 가볼까요?");
    }
  }, []);


  return (
    <>
      <PlaceLabel />
      <TypeOptionModal
        endTheDay={endTheDay}
        isLastDay={isLastDay}
        first={visitedPlaces.length == 0}
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
        return "여행은 역시 관광이죠~\n가까운 관광지들을 추천해드릴게요!";
      case 14:
        return "문화시설에 관심이 있으시군요!\n주변에 이런 문화시설들이 있네요~";
      case 28:
        return "액티비티를 원한다면 여기는 어떠세요?\n레포츠를 즐길 수 있는 곳들이에요!";
      case 32:
        return "다음날을 위한 체력 관리는 필수죠!\n이곳에서 가장 가까운 숙소들이에요~";
      case 39:
        return "금강산도 식후경이죠~\n가까운 음식점들을 찾아봤어요!";
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
  const [ texts, setTexts ] = useState([""]);
  const { contentTypeId, contentId } = useCurrentStatus();

  // summary 또는 overview 불러와서 표시
  useEffect(() => {
    const placeData = jsonData[contentTypeId][contentId];
    const textData = placeData.summary || placeData.overview;
    const separators = /(?:\<br \/>|<br>|\.\s+|\n)/;
    const splited = textData.split(separators);
    const filtered = splited.filter(text => text != "" && !(/^\(출처.*\)$/.test(text)) && !(/^<출처.*>$/.test(text)) && !(/^\[출처.*\]$/.test(text)));
    const trimmed = filtered.map(text => text.trim().endsWith(".") ? text.trim() : text.trim() + ".");
    setTexts(trimmed);
  }, []);

  
  const goNextIndex = () => {
    if (overviewIndex < texts.length - 1) {
      // 사진 & 개요 넘기기
      setOverviewIndex(overviewIndex + 1);
    } 
    if ((overviewIndex >= texts.length - 1 || overviewIndex > 2) && !showOption) {
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
  const { day, nextDay, contentTypeId, contentId, setPlace, setLocation } =
    useCurrentStatus();
  const { addEvent, visitedPlaces, addVisitedPlaces } =
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
      // title, mapx, mapy (장소명, 로드뷰 업데이트)
      const placeData = jsonData[contentTypeId][contentId];
      setPlace(placeData.title);
      setLocation(placeData.mapx, placeData.mapy);

      // 숙박 선택했으면 다음날로 넘어감 or 당일치기인 경우
      if (contentTypeId == 32) {
        nextDay();
      }

      // 다음페이지
      goNextPage();
    }, 2500);
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
      <BottomModal text={`${jsonData[contentTypeId][contentId].title}(으)로 이동 중입니다`} canGoNext={false} />
    </>
  );
}
