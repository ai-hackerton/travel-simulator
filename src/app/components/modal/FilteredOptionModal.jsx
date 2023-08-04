"use client"

import { useState } from "react";
import Image from "next/image"
import downIcon from "public/icons/dropdown-down.png";
import upIcon from "public/icons/dropdown-up.png";

export default function FilteredOptionModal() {
    return (
        <div className="w-full h-[242px] absolute top-[45%] transform -translate-y-1/2">
            <div className="w-full h-full flex flex-col items-center space-y-[14px] relative">
                <OptionButton text="관광지 갈래" />
                <OptionButton text="숙소 갈래" />
                <OptionButton text="음식점 갈래" />
                <OptionButton text="집 갈래" />
                <DropDown />
            </div>
        </div>
    )
}


function OptionButton({ text }) {
    return (
        <div className="w-11/12 h-[50px] bg-white/80 rounded-lg shadow">
            <h3 className="text-lg text-black font-medium text-center leading-[50px]">
                {text}
            </h3>
        </div>
    )
}

function DropDown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("전체");

    const handleOptionClick = (item) => {
        setSelected(item);
        setIsOpen(false);
    }

    return (
        <div className="absolute left-[4.17%] -top-14">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-max h-8 px-2.5 bg-black/80 rounded-lg flex flex-row items-center">
                <span className="text-base text-white font-medium leading-8 mr-1.5">{selected}</span>
                <Image src={isOpen ? upIcon : downIcon} width={11} height={8} alt="드롭다운 아이콘" />
            </div>
            {isOpen &&
                <div className="w-36 bg-black/80 rounded-lg mt-1.5 flex flex-col">
                    <ul className="divide-y-[0.5px] divide-white/50">
                        {["전체", "자연", "역사", "휴양", "체험", "건축/조형물", "문화시설", "공연/행사"].map((item, index) => (
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