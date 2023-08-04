import { create } from "zustand";

const useSimulationIndex = create((set) => ({
    currentIndex: 0,
    decreaseIndex: () => set((state) => ({ currentIndex: state.currentIndex - 1 })),
    increaseIndex: () => set((state) => {
        if (state.currentIndex === 4) {
            console.log("시뮬레이션 종료");
            return state;
        }
        return { currentIndex: state.currentIndex + 1 };
    }),
}))

export default useSimulationIndex;