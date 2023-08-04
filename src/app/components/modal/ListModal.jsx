export default function ListModal() {
    return (
        <div className="w-full h-full flex flex-col items-center space-y-[14px] relative overflow-y-scroll">
            <OptionButton text="관광지 갈래" />
            <OptionButton text="숙소 갈래" />
            <OptionButton text="음식점 갈래" />
            <OptionButton text="집 갈래" />
            <OptionButton text="집 갈래" />
            <OptionButton text="집 갈래" />
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