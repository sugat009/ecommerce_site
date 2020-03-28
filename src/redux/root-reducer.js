import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";

// A JS object that contains the comfigurations for the persistor
// Whitelist key is the list of reducers in string for which to persist
// storage is the storage in use
// key is the root
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer
});

// This function is from redux library that combines all the reducers into one big reducer
// The key are the value in the redux store whereas the value are the respective reducers
// called when necessary
export default persistReducer(persistConfig, rootReducer);
// root reducer with persistence
