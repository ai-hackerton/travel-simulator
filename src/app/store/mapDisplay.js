import { create } from "zustand";

const useMapDisplay = create((set) => ({
    mapDisplay: false,
    showMap: () => set(() => ({ mapDisplay: true })),
    hideMap: () => set(() => ({ mapDisplay: false }))
}));

export default useMapDisplay;