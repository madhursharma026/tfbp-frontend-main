import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducers, userRegisterReducers, userDetailReducers, userUpdateReducers } from './reducers/userReducers';

const reducer = combineReducers({
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetail: userDetailReducers,
    userUpdate: userUpdateReducers,
  });
  
  
  const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null
  
  const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
  };
  
  const middleware = [thunk];
  
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
  export default store;
  