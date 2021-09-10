import { GET_COMMENT_COUNT_SUCCESS, GET_COMMENT_SUCCESS } from "../actions/commentTypes"


const initState = {
    commentList: [],
    errors: null,
    isLoading: false,
    count: 0
}


const commentReducer =( state=initState, {type,payload})=>{
    switch (type) {
        case GET_COMMENT_SUCCESS:
            return{
                ...state,
                commentList: payload.comments,
            }
        case GET_COMMENT_COUNT_SUCCESS:
            return {
                ...state,
                count: payload.count
            }

        default:
            return state
    }
}

export default commentReducer