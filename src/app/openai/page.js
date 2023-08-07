"use client";

import "./style.css";

//components
import FetchingAnswer from "../components/openai/FetchingAnswer";
import { startings } from "../../../public/data/startingPoints";
export default function Page() {
  const onGeoClick = (e) => {
    e.preventDefault();

    console.log("hihi");
    if (window.naver) {
      console.log("있어용");
      naver.maps.Service.geocode(
        {
          query: "불정로 6",
        },
        function (status, response) {
          if (status !== naver.maps.Service.Status.OK) {
            return alert("Something wrong!");
          }

          var result = response.v2, // 검색 결과의 컨테이너
            items = result.addresses; // 검색 결과의 배열
            console.log('result: ', result)

          // do Something
        }
      );
    } else {
      console.log("없어용 ㅠ");
    }
  };
  return (
    <div>
      <div>hihi~~~</div>
      <div
        onClick={onGeoClick}
        style={{ width: 300, height: 300, backgroundColor: "red" }}
      >
        이걸 눌러서 부르도록 해...
      </div>

      {/* <FetchingAnswer /> */}
      {/* <div
        className="btn"
        onClick={() => {
          console.log("1234");
        }}
      >
        click here
      </div> */}
    </div>
  );
}
