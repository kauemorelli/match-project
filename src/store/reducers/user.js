
// import { apiLogin } from './../../api/apiLogin';

const initialState = {
    name: 1,
    email: 1,
    actived: false
}

export default function execute(state = initialState, action) {
    // debugger;
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                name: action.payload,
                email: 1,
                actived: true
            }
        case 'LOGOUT':
            return {
                ...state,
                name: action.payload,
                email: 1,
                actived: false
            }
        default:
            return state
    }
}