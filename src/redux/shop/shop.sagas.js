import {call, put, takeLatest} from 'redux-saga/effects';

import ShopActionTypes from "./shop.types";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./shop.actions";

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        // This is very similar to async await in which the value from collectionRef get
        // is stored in the snapshot
        const snapshot = yield collectionRef.get();
        // call() executes the function passed into it, the function may be a normal one or
        // maybe a generator
        // the passed function may return an iterable or a normal object
        // if the returned object is an iterable then, it iterates over it
        // if the returned object is a promise then, call will suspend the parent generators
        // in this case fetchCollectionsAsync() and gets the promise value
        // else the call is just a function call
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

        // In saga generators dispatch() function is simulated using an effect called put
        // usage is similar to that of dispatch but needs to be yielded
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (e) {
        yield put(fetchCollectionsFailure(e));
    }
}

// This is a saga function
// Also, it is a generator function meaning that it will pause in the middle handing the
// control to its caller
// takeEvery is used to listen a specific action which is the first parameter
// the second parameter is the function that is to be fired once that action is caught
// also the function must be generator type
export function* fetchCollectionsStart() {
    // On a side note takeEvery() spawns a new saga every time the action gets caught
    // take() on gets the action once
    // takeLatest() on fires the latest action if mutiple actions are fired before the previous action
    // has completed
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
