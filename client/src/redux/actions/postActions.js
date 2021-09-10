import axios from 'axios'
import { prefixe } from '../../helpers/constants'
import { setToken } from '../../helpers/helpers'
import {  ADD_POST_SUCCESS, DELETE_POST_SUCCESS,  GET_MY_POST_SUCCESS, GET_POST_COUNT_SUCCESS, GET_POST_FAIL, GET_POST_REQUEST, GET_POST_SUCCESS, UPDATE_POST_SUCCESS } from './postTypes'
import { clearError, setError, startLoading, stopLoading } from './appStateActions'


export const addPost = (newPost) =>async (dispatch)=>{
    
    try{
        dispatch(startLoading("Adding post ..."))
        dispatch(clearError())
        setToken()
        const {data} = await axios.post(`${prefixe}/api/post/addpost`,newPost)
        dispatch({
            type:ADD_POST_SUCCESS,
            payload:data
        })
        dispatch(getPost(1,4))
        // dispatch(getMyPost())
    }catch(err){        
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}


export const getPost = (page, limit,search) => async (dispatch) => {
    try {
        dispatch(startLoading("Getting Posts..."))
        dispatch(clearError())
        const { data } = await axios.get(`${prefixe}/api/post/posts?page=${page}&limit=${limit}&search=${search}`)
        dispatch({
            type: GET_POST_SUCCESS,
            payload: data
        })
        dispatch(stopLoading())
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}

export const getPostCount = () => async (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading("Get post count"))
    try {
        
        const { data } = await axios.get(`${prefixe}/api/post/postcount`)
        dispatch({
            type: GET_POST_COUNT_SUCCESS,
            payload: data
        })
        dispatch(stopLoading())
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}



export const getMyPost = (search) => async (dispatch) => {
    
    dispatch(clearError())
    dispatch(startLoading("Getting My Posts"))
    try {
        setToken()
        
        const { data } = await axios.get(`${prefixe}/api/post/myposts?search=${search}`)
        dispatch({
            type: GET_MY_POST_SUCCESS,
            payload: data
        })
        console.log(data)
        dispatch(stopLoading())
    }

    catch (err) {
    dispatch(stopLoading())
    dispatch(setError(err.response.data.errors))
    }
}


export const deletepost = (_id) =>async (dispatch)=>{
    dispatch(clearError())
    dispatch(startLoading("deleting post.."))

    try {
        setToken()
        const res = await axios.delete(`${prefixe}/api/post/deletepost/${_id}`)
        dispatch({
            type: DELETE_POST_SUCCESS,
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



export const UpdatePost = (_id,newPost) =>async (dispatch)=>{
    dispatch(clearError())
    dispatch(startLoading("Updating Post..."))

    try {
        setToken()
        const res = await axios.put(`${prefixe}/api/post/updatepost/${_id}`,newPost)
        dispatch({
            type: UPDATE_POST_SUCCESS,
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