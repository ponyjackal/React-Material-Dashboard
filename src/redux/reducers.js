import { combineReducers } from 'redux';
import auth from './auth/reducers';
import customer from './customer/reducers';
import broadcast from './broadcast/reducers';
import dashboard from './dashboard/reducers';
import loading from './loading/reducers'


const rootReducer = combineReducers({
    auth,
    customer,
    broadcast,
    dashboard,
    loading,
});

export default rootReducer;
