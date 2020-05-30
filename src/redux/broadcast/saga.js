import { takeLatest } from 'redux-saga/effects';
import { ADD_REQUEST, GET_REQUEST, addActionType, getActionType } from './constants';
import createRequestSaga from './../../lib/createRequestSaga';
import { addBroadcastAPI, getBroadcastsAPI } from './../../api'

const addSaga = createRequestSaga(addActionType, addBroadcastAPI);
const getSaga = createRequestSaga(getActionType, getBroadcastsAPI);
export default function* broadcastSaga() {
    yield takeLatest(ADD_REQUEST, addSaga);
    yield takeLatest(GET_REQUEST, getSaga);
}
