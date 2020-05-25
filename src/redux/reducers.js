import { combineReducers } from 'redux';
import auth from './auth/reducers';
import loading from './loading/reducers'


const rootReducer = combineReducers({
    auth,
    loading,
});

export default rootReducer;
