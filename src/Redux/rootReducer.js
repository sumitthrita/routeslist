import { combineReducers } from "redux";

import routeReducer from "./routeReducer";

let rootReducer = combineReducers({
    routeReducer : routeReducer
})

export default rootReducer;