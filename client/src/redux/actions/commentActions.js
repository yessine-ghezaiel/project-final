import axios from 'axios'
import { prefixe } from '../../helpers/constants'
import { setToken } from '../../helpers/helpers'
import { clearError, setError, startLoading, stopLoading } from './appStateActions'
import { ADD_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS, GET_COMMENT_COUNT_SUCCESS, GET_COMMENT_SUCCESS, UPDATE_COMMENT_SUCCESS } from './commentTypes'


export const addComment = (id,newComment) =>async (dispatch)=>{
    
    try{
        dispatch(startLoading("Adding comment ..."))
        dispatch(clearError())
        setToken()
        const {data} = await axios.post(`/api/comment/addcomment/${id}`,newComment)
        dispatch({
            type:ADD_COMMENT_SUCCESS,
            payload:data
        })
        dispatch(getComment(id))
        // dispatch(getMyPost())
    }catch(err){        
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}


export const getComment = (id) => async (dispatch) => {
    try {
        dispatch(startLoading("Getting Posts..."))
        dispatch(clearError())
        const { data } = await axios.get(`/api/comment/comments/${id}`)
        dispatch({
            type: GET_COMMENT_SUCCESS,
            payload: data
        })
        dispatch(stopLoading())
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}

export const getCommentCount = () => async (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading("Get Comment count"))
    try {
        const { data } = await axios.get(`/api/comment/commentcount`)
        dispatch({
            type: GET_COMMENT_COUNT_SUCCESS,
            payload: data
        })
        dispatch(stopLoading())
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}





export const deletecomment = (id) =>async (dispatch)=>{
    dispatch(clearError())
    dispatch(startLoading("deleting comment.."))

    try {
        setToken()
        const res = await axios.delete(`/api/comment/deletecomment/${id}`)
        dispatch({
            type: DELETE_COMMENT_SUCCESS,
            payload: res.data
        })
        console.log(res.data)
        dispatch(stopLoading())
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
        console.log(err)
    }
}



export const updateComment = (id,newComment) =>async (dispatch)=>{
    dispatch(clearError())
    dispatch(startLoading("Updating Commennt..."))

    try {
        setToken()
        const res = await axios.put(`/api/comment/updatecomment/${id}`,newComment)
        console.log(res)
        dispatch({
            type: UPDATE_COMMENT_SUCCESS,
            payload: res.data
        })
        console.log(res.data)
        dispatch(stopLoading())
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
        console.log(err)
    }
}