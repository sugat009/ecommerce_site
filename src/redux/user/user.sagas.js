import {all, call, put, takeLatest} from 'redux-saga/effects';

import UserActionTypes from "./user.types";
import {auth, createUserProfileDocument, googleProvider} from "../../firebase/firebase.utils";
import {signInFailure, signInSuccess} from "./user.actions";

export function* getSnapshotFromUserAuth(user) {
    try {
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    } catch (e) {
        yield put(signInFailure(e));
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (e) {
        yield put(signInFailure(e));
    }
}

// Whole action object is passed into this function once it is caught by the saga generator below
export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (e) {
        yield put(signInFailure(e));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart)
    ]);
}
