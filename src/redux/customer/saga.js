import { takeLatest } from 'redux-saga/effects';
import { IMPORT_REQUEST, GET_REQUEST, importActionType, getActionType } from './constants';
import createRequestSaga from './../../lib/createRequestSaga';
import { importCustomersAPI, getCustomersAPI } from './../../api'

const importSaga = createRequestSaga(importActionType, importCustomersAPI);
const getSaga = createRequestSaga(getActionType, getCustomersAPI);
export default function* customerSaga() {
    yield takeLatest(IMPORT_REQUEST, importSaga);
    yield takeLatest(GET_REQUEST, getSaga);
}
