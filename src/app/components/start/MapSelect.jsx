import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "public/geo/map.json";

export default function MapSelect({ city, setCity }) {
  const mapRef = useRef(null);
  const selectedAreaRef = useRef(null);
  const originalColorsRef = useRef({});

  useEffect(() => {
    // 지도 그리기
    if (data && mapRef.current) {
      const reversedGeojson = reverseWindingOrder(data);
      drawMap(reversedGeojson, mapRef.current);
    }
  }, []);

  // D3를 사용하여 지도를 그리는 함수
  function drawMap(geojson, container) {
    const width = 320; // 지도 너비
    const height = 200; // 지도 높이

    // SVG 요소 생성
    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // 배경 그리기 (검은색)
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none");

    // D3에서 사용할 프로젝션 생성
    const projection = d3
      .geoEquirectangular()
      .center([128.25, 37.8]) // 강원도의 중심 좌표
      .scale(7500) // 지도 확대/축소 정도
      .translate([width / 2, height / 2]); // 지도를 화면 중앙에 배치

    // 지도 경로 생성기
    const geoGenerator = d3.geoPath().projection(projection);

    // 기존 경로를 선택하여 바인딩
    const paths = svg.selectAll("path").data(geojson.features);

    paths
      .enter()
      .append("path")
      .attr("d", geoGenerator)
      .style("stroke", "#2B2B2B")
      .style("stroke-width", 1)
      .style("fill", "#666666")
      .on("click", (event, d) => handleAreaClick(d, setCity));

    // 레이블 추가
    svg
      .selectAll("text")
      .data(geojson.features)
      .enter()
      .append("text")
      .text((d) => d.properties.SGG_NM) // 레이블 텍스트 설정
      .attr("x", (d) => geoGenerator.centroid(d)[0]) // x 좌표 설정
      .attr("y", (d) => geoGenerator.centroid(d)[1]) // y 좌표 설정
      .style("text-anchor", "middle") // 텍스트를 중앙으로 정렬
      .style("font-size", "12px") // 폰트 크기 설정
      .style("fill", "white") // 텍스트 색상 설정
      .style("pointer-events", "none"); // 클릭 이벤트를 무시하도록 설정
  }

  // 클릭 이벤트 핸들러
  function handleAreaClick(d, setCity) {
    const clickedArea = d.properties.ADM_SECT_C;
    const selectedArea = selectedAreaRef.current;
    const originalColors = originalColorsRef.current;
    // 원래 색상으로 되돌려주기
    resetColors();

    // 도시 설정
    setCity(d.properties.SGG_NM);

    // 이미 선택된 지역과 현재 클릭한 지역이 다르다면 선택한 지역을 업데이트하고 색상 변경
    if (selectedArea !== clickedArea) {
      selectedAreaRef.current = clickedArea;
      d3.select(event.target).style("fill", "#EB7A7A"); // 클릭한 지역을 원하는 색으로 강조

      // 원래 색상 저장
      originalColors[clickedArea] = "#666666";
    } else {
      // 이미 선택된 지역을 다시 클릭한 경우, 선택 해제하고 원래 색상으로 변경
      selectedAreaRef.current = null;
      d3.select(event.target).style("fill", originalColors[clickedArea]);
    }
  }

  // 원래 색상으로 되돌려주는 함수
  function resetColors() {
    d3.selectAll("path").style("fill", "#666666");
  }

  // 바인딩 순서 거꾸로 하기
  function reverseWindingOrder(geojson) {
    const reversedGeojson = { ...geojson };
    reversedGeojson.features.forEach(function (feature) {
      if (feature.geometry.type === "Polygon") {
        feature.geometry.coordinates.forEach(function (ring) {
          ring.reverse();
          console.log(ring);
        });
      }
    });
    return reversedGeojson;
  }

  return <div id="map-container" ref={mapRef}></div>;
}
