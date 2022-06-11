const initialState = {
    user: JSON.parse(localStorage.getItem('userData')) || undefined
};

const handleUser = (state = initialState, action) => {
    console.log(action.payload);
    switch (action.type) {
        case "LOGIN":

            return {
                user: action.payload
            };
            break;
        case "LOGOUT":

            return {
                user: localStorage.removeItem('userData')
            };
            break;

        default: return state;


    }
}


export default handleUser;