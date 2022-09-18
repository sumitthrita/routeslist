import { toast } from "react-toastify";
import { ADD_ROUTE, DELETE_ROUTE, UPDATE_ROUTE, SHOW_GENERAL_MODAL } from "./actionTypes";
import store from "./store";

export const addRoute = (route) => {
    let routes = [...JSON.parse(store.getState().routeReducer.routes), route]
    return dispatch => {
        dispatch({
            type : ADD_ROUTE, 
            payload: JSON.stringify(routes)
        })
        toast.success("Route added Successfully.")
        dispatch(showGeneralModalAction({showModal : false}))
    }
}

export const deleteRoute = (id, source) => {
    let routes = [...JSON.parse(store.getState().routeReducer.routes)]
    routes.splice(routes.findIndex(e => e.id === id), 1)
    return dispatch => {
        dispatch({
            type: DELETE_ROUTE,
            payload: JSON.stringify(routes)
        })
        toast.success("Route deleted Successfully.")
        if(source === "modal"){
            dispatch(showGeneralModalAction({showModal : false}))
        }
    }
}

export const updateRoute = (id, route) => {
    const routes = [...JSON.parse(store.getState().routeReducer.routes)]
    routes[routes.findIndex(e => e.id === id)] = route
    return dispatch => {
        dispatch({
            type: UPDATE_ROUTE,
            payload: JSON.stringify(routes)
        })
        toast.success("Route updated successfully.")
        dispatch(showGeneralModalAction({showModal : false}))
    }
}

export const showGeneralModalAction = (payload) => {
    return dispatch => {
        dispatch({
            type: SHOW_GENERAL_MODAL,
            payload: payload
        })
    }
}