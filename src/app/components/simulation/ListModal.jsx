import OptionButton from "./OptionButton"
import useCurrentStatus from "@/app/store/currentStatus";
import useSimulationIndex from "@/app/store/simulationIndex";

export default function ListModal({ placeList }) {
    const { setContentId } = useCurrentStatus();
    const { increaseIndex: goNextPage } = useSimulationIndex();

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
