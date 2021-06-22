// Action creator
export function loadUser(data) {
    return {
        type: 'LOGIN',
        payLoad: data
    }
}

// Action creator
export function logout(data) {
    return {
        type: 'LOGOUT',
        payLoad: data
    }
}