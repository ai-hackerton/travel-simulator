import useCurrentStatus from "@/app/store/currentStatus"

export default function PlaceLabel() {
    const { place } = useCurrentStatus();

    return (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 min-w-[50%] h-9 px-4 bg-main-300/80 rounded-full shadow text-xl text-white font-semibold text-center leading-9">
            {place}
        </div>
    )
}