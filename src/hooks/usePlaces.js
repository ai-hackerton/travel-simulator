import useSimulationHistory from "@/app/store/simulationHistory";

import toursData from "/public/data/places/tours.json";
import culturalsData from "/public/data/places/culturals.json";
import activitiesData from "/public/data/places/activities.json";
import accommodationsData from "/public/data/places/accommodations.json";
import foodsData from "/public/data/places/foods.json";

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

  const matchPlaceFileFromId = (typeId) => {
    switch (typeId) {
      case 12:
        return toursData;
      case 14:
        return culturalsData;
      case 28:
        return activitiesData;
      case 32:
        return accommodationsData;
      case 30:
        return foodsData;
    }
  };

  const filterVisitedPlaces = (arr) => {
    let newArr = [...arr]?.filter((el) => {
      return !visitedPlaces.includes(el.contentid);
    });
    return newArr;
  };

  const getMatchingPlaceFromFile = (data, contentid) => {
    return data[contentid] || null;
  };

  const getPlacesFromLocalDataWithHistory = () => {
    if (simulationHistory?.length) {
      const days = parseInt(
        simulationHistory[simulationHistory.length - 1].day
      );
      let result = Array.from({ length: days }, () => []);

      simulationHistory.map((el) => {
        // el.day
        // el.contentid
        // el.contentTypeId
        const file = matchPlaceFileFromId(el.contentTypeId);
        const item = getMatchingPlaceFromFile(file, el.contentid);
        result[el.day - 1].push(item);
      });
      return result;
    } else {
      return [];
    }
  };

  return { filterVisitedPlaces, getPlacesFromLocalDataWithHistory };
};
