import { ADD_ROUTE, UPDATE_ROUTE, DELETE_ROUTE, SHOW_GENERAL_MODAL } from "./actionTypes";

const initialState = {
    routes : JSON.stringify([]),
    showGeneralModal : {} 
    //     {
    //     component, 
    //     title: "Settlement Report",
    //     showModal: true,
    //     handleClose: closeModal
    //   }
}

const routeReducer = ( state = {...initialState}, action) => {

    switch (action.type) {
        case ADD_ROUTE:
            return {
                ...state,
                routes: action.payload
            }
            
        case UPDATE_ROUTE:
            return {
                ...state,
                routes : action.payload
            }
            
        case DELETE_ROUTE:
            return {
                ...state,
                routes: action.payload
            }
        case SHOW_GENERAL_MODAL: {
            return {
                ...state,
                showGeneralModal: action.payload
            }
        }
        default:
            return state;
    }
};

export default routeReducer;