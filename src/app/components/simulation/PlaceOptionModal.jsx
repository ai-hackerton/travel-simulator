"use client"

import { useState } from "react";
import Image from "next/image"
import downIcon from "public/icons/dropdown-down.png";
import upIcon from "public/icons/dropdown-up.png";
import carouselIcon from "public/icons/carousel.png";
import listIcon from "public/icons/list.png";
import ListModal from "./ListModal";
import CarouselModal from "./CarouselModal";
import useCurrentStatus from "@/app/store/currentStatus";
import { getFilteredList } from "@/api/tourApi";

export default function PlaceOptionModal({ placeList }) {
    const [isCarousel, setIsCarousel] = useState(true);
    const [category, setCategory] = useState("전체");
    const { contentTypeId } = useCurrentStatus();

    return (
        <div className="w-full h-[250px] absolute top-[40%] transform -translate-y-1/2">
            <DropDown selected={category} setSelected={setCategory} />
            <FormButton isCarousel={isCarousel} setIsCarousel={setIsCarousel} />
            {isCarousel ?
                <CarouselModal placeList={getFilteredList(placeList, contentTypeId, category)} /> :
                <ListModal placeList={getFilteredList(placeList, contentTypeId, category)} />}
        </div>
    )
}


function DropDown({ selected, setSelected }) {
    const [isOpen, setIsOpen] = useState(false);
    const { contentTypeId } = useCurrentStatus();

    const categoryList = {
        12: ["전체", "자연", "역사", "휴양", "체험", "산업", "건축/조형물"],    //관광지
        14: ["전체", "박물관", "기념관", "전시관", "미술관/화랑", "공연장", "문화원", "도서관/대형서점", "문화전수시설", "영화관"], //문화시설
        28: ["전체", "육상레포츠", "수상레포츠", "항공레포츠", "복합레포츠"],   //레포츠
        32: ["전체", "관광호텔", "콘도미니엄", "유스호스텔", "펜션", "모텔", "민박", "게스트하우스", "홈스테이", "한옥"],   //숙박
        39: ["전체", "한식", "서양식", "일식", "중식", "이색음식점", "카페/전통찻집"]   //음식점
    }

    const handleOptionClick = (item) => {
        setSelected(item);
        setIsOpen(false);
    }

    return (
        <div className="absolute left-[4.17%] -top-10 z-50">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-max h-8 px-2.5 bg-black/80 rounded-lg flex flex-row items-center">
                <span className="text-base text-white font-medium leading-8 mr-1.5">{selected}</span>
                <Image src={isOpen ? upIcon : downIcon} width={11} height={8} alt="드롭다운 아이콘" />
            </div>
            {isOpen &&
                <div className="w-36 bg-black/80 rounded-lg mt-1.5 flex flex-col">
                    <ul className="divide-y-[0.5px] divide-white/50">
                        {categoryList[contentTypeId].map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleOptionClick(item)}
                                className="text-base text-white font-medium px-2.5 py-1.5">
                                {item}
                            </div>
                        ))}
                    </ul>
                </div>}
        </div>
    )
}


function FormButton({ isCarousel, setIsCarousel }) {
    return (
        <div
            onClick={() => setIsCarousel(!isCarousel)}
            className="w-8 h-8 rounded-[10px] bg-black/70 shadow flex justify-center items-center absolute right-[4.17%] -top-10">
            {isCarousel ?
                <Image src={carouselIcon} width={26} height={26} alt="캐러셀 아이콘" /> :
                <Image src={listIcon} width={19} height={15} alt="리스트 아이콘" />
            }
        </div>
    )
}