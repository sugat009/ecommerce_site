import ShopActionTypes from "./shop.types";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapshot => {
            // This dispatch call changes the state of this component which causes the
            // ReactDOM to re-render or recall the render method but this time the loading
            // is false so the components are displayed with data
            dispatch(fetchCollectionsSuccess(convertCollectionsSnapshotToMap(snapshot)));
        }).catch(error => {
            dispatch(fetchCollectionsFailure(error));
        });
    }
};
