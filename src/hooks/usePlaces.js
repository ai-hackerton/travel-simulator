import useSimulationHistory from "@/app/store/simulationHistory";

import toursData from "/public/data/places/tours.json";
import culturalsData from "/public/data/places/culturals.json";
import foodsData from "/public/data/places/foods.json";
import activitiesData from "/public/data/places/activities.json";
import accommodationsData from "/public/data/places/accommodations.json";

export const usePlaces = () => {
  const { visitedPlaces, simulationHistory } = useSimulationHistory();

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
    let newArr = [...arr]?.filter((el) => {
      return !visitedPlaces.includes(el.contentid);
    });
    return newArr;
  };

  const getPlacesFromLocalDataWithHistory = () => {
    // let result = []
    // simulationHistory.map((el) => {
    //   el.day
    //   el.contentid
    //   el.contentTypeId

    //   if (el.contentTypeId)
    // })

  }

  return { filterVisitedPlaces };
};
