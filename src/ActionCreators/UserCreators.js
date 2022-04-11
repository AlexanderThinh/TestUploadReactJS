
function LoginUser(payload)  {
    return {
        type: 'USER_LOGIN',
        payload: payload
    }
}

function LogoutUser(payload = null) {
    return {
        type: 'USER_LOGOUT',
        payload: payload
    }
}

export { LoginUser, LogoutUser }