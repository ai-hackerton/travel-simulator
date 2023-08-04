import Image from "next/image";
import defaultImage from "public/images/default-image.png";

export default function CarouselModal() {
    return (
        <div className="w-full h-full flex flex-col items-center space-y-2.5 relative">
            <div className="w-11/12 h-[200px] rounded-[10px] relative overflow-hidden shadow">
                <Image src={defaultImage} fill={true} alt="이미지" className="object-cover" />
            </div>
            <div className="w-11/12 h-11 bg-white/80 rounded-lg shadow">
                <h3 className="text-lg text-black font-medium text-center leading-[44px]">
                    강릉 모래내 한과마을(갈골한과)
                </h3>
            </div>
        </div>
    )
}

function CarouselCard() {

}