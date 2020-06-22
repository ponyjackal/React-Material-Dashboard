import { takeLatest } from 'redux-saga/effects';
import {
    IMPORT_REQUEST,
    GET_REQUEST,
    ADD_REQUEST,
    importActionType,
    getActionType,
    addActionType,
} from './constants';
import createRequestSaga from './../../lib/createRequestSaga';
import {
    importCustomersAPI,
    getCustomersAPI,
    addCustomerAPI
} from './../../api'

const importSaga = createRequestSaga(importActionType, importCustomersAPI);
const getSaga = createRequestSaga(getActionType, getCustomersAPI);
const addSaga = createRequestSaga(addActionType, addCustomerAPI);

export default function* customerSaga() {
    yield takeLatest(IMPORT_REQUEST, importSaga);
    yield takeLatest(GET_REQUEST, getSaga);
    yield takeLatest(ADD_REQUEST, addSaga);
}
