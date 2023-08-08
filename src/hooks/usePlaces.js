import useSimulationHistory from "@/app/store/simulationHistory";

export const usePlaces = () => {
  const { visitedPlaces } = useSimulationHistory();

  const matchPlaceTypeFromId = (typeId) => {
    switch (typeId) {
      case 12:
        return "관광지";
      case 14:
        return "문화시설";
      case 28:
        return "레포츠";
      case 32:
        return "숙박";
      case 30:
        return "음식점";
    }
  };

  const filterVisitedPlaces = (arr) => {
    let newArr = [...arr].filter((el) => {
      return !visitedPlaces.includes(el.contentid);
    });
    console.log("neW!!!! ", newArr);
    return newArr;
  };

  return { filterVisitedPlaces };
};
