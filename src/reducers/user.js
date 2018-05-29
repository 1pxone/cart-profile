export function userHasErrored(state = false, action){
    switch (action.type) {
        case 'USER_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function userIsLoading(state = false, action){
    switch (action.type) {
        case 'USER_IS_LOADING':
            return action.isLoaing;

        default:
            return state;
    }
}

export function userIsUpdating(state = false, action){
    switch (action.type) {
        case 'USER_IS_UPDATING':
            return action.isUpdating;

        default:
            return state;
    }
}

export function userIsAuth(state = false, action){
    switch (action.type) {
        case 'USER_IS_AUTH':
            return action.isAuth;

        default:
            return state;
    }
}

export function user(state = "", action){
    switch (action.type) {
        case 'USER_GET_SUCCESS':
            return action.user;

        default:
            return state;
    }
}

export function userLoginRequest(state = false, action){
    switch (action.type) {
        case 'USERS_LOGIN_REQUEST':
            return action.loginRequest;

        default:
            return state;
    }
}

export function userLogoutRequest(state = false, action){
    switch (action.type) {
        case 'USERS_LOGOUT_REQUEST':
            return action.logoutRequest;

        default:
            return state;
    }
}

export function userLoginErrors(state = [], action){
    switch (action.type) {
        case 'USERS_LOGIN_ERRORS':
            return action.loginErrors;

        default:
            return state;
    }
}

export function userRestoreRequest(state = false, action){
    switch (action.type) {
        case 'USERS_RESTORE_REQUEST':
            return action.restoreRequest;

        default:
            return state;
    }
}

export function userRestoreErrors(state = [], action){
    switch (action.type) {
        case 'USERS_RESTORE_ERRORS':
            return action.restoreErrors;

        default:
            return state;
    }
}

export function userRegisterRequest(state = false, action){
    switch (action.type) {
        case 'USERS_REGISTER_REQUEST':
            return action.registerRequest;

        default:
            return state;
    }
}

export function userRegisterErrors(state = [], action){
    switch (action.type) {
        case 'USERS_REGISTER_ERRORS':
            return action.registerErrors;

        default:
            return state;
    }
}

export function userChangePassRequest(state = false, action){
    switch (action.type) {
        case 'USERS_CHANGE_PASS_REQUEST':
            return action.changePassRequest;

        default:
            return state;
    }
}

export function userChangePassErrors(state = [], action){
    switch (action.type) {
        case 'USERS_CHANGE_PASS_ERRORS':
            return action.changePassErrors;

        default:
            return state;
    }
}

export function userRestoreSuccess(state = false, action){
    switch (action.type) {
        case 'USERS_RESTORE_SUCCESS':
            return action.restoreSuccess;

        default:
            return state;
    }
}
