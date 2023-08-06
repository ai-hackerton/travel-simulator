import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper, useSwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from "next/image";
import defaultImage from "public/images/default-image.png";
import noDataRobot from "public/images/robot-no-data.png";
import noImageRobot from "public/images/robot-no-image.png";
import pinIcon from "public/icons/pin-white.png";
import useCurrentStatus from "@/app/store/currentStatus";
import useSimulationIndex from "@/app/store/simulationIndex";

import 'swiper/css';
import 'swiper/css/pagination';
import './carousel.css';


export default function CarouselModal({ placeList }) {
    const [currentPlace, setCurrentPlace] = useState(null);
    const { setContentId } = useCurrentStatus();
    const { increaseIndex: goNextPage } = useSimulationIndex();
    const swiper = useSwiper();

    if (placeList && placeList.length == 0) {
        return <div className="w-auto h-[250px] mx-[4.17%] rounded-[10px] bg-gray-100/80 flex flex-col justify-center items-center shadow">
            <Image src={noDataRobot} width={108} height={108} alt="대체 이미지" />
            <h3 className="text-sm text-gray-300 font-medium leading-5 mt-2">2km 이내에 일치하는 장소가</h3>
            <h3 className="text-sm text-gray-300 font-medium leading-5">존재하지 않습니다</h3>
        </div>
    }

    const handleButtonClick = () => {
        setContentId(currentPlace.contentid)
        goNextPage();
    }

    function CarouselCard({ place }) {
        const isActive = useSwiperSlide().isActive;
        const { location } = useCurrentStatus();

        useEffect(() => {
            if (isActive) setCurrentPlace(place);
        }, [isActive]);

        return (
            <>
                <div className="w-full h-[200px] rounded-[10px] bg-gray-100/80 relative overflow-hidden">
                    {place.firstimage ?
                        <Image src={place.firstimage || defaultImage} fill={true} alt="이미지" className="object-cover" /> :
                        <div className="w-full h-full flex flex-col justify-center items-center pb-1.5">
                            <Image src={noImageRobot} width={108} height={108} alt="대체 이미지" />
                            <h3 className="text-sm text-gray-300 font-medium">이미지를 준비 중입니다</h3>
                        </div>
                    }
                    <div className="absolute right-0 bottom-0 bg-black/50 rounded-tl-[10px] flex flex-row items-center px-2.5 py-2 space-x-1.5">
                        <Image src={pinIcon} width={9} height={13} alt="핀 아이콘" />
                        <h5 className="text-base text-white font-normal leading-[13px]">{calculateDistance(location.y, location.x, place.mapy, place.mapx)}</h5>
                    </div>
                    {/* {!isActive &&
                        <div className="absolute inset-0 rounded-[10px] bg-black/30 backdrop-blur-[0.5px]" />} */}
                </div>
            </>
        )
    }


    return (
        <div className="w-full flex flex-col items-center">
            {placeList ?
                <Swiper
                    spaceBetween={10}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    pagination={false}
                    modules={[Pagination]}
                    loop={false}
                    onSlideChange={() => console.log("slide change")}>
                    {placeList.map((place, index) => (
                        <SwiperSlide key={index}>
                            <CarouselCard place={place} />
                        </SwiperSlide>
                    ))}
                </Swiper> :
                <div className="w-auto h-[200px] mx-[4.17%] rounded-[10px] bg-white/80" />}
            <div
                onClick={handleButtonClick}
                className="w-11/12 h-11 bg-white/80 rounded-lg mt-2.5 shadow">
                <h3 className="text-lg text-black font-medium text-center leading-[44px]">
                    {currentPlace && currentPlace.title}
                </h3>
            </div>
        </div>
    )
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    if (distance < 1) {
        return `${Math.round(distance * 1000)}m`;
    } else {
        return `${distance.toFixed(2)}km`;
    }
}

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

