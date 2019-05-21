import { combineReducers } from 'redux';
import userReducer from "./user.reducer"
import githubReducer from './github.reducer';
const rootReducer = combineReducers({
    userState: userReducer,
    githubState: githubReducer
  });
  
  export default rootReducer;