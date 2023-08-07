import { create } from "zustand";

const useSimulationIndex = create((set) => ({
    currentIndex: 0,
    decreaseIndex: () => set((state) => {
        if (state.currentIndex === 0) return { currentIndex: 3};
        return { currentIndex: state.currentIndex - 1 }
    }),
    increaseIndex: () => set((state) => {
        if (state.currentIndex === 4) return { currentIndex: 0 };
        return { currentIndex: state.currentIndex + 1 };
    }),
}))

export default useSimulationIndex;