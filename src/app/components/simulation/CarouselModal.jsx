import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from "next/image";
import defaultImage from "public/images/default-image.png";
import pinIcon from "public/icons/pin-white.png";

import 'swiper/css';
import 'swiper/css/pagination';
import './carousel.css';

export default function CarouselModal() {
    const [currentPlace, setCurrentPlace] = useState("");

    // 나중에 데이터 리스트로 대체
    const placeList = ["강릉 모래내 한과마을(갈골한과)", "백덕산(평창)", "단경골 휴양지", "구문소 (강원고생대 국가지질공원)", "공수전리 마을관리휴양지"];

    function CarouselCard({ place }) {
        const isActive = useSwiperSlide().isActive;

        useEffect(() => {
            if (isActive) setCurrentPlace(place);
        }, [isActive]);

        return (
            <>
                <div className="w-full h-[200px] rounded-[10px] relative overflow-hidden">
                    <Image src={defaultImage} fill={true} alt="이미지" className="object-cover" />
                    <div className="absolute right-0 bottom-0 bg-black/50 rounded-tl-[10px] rounded-br-[10px] flex flex-row items-center px-2.5 py-2 space-x-1.5">
                        <Image src={pinIcon} width={9} height={13} alt="핀 아이콘" />
                        <h5 className="text-base text-white font-normal leading-[13px]">150m</h5>
                    </div>
                    {!isActive &&
                        <div className="absolute inset-0 rounded-[10px] bg-black/20 backdrop-blur-[0.5px]" />}
                </div>
            </>
        )
    }


    return (
        <div className="w-full flex flex-col items-center">
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
            </Swiper>
            <div className="w-11/12 h-11 bg-white/80 rounded-lg mt-2.5 shadow">
                <h3 className="text-lg text-black font-medium text-center leading-[44px]">
                    {currentPlace}
                </h3>
            </div>
        </div>
    )
}