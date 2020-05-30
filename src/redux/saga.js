import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import customerSaga from './customer/saga';
import broadcastSaga from './broadcast/saga';

export default function* rootSaga() {
    yield all([authSaga(), customerSaga(), broadcastSaga()]);
}