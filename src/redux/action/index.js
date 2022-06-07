export const searchedBus = (buses) => {
    return {
        type: "FoundBus",
        payload: buses
    }
}

export const searchedByCostumer = (searched) => {
    return {
        type: "SERCHED",
        payload: searched
    }
} 