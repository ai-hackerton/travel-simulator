"use client"

import useMapDisplay from "@/app/store/mapDisplay";
import { useEffect } from "react"

export default function MapModal() {
    const isVisible = useMapDisplay((state) => state.mapDisplay);
    const hideMap = useMapDisplay((state) => state.hideMap);

    const location = [37.7637611, 128.8990861];

    useEffect(() => {
        if (isVisible && window.naver && window.naver.maps) {
            var mapRef = new window.naver.maps.Map("map", {
                center: new window.naver.maps.LatLng(location[0], location[1]),
                zoomControl: false,
                scaleControl: false,
                logoControl: false,
                mapDataControl: false,
                logoControlOptions: {
                    position: window.naver.maps.Position.BOTTOM_RIGHT,
                },
            });

            var marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(location[0], location[1]),
                map: mapRef,
                // icon: {
                //     url: '',
                //     size: new window.naver.maps.Size(42, 52),
                //     origin: new window.naver.maps.Point(0, 0),
                // }
            });
        }
    }, [isVisible]);

    if (!isVisible) return;

    return (
        <div
            onClick={hideMap}
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex justify-center items-center">
            <div id="map" className="w-[330px] h-[330px] rounded-md bg-white" onClick={(e) => e.stopPropagation()} />
        </div>
    )
}