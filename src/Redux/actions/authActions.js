export const updateLoggedInUser = (uid) => {
    return {
        type: 'USER_LOGGED_IN',
        payload: {
            loggedInUserUID: uid
        }
    }
}

