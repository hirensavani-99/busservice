import handleBus from "./HandleBus";
import handleUser from "./handleUser"
import { combineReducers } from "redux";
const rootReducers = combineReducers({
    handleBus,
    handleUser
})
export default rootReducers;