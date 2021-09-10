// const { GET_POST_SUCCESS, GET_POST_FAIL, GET_POST_REQUEST, GET_POST_COUNT_SUCCESS} = require("../actions/postTypes");

import { GET_CARDEALER_COUNT_SUCCESS, GET_CARDEALER_SUCCESS } from "../actions/carDealerTypes"


const initState = {
    cardealerList: [],
    errors: null,
    isLoading: false,
    count: 0
}


const cardealerReducer =( state=initState, {type,payload})=>{
    switch (type) {
        case GET_CARDEALER_SUCCESS:
            return{
                ...state,
                cardealerList: payload.CarDealers,
            }
        
        case GET_CARDEALER_COUNT_SUCCESS:
            return {
                ...state,
                count: payload.count
            }

        default:
            return state
    }
}

export default cardealerReducer
