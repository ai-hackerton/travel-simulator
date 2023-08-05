import { create } from "zustand";

const useCurrentStatus = create((set) => ({
    day: 1,
    prevDay: () => set((state) => ({ day: state.day - 1})),
    nextDay: () => set((state) => ({ day: state.day + 1})),

    place: "강릉역",
    setPlace: (newPlace) => set(() => ({ place: newPlace })),

    location: { x: 128.8990861, y: 37.7637611 },
    setLocation: (newX, newY) => set(() => ({ location: { x: newX, y: newY } })),

    contentTypeId: null,
    setContentTypeId: (id) => set(() => ({ contentTypeId: id })),

    contentId: null,
    setContentId: (id) => set(() => ({ contentId: id })),

    schedulesPerDay: 0,
    addSchedule: () => set((state) => ({schedulesPerDay: state.schedulesPerDay + 1})),
    cancelSchedule: () => set((state) => ({schedulesPerDay: state.schedulesPerDay - 1})),
}));

export default useCurrentStatus;