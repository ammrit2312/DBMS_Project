import {createStore, combineReducers} from 'redux';
import {userInfo} from './ducks/userInfo';

const allReducers = combineReducers({
    userInfo
});

const store = createStore(allReducers);

export default store;