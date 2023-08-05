export default function OptionButton({ text, onClick }) {
    return (
        <div
            onClick={onClick}
            className="w-11/12 h-[50px] bg-white/80 rounded-lg shadow">
            <h3 className="text-lg text-black font-medium text-center leading-[50px]">
                {text}
            </h3>
        </div>
    )
}