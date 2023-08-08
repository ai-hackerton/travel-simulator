import OptionButton from "./OptionButton"
import useCurrentStatus from "@/app/store/currentStatus";
import useSimulationIndex from "@/app/store/simulationIndex";
import Image from "next/image";
import noDataRobot from "public/images/robot-no-data.png";

export default function ListModal({ placeList }) {
    const { setContentId } = useCurrentStatus();
    const { increaseIndex: goNextPage } = useSimulationIndex();

    if (placeList && placeList.length == 0) {
        return <div className="w-auto h-[250px] mx-[4.17%] rounded-[10px] bg-gray-100/80 flex flex-col justify-center items-center shadow">
            <Image src={noDataRobot} width={108} height={108} alt="대체 이미지" />
            <h3 className="text-sm text-gray-300 font-medium leading-5 mt-2">20km 이내에 일치하는 장소가</h3>
            <h3 className="text-sm text-gray-300 font-medium leading-5">존재하지 않습니다</h3>
        </div>
    }

    const handleButtonClick = (contentId) => {
        setContentId(contentId)
        goNextPage();
    }

    const skeleton = <></>;

    return (
        <div className="w-full h-full flex flex-col items-center pt-1.5 space-y-[14px] relative overflow-y-scroll">
            {placeList ?
                placeList.map((place, index) => <OptionButton key={index} text={place.title} onClick={() => handleButtonClick(place.contentid)} />) :
                skeleton}
        </div>
    )
}
