import { combineReducers } from 'redux';
import auth from './auth/reducers';
import customer from './customer/reducers';
import broadcast from './broadcast/reducers';
import loading from './loading/reducers'


const rootReducer = combineReducers({
    auth,
    customer,
    broadcast,
    loading,
});

export default rootReducer;
