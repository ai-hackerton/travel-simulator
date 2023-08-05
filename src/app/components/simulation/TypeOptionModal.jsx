"use client"

import useCurrentStatus from "@/app/store/currentStatus"
import OptionButton from "./OptionButton"
import useSimulationIndex from "@/app/store/simulationIndex";

export default function TypeOptionModal() {
    const { setContentTypeId } = useCurrentStatus();
    const { increaseIndex: goNextPage } = useSimulationIndex();

    const handleClick = (contentTypeId) => {
        setContentTypeId(contentTypeId);
        goNextPage();
    }

    return (
        <div className="w-full h-[242px] absolute top-[40%] transform -translate-y-1/2">
            <div className="w-full h-full flex flex-col justify-center items-center space-y-[14px] relative">
                <OptionButton text="관광지 갈래" onClick={() => handleClick(12)} />
                <OptionButton text="밥 먹을래" onClick={() => handleClick(39)} />
                <OptionButton text="숙소 갈래" onClick={() => handleClick(32)} />
                <OptionButton text="레포츠 할래" onClick={() => handleClick(28)} />
            </div>
        </div>
    )
}
