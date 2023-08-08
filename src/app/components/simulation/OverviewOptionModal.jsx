"use client"

import useCurrentStatus from "@/app/store/currentStatus"
import OptionButton from "./OptionButton"
import useSimulationIndex from "@/app/store/simulationIndex";

export default function OverviewOptionModal() {
    const { increaseIndex: goNextPage, decreaseIndex: goPrevPage } = useSimulationIndex();

    return (
        <div className="w-full h-[242px] absolute top-[40%] transform -translate-y-1/2">
            <div className="w-full h-full flex flex-col justify-center items-center space-y-[14px] relative">
                <OptionButton text="이곳으로 출발!" onClick={goNextPage} />
                <OptionButton text="다른 곳도 좀 둘러볼래" onClick={goPrevPage} />
            </div>
        </div>
    )
}
