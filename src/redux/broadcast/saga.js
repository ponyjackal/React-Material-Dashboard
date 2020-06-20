import { takeLatest } from 'redux-saga/effects';
import {
    ADD_REQUEST,
    GET_REQUEST,
    PUBLISH_REQUEST,
    publishActionType,
    addActionType,
    getActionType
} from './constants';
import createRequestSaga from './../../lib/createRequestSaga';
import { addBroadcastAPI, getBroadcastsAPI, publishBroadcastAPI } from './../../api'

const addSaga = createRequestSaga(addActionType, addBroadcastAPI);
const publishSaga = createRequestSaga(publishActionType, publishBroadcastAPI);
const getSaga = createRequestSaga(getActionType, getBroadcastsAPI);
export default function* broadcastSaga() {
    yield takeLatest(ADD_REQUEST, addSaga);
    yield takeLatest(PUBLISH_REQUEST, publishSaga);
    yield takeLatest(GET_REQUEST, getSaga);
}
