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

export const LoginHandler = (userdata) => {
    console.log(userdata);
    return {
        type: "LOGIN",
        payload: userdata
    }
}

export const LogoutHandler = () => {
    return {
        type: "LOGOUT"
    }
} 