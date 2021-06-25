// Action creator
export function loadUser(data) {
    return {
        type: 'LOGIN',
        payload: data
    }
}

// Action creator
export function logout(data) {
    return {
        type: 'LOGOUT',
        payload: data
    }
}