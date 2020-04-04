import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from "./root-reducer";
import {fetchCollectionsStart} from "./shop/shop.sagas";

// This function creates a returns a saga object
// it can be passed configurations
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// The middleware is activated using its run method and all the sagas
// that are to be used are passed into it
sagaMiddleware.run(fetchCollectionsStart);

export const persistor = persistStore(store);

export default {store, persistor};
