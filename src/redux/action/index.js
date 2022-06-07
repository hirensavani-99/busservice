export const searchedBus = (buses) => {
    return {
        type: "FoundBus",
        payload: buses
    }
} 