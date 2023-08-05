"user client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "public/geo/map.json";

export default function MapSelect() {
  const mapRef = useRef(null);

  useEffect(() => {
    // 지도 그리기
    if (data && mapRef.current) {
      drawMap(data, mapRef.current);
    }
  }, []);

  // D3를 사용하여 지도를 그리는 함수
  function drawMap(geojson, container) {
    const width = 320; // 지도 너비
    const height = 300; // 지도 높이

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
      .geoMercator()
      .center([128.25, 37.8]) // 강원도의 중심 좌표
      .scale(6000) // 지도 확대/축소 정도
      .translate([width / 2, height / 2]); // 지도를 화면 중앙에 배치

    // 지도 경로 생성기
    const path = d3.geoPath().projection(projection);

    // 기존 경로를 선택하여 바인딩
    const paths = svg.selectAll("path").data(geojson.features);

    // 기존 경로 중 필요 없는 것들 제거
    paths.exit().remove();

    // 새로운 경로 추가
    paths
      .enter()
      .append("path")
      .attr("d", path)
      .attr("vector-effect", "non-scaling-stroke")
      .style("fill", (d, i) => getColorBasedOnIndex(i))
      .style("stroke", "white")
      .style("stroke-width", 1);

    // 각 구역의 클릭 이벤트 처리
    paths.on("click", handleAreaClick);

    // 클릭 이벤트 핸들러
    function handleAreaClick(event, d) {
      // 클릭한 구역의 정보를 로그로 출력
      console.log("Clicked Area:", d.properties.SGG_NM);
    }

    // This function generates different colors based on the index of the path
    function getColorBasedOnIndex(index) {
      const colors = ["blue", "green", "red", "orange", "purple"]; // Add more colors if needed
      return colors[index % colors.length];
    }
  }

  return <div id="map-container" ref={mapRef}></div>;
}
