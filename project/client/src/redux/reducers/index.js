import { combineReducers } from "redux";
import appStateReducer from "./appStateReducer";
import authReducer from './authReducer'; 
import postReducer from './postReducer';
import cardealerReducer from './cardealerReducer'
import commentReducer from "./commentReducer";

export default combineReducers({
    auth:authReducer,
    posts:postReducer,
    cardealers:cardealerReducer,
    appState: appStateReducer,
    comments:commentReducer
})