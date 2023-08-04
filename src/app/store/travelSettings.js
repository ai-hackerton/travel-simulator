import { create } from "zustand";

const useTravelSettingsStore = create((set) => ({
  travelSettings: [],
  setTravelSettings: (newSetting) =>
    set((prev) => ({
      travelSettings: [...prev.travelSettings, newSetting],
    })),
}));

export default useTravelSettingsStore;
