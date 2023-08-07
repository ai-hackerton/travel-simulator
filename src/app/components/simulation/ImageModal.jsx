import Image from "next/image";
import pinIcon from "public/icons/pin-white.png";
import useCurrentStatus from "@/app/store/currentStatus";
import { useEffect, useState } from "react";
import { fetchTourDetailCommon, fetchTourDetailImage } from "@/api/tourApi";
import noImageRobot from "public/images/robot-no-image.png";
import toursData from "/public/data/places/tours.json";
import culturalsData from "/public/data/places/culturals.json";
import foodsData from "/public/data/places/foods.json";
import activitiesData from "/public/data/places/activities.json";
import accommodationsData from "/public/data/places/accommodations.json";

export default function ImageModal({ index }) {
    const { contentTypeId, contentId, location } = useCurrentStatus();
    const [images, setImages] = useState(null);
    const [tags, setTags] = useState([]);
    const [distance, setDistance] = useState("");


    useEffect(() => {
        switch (contentTypeId) {
            case 12:
                setTags(toursData[contentId].tags || []);
                setDistance(calculateDistance(location.y, location.x, toursData[contentId].mapy, toursData[contentId].mapx));
                break;
            case 14:
                setTags(culturalsData[contentId].tags || []);
                setDistance(calculateDistance(location.y, location.x, culturalsData[contentId].mapy, culturalsData[contentId].mapx));
                break;
            case 28:
                setTags(activitiesData[contentId].tags || []);
                setDistance(calculateDistance(location.y, location.x, activitiesData[contentId].mapy, activitiesData[contentId].mapx));
                break;
            case 32:
                setTags(accommodationsData[contentId].tags || []);
                setDistance(calculateDistance(location.y, location.x, accommodationsData[contentId].mapy, accommodationsData[contentId].mapx));
                break;
            case 39:
                setTags(foodsData[contentId].tags || []);
                setDistance(calculateDistance(location.y, location.x, foodsData[contentId].mapy, foodsData[contentId].mapx));
        }
    }, []);

    useEffect(() => {
        if (!images) {
            const fetchData = async () => {
                try {
                    var dataList = await fetchTourDetailImage(contentId);
                    if (dataList) {
                        var imageList = dataList.map(data => data.originimgurl);
                        setImages(imageList);
                    } else {
                        var data = await fetchTourDetailCommon(contentId);
                        if (data.firstimage != '') setImages([data.firstimage]);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData();
        }
        console.log("images: ", images);
    }, [images]);


    return (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex justify-center items-center">
            <div className="w-[316px] h-auto absolute top-[38%] transform -translate-y-1/2" >
                {tags.length > 0 ?
                    <div className="w-min max-w-full h-7 bg-black/50 rounded-[10px] px-2.5 mb-2.5 overflow-x-scroll">
                        <p className="w-max text-sm text-white font-normal leading-7 whitespace-pre">{"#" + tags.join("   #")}</p>
                    </div> :
                    <div className="w-full h-7 bg-transparent" />}
                <div className="w-full h-[274px] rounded-[10px] relative overflow-hidden">
                    {images ?
                        <Image src={images[Math.min(index, images.length - 1)]} fill={true} alt="이미지" className="object-cover" /> :
                        <div className="w-full h-full flex flex-col justify-center items-center bg-white/80">
                            <Image src={noImageRobot} width={108} height={108} alt="대체 이미지" />
                            <h3 className="text-sm text-gray-300 font-medium mb-4">이미지를 준비 중입니다</h3>
                        </div>}
                    <div className="absolute right-0 bottom-0 bg-black/50 rounded-tl-[10px] flex flex-row items-center px-2.5 py-2 space-x-1.5">
                        <Image src={pinIcon} width={9} height={13} alt="핀 아이콘" />
                        <h5 className="text-base text-white font-normal leading-[13px]">{distance}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    if (distance < 1) {
        return `${Math.round(distance * 1000)}m`;
    } else {
        return `${distance.toFixed(2)}km`;
    }
}

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}