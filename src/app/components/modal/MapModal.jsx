"use client"

import { useEffect } from "react"

export default function MapModal({ location, hideMap }) {

    useEffect(() => {
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

    }, []);

    return (
        <div
            onClick={hideMap}
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex justify-center items-center">
            <div id="map" className="w-[330px] h-[330px] rounded-md bg-white" onClick={(e) => e.stopPropagation()} />
        </div>
    )
}