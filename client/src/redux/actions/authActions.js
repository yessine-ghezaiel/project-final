import { GET_PROFILE_SUCCESS,LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS} from  './authTypes'
import axios from 'axios'
import { prefixe } from '../../helpers/constants'
import { setToken } from '../../helpers/helpers'
import { getMyPost } from './postActions'
import { clearError, setError, startLoading, stopLoading } from './appStateActions'



export const login =(info)=>async(dispatch)=>{
    dispatch(clearError())
    dispatch(startLoading("Login"))
    try{
        const res = await axios.post(`/api/user/login`,info)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(stopLoading())
        dispatch(getProfile())
    } catch (err) {
        console.log(err);
        dispatch(setError(err.response.data.errors))
        dispatch(stopLoading())
    }
}

export const register = (info) => async (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading("Register"))
    try {
        const {data} = await axios.post(`/api/user/register`, info)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data
        })
        dispatch(stopLoading())
        dispatch(getProfile())
    } catch (err) {
        console.log(err)
        dispatch(setError(err.response.data.errors))
        dispatch(stopLoading())
    }
}

export const getProfile = ()=>async(dispatch)=>{
    dispatch(clearError())
    dispatch(startLoading("Get my profile"))
    console.log('get profile dispatched')
    try{
        setToken()
        const { data } = await axios.get(`/api/user/getprofile`)
        dispatch ({
            type:GET_PROFILE_SUCCESS,
            payload:data
        })
    dispatch(getMyPost())
        
    }
    catch(err){
        console.log('get profile',err)
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}
export const logout =() => {
    return{
        type:LOGOUT
    }
}