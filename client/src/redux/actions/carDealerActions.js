import axios from 'axios'
import { prefixe } from '../../helpers/constants'
import { setToken } from '../../helpers/helpers'
import { clearError, setError, startLoading, stopLoading } from './appStateActions'
import { ADD_CARDEALER_SUCCESS, GET_CARDEALER_COUNT_SUCCESS, GET_CARDEALER_SUCCESS, UPDATE_CARDEALER_SUCCESS } from './carDealerTypes'


export const addCarDealer = (newCarDealer) =>async (dispatch)=>{

    dispatch(clearError())
    dispatch(startLoading("Adding NEW CARDEALER ..."))
    setToken()

    try {
        const res = await axios.post(`/api/car/addcardealer`,newCarDealer)
        dispatch({
            type: ADD_CARDEALER_SUCCESS,
            payload: res.data
        })
        
        dispatch(stopLoading())
        
    } catch (err) {
        dispatch(setError(err.response.data.errors))
        dispatch(stopLoading())
    }
}



//     try{
//         const { data } = await axios.post(`/api/car/addcardealer`,newCarDealer)
//         dispatch({
//             type:ADD_CARDEALER_SUCCESS,
//             payload:data
//         })
//         dispatch(getCarDealer(1,4))
//     }catch(err){        
//         dispatch(stopLoading())
//         dispatch(setError(err.response.data.errors))
//     }
// }


export const getCarDealer = (page, limit) => async (dispatch) => {
    try {
        dispatch(startLoading("Getting Cardealers..."))
        dispatch(clearError())
        const { data } = await axios.get(`/api/car/cardealers?page=${page}&limit=${limit}`)
        console.log('data',data);
        dispatch({
            type: GET_CARDEALER_SUCCESS,
            payload: data
        })
        dispatch(stopLoading())
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
        console.log(err);
    }
}
export const getCarDealerCount = () => async (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading("Get cardealers count"))
    try {
        const { data } = await axios.get(`/api/car/cardealercount`)
        dispatch({
            type: GET_CARDEALER_COUNT_SUCCESS,
            payload: data
        })
        dispatch(stopLoading())
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}

export const Updatecardealer = (_id,newCarDealer) =>async (dispatch)=>{
    dispatch(clearError())
    dispatch(startLoading("Updating cardealer.."))

    try {
        setToken()
        const res = await axios.put(`/api/car/updatecardealer/${_id}`,newCarDealer)
        dispatch({
            type: UPDATE_CARDEALER_SUCCESS,
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




export const deletecardealer = (_id) =>async (dispatch)=>{
    dispatch(clearError())
    dispatch(startLoading("Deleting cardealer.."))

    try {
        setToken()
        const res = await axios.delete(`/api/car/deletecardealer/${_id}`)
        dispatch({
            type: UPDATE_CARDEALER_SUCCESS,
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