import { takeLatest, takeEvery } from 'redux-saga/effects';
import { GET_REQUEST, getActionType, SEND_REQUEST, sendActionType } from './constants';
import createRequestSaga from './../../lib/createRequestSaga';
import { getMessagesAPI, sendMessageAPI } from './../../api'

const getSaga = createRequestSaga(getActionType, getMessagesAPI);
const sendSaga = createRequestSaga(sendActionType, sendMessageAPI);

export default function* messagedSaga() {
    yield takeLatest(GET_REQUEST, getSaga);
    yield takeEvery(SEND_REQUEST, sendSaga);
}
