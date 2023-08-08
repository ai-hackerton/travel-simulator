import { useEffect } from "react";
import { startings } from "../../public/data/startingPoints";

export function useStartings(area) {
  const filteredPlaces = startings.find((el) => el.area === area)?.points || [];

  return { filteredPlaces };
}
