import { create } from "zustand";
import useTravelSettingsStore from "./travelSettings";

// TODO: 여기가 계속해서 추적하는 값인지(바뀔때마다 ...) 처음 초깃값으로 사용하는 건지 확인
const useCurrentStatus = create((set) => ({
  // (화면에 보이는) 현재 장소 정보
  day: 1,
  prevDay: () => set((state) => ({ day: state.day - 1 })),
  nextDay: () => set((state) => ({ day: state.day + 1 })),

  place:
    useTravelSettingsStore.getState().travelSettings?.startLocation?.title ||
    "강릉역",
  setPlace: (newPlace) => set(() => ({ place: newPlace })),

  location: useTravelSettingsStore.getState().travelSettings?.startLocation
    ?.coords || {
    x: 128.8990861,
    y: 37.7637611,
  },
  setLocation: (newX, newY) =>
    set(() => ({ location: { x: parseFloat(newX), y: parseFloat(newY) } })),

  // 선택지에 따른 다음 장소 정보
  contentTypeId: null,
  setContentTypeId: (id) => set(() => ({ contentTypeId: id })),

  contentId: null,
  setContentId: (id) => set(() => ({ contentId: id })),

  // eventsPerDay: 0,
  // increaseEvent: () => set((state) => ({eventsPerDay: state.eventsPerDay + 1})),
  // decreaseEvent: () => set((state) => ({eventsPerDay: state.eventsPerDay - 1})),
}));

export default useCurrentStatus;
