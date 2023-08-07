"use client";
import { useEffect } from "react";

export default function StaticRoadView({ lat, lng, pan, tilt, fov }) {
  useEffect(() => {
    if (window.naver && window.naver.maps) {
      var pano = new window.naver.maps.Panorama("pano", {
        position: new window.naver.maps.LatLng(lat, lng), // 초기 설정: 경복궁
        // 시야 설정
        pov: {
          pan: pan,
          tilt: tilt,
          fov: fov,
        },
      });

      window.naver.maps.Event.addListener(pano, "pano_changed", function () {
        // 출력값: panoId, title, address, coord, photodate
        console.log("PanoramaLocation", pano.getLocation());
      });
    } else {
      console.log("Naver Maps API not loaded.");
    }
  }, [lat, lng]);

  return <div id="pano" className="w-screen h-screen"></div>;
}
