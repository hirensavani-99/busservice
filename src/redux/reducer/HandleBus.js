const buses = [];

const handleBus = (state = buses, action) => {
    const bus = action.payload

    switch (action.type) {
        case "FoundBus":
            return [...bus]
            break;
        default: return state;
    }
}

export default handleBus;