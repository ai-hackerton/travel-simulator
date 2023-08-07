import { create } from "zustand";

const useSimulationHistory = create((set) => ({
    simulationHistory: [],
    addEvent: (event) => set((state) => ({ simulationHistory: [...state.simulationHistory, event]})),
    deleteEvent: () => set((state) => ({
        simulationHistory: state.simulationHistory.length > 0
            ? state.simulationHistory.slice(0, -1)
            : state.simulationHistory
    })),
}));

export default useSimulationHistory;