import Image from "next/image";
import defaultImage from "public/images/default-image.png";
import pinIcon from "public/icons/pin-white.png";
import useCurrentStatus from "@/app/store/currentStatus";
import { useEffect, useState } from "react";
import { fetchTourDetailImage } from "@/api/tourApi";

export default function ImageModal({ index }) {
    const { contentId } = useCurrentStatus();
    const [images, setImages] = useState(null);

    useEffect(() => {
        if (!images) {
            const fetchData = async () => {
                try {
                    var dataList = await fetchTourDetailImage(contentId);
                    var imageList = dataList.map(data => data.originimgurl);
                    setImages(imageList);
                } catch (error) {
                    console.log(error);
                    // 이미지 없으면 로컬에서 가져오기
                }
            }
            fetchData();
        }
    }, [images]);

    return (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex justify-center items-center">
            <div className="w-[316px] h-auto absolute top-[38%] transform -translate-y-1/2" >
                <div className="w-min h-7 bg-black/50 rounded-[10px] text-sm text-white font-normal leading-5 py-1 px-2.5 whitespace-pre mb-2.5">
                    #전통한과   #갈골한과   #호당농가소득
                </div>
                <div className="w-full h-[274px] rounded-[10px] relative overflow-hidden">
                    <Image src={images ? images[Math.min(index, images.length - 1)] : defaultImage} fill={true} alt="이미지" className="object-cover" />
                    <div className="absolute right-0 bottom-0 bg-black/50 rounded-tl-[10px] rounded-br-[10px] flex flex-row items-center px-2.5 py-2 space-x-1.5">
                        <Image src={pinIcon} width={9} height={13} alt="핀 아이콘" />
                        <h5 className="text-base text-white font-normal leading-[13px]">150m</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}