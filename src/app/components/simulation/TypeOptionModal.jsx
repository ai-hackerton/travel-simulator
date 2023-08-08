"use client"

import useCurrentStatus from "@/app/store/currentStatus"
import OptionButton from "./OptionButton"
import useSimulationIndex from "@/app/store/simulationIndex";

export default function TypeOptionModal({ singleOption, end }) {
    const { setContentTypeId } = useCurrentStatus();
    const { increaseIndex: goNextPage } = useSimulationIndex();

    const handleClick = (contentTypeId) => {
        setContentTypeId(contentTypeId);
        goNextPage();
    }

    return (
        <div className="w-full h-[242px] absolute top-[40%] transform -translate-y-1/2">
            {singleOption ?
                end ?
                    <div className="w-full h-full flex flex-col justify-center items-center space-y-2 relative">
                        {/* TODO: 저장하고 결과페이지로 이동 */}
                        <OptionButton text="시뮬레이션 종료~" onClick={() => console.log("결과페이지로 이동")} />
                    </div> :
                    <div className="w-full h-full flex flex-col justify-center items-center space-y-2 relative">
                        <OptionButton text="그랭 이제 숙소 가서 쉬자" onClick={() => handleClick(32)} />
                    </div>
                :
                <div className="w-full h-full flex flex-col justify-center items-center space-y-2 relative">
                    <OptionButton text="관광지 갈래" onClick={() => handleClick(12)} />
                    <OptionButton text="문화시설 갈래" onClick={() => handleClick(14)} />
                    <OptionButton text="밥 먹을래" onClick={() => handleClick(39)} />
                    <OptionButton text="레포츠 할래" onClick={() => handleClick(28)} />
                    <OptionButton text="숙소 갈래" onClick={() => handleClick(32)} />
                    {/* TODO: 여기도 오늘은 그만할래 버튼이 있으면 좋지 않을까 */}
                </div>
            }
        </div>
    )
}
