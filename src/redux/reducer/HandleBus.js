const initialState = {
    buses: [], searchedInput: []
};

const handleBus = (state = initialState, action) => {



    switch (action.type) {
        case "FoundBus":

            return {
                buses: [...action.payload],
                searchedInput: [state.searchedInput]
            };

            break;
        case "SERCHED":

            return {
                buses: [...state.buses],
                searchedInput: [action.payload]
            };
            break;

        default: return state;


    }
}


export default handleBus;