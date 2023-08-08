import Image from "next/image";

import defaultImage from "public/images/default-image.png";

import { usePlaces } from "@/hooks/usePlaces";

export default function ResultList() {
  const { getPlacesFromLocalDataWithHistory, matchPlaceTypeFromId } =
    usePlaces();

  const resultData = getPlacesFromLocalDataWithHistory();

  // const city =
  //   travelSettings?.city[travelSettings?.city?.length - 1] === "시"
  //     ? travelSettings?.city + "로"
  //     : travelSettings?.city + "으로";

  return (
    <div className=" overflow-y-scroll flex flex-col scrollbar-hide ">
      {resultData?.map((el, idx) => {
        return (
          <div
            key={"day_" + idx}
            className="flex flex-col mb-10 "
            style={{ height: 1000, width: "100%", flex: 1 }}
          >
            <div
              // className=" px-2 py-1  mb-3 text-bold"
              className="bg-main-200 px-2 py-1 text-white mb-3"
              style={{ alignSelf: "start", borderRadius: 5 }}
            >
              Day {idx + 1}
            </div>
            {el.map((p, index) => (
              <div key={"result_" + idx + index}>
                <div
                  className="flex flex-row justify-end relative"
                  style={{
                    height: 170,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      height: index < el.length - 1 ? 170 : 150,

                      borderLeft: "1px dotted gray",
                      position: "absolute",
                      left: 10,
                      top: 10,
                    }}
                  />
                  <div
                    className="bg-main-100 shadow"
                    style={{
                      position: "absolute",
                      width: 12,
                      height: 12,
                      borderRadius: 100,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",

                      top: 8,
                      left: 5,
                    }}
                  >
                    {/* {index > 0 && index < el.length ? ( */}
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 100,
                        backgroundColor: "white",
                      }}
                    />
                    {/* ) : null} */}
                  </div>

                  {index === el.length - 1 ? (
                    <div
                      className="bg-main-100 text-bold shadow"
                      style={{
                        position: "absolute",
                        width: 12,
                        height: 12,
                        borderRadius: 100,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                        bottom: 8,
                        left: 5,
                      }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 100,
                          backgroundColor: "white",
                        }}
                      />
                    </div>
                  ) : null}

                  <div
                    className="flex flex-col "
                    style={{
                      width: "90%",
                      height: "100%",
                    }}
                  >
                    <p
                      style={{
                        alignSelf: "start",
                        marginBottom: 5,
                        color: "#8C8C8C",
                        fontSize: 14,
                      }}
                    >
                      {matchPlaceTypeFromId(parseInt(p?.contenttypeid))}
                    </p>
                    <div
                      className=" shadow"
                      style={{
                        width: "100%",
                        height: 120,
                        borderRadius: 10,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={p.firstimage || defaultImage}
                        alt="이미지"
                        className="object-cover"
                        fill={true}
                      />
                      <div
                        className="backdrop-blur-[1px]
                        bg-gradient-to-t from-black/60 text-white flex flex-col p-3 
                        "
                        style={{
                          position: "absolute",
                          right: 0,
                          bottom: 0,
                          height: "100%",
                          width: "100%",
                          justifyContent: "flex-end",
                        }}
                      >
                        <p className="text-lg text-bold">{p.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
