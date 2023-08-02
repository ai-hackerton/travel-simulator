"use client";
import { useEffect } from "react";

export default function RoadView() {
  useEffect(() => {
    if (window.naver && window.naver.maps) {
      var pano = new window.naver.maps.Panorama("pano", {
        position: new window.naver.maps.LatLng(37.5756, 126.9768), // 초기 설정: 경복궁
        // 시야 설정
        pov: {
          pan: 2,
          tilt: 40,
          fov: 100,
        },
      });

      window.naver.maps.Event.addListener(pano, "pano_changed", function () {
        // 출력값: panoId, title, address, coord, photodate
        console.log("PanoramaLocation", pano.getLocation());
      });
    } else {
      console.log("Naver Maps API not loaded.");
    }
  }, []);

  return <div id="pano" className="w-screen h-screen"></div>;
}
