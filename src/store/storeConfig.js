import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/user';

const reducers = combineReducers({
    user: userReducer,
    logout: function(state, action) { 
        console.log('Reducer: Logout');
        console.log(state, ' ', action);
        return {
            name: 1,
            email: 1,
            actived: false
        }
    },
})

function storeConfig() {
    return createStore(reducers);
}

export default storeConfig;