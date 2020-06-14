import { takeLatest, takeEvery } from 'redux-saga/effects';
import {
    GET_REQUEST,
    getActionType,
    SEND_REQUEST,
    sendActionType,
    UNSUBSCRIBE_REQUEST,
    unsubscribeActionType,
    ARCHIVE_REQUEST,
    archiveActionType,
    READ_REQUEST,
    readActionType,
} from './constants';
import createRequestSaga from './../../lib/createRequestSaga';
import {
    getMessagesAPI,
    sendMessageAPI,
    unsubscribeAPI,
    archiveAPI,
    markAsReadAPI,
} from './../../api'

const getSaga = createRequestSaga(getActionType, getMessagesAPI);
const sendSaga = createRequestSaga(sendActionType, sendMessageAPI);
const unsubscribeSaga = createRequestSaga(unsubscribeActionType, unsubscribeAPI);
const archiveSaga = createRequestSaga(archiveActionType, archiveAPI);
const markAsReadSaga = createRequestSaga(readActionType, markAsReadAPI);

export default function* messagedSaga() {
    yield takeLatest(GET_REQUEST, getSaga);
    yield takeEvery(SEND_REQUEST, sendSaga);
    yield takeLatest(UNSUBSCRIBE_REQUEST, unsubscribeSaga);
    yield takeLatest(ARCHIVE_REQUEST, archiveSaga);
    yield takeLatest(READ_REQUEST, markAsReadSaga);
}
