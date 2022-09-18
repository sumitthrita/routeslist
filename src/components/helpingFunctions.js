import store from "../Redux/store"
export const handleEvent = (id, type) => {
    const el = document.getElementById(id)
    if(type === "click"){
        el && el.click()
    }
    if(type === "focus"){
        el && el.focus()
    }
    if(type === "blur"){
        el && el.blur()
    }
}

export const emptyRoute = () => {
    let routes = [...JSON.parse(store.getState().routeReducer.routes)]
    return {
        id: routes.length+1,
        name: "",
        status : "Active",
        direction : "UP",
        stops: [{
            id: 1,
            name: "",
            latitude: "",
            longitude: ""
        }],
        startPoint: {
            latitude: "",
            longitude: ""
        },
        endPoint: {
            latitude: "",
            longitude: ""
        }
    }
}