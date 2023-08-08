import { create } from "zustand";

const useTravelSettingsStore = create((set) => ({
  travelSettings: null,

  // {
  //   name: null,
  //   date: null,
  //   city: null,
  //   startLocation: null,
  // },
  setTravelSettings: (newSetting) =>
    set((prev) => ({
      travelSettings: { ...prev.travelSettings, ...newSetting },
      // travelSettings: [...prev.travelSettings, newSetting],
    })),
}));

export default useTravelSettingsStore;
