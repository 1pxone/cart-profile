//action creators
import axios from 'axios';
import * as api from './_urls';
import * as actionType from './constants';
import { checkErrorsDeeper } from '../utils/';
import { fetchCartPassive } from './cart_new';

export function userHasErrored(bool) {
    return {
        type: actionType.USER_HAS_ERRORED,
        hasErrored: bool
    };
}

export function userIsLoading(bool) {
    return {
        type: actionType.USER_IS_LOADING,
        isLoaing: bool
    };
}

export function userIsAuth(bool) {
    return {
        type: actionType.USER_IS_AUTH,
        isAuth: bool
    };
}

export function userGetSuccess(user) {
    return {
        type: actionType.USER_GET_SUCCESS,
        user
    };
}

export function userIsUpdating(bool) {
    return {
        type: actionType.USER_IS_UPDATING,
        isUpdating: bool
    };
}

export function  userLoginRequest(bool) {
    return {
        type: actionType.USERS_LOGIN_REQUEST,
        loginRequest: bool
    };
}

export function  userLoginErrors(errors) {
    return {
        type: actionType.USERS_LOGIN_ERRORS,
        loginErrors: errors
    };
}

export function  userRestoreRequest(bool) {
    return {
        type: actionType.USERS_RESTORE_REQUEST,
        restoreRequest: bool
    };
}

export function  userRestoreErrors(errors) {
    return {
        type: actionType.USERS_RESTORE_ERRORS,
        restoreErrors: errors
    };
}

export function  userRegisterRequest(bool) {
    return {
        type: actionType.USERS_REGISTER_REQUEST,
        registerRequest: bool
    };
}

export function  userRegisterErrors(errors) {
    return {
        type: actionType.USERS_REGISTER_ERRORS,
        registerErrors: errors
    };
}

export function  userChangePassRequest(bool) {
    return {
        type: actionType.USERS_CHANGE_PASS_REQUEST,
        changePassRequest: bool
    };
}

export function  userLogoutRequest(bool) {
    return {
        type: actionType.USERS_LOGOUT_REQUEST,
        logoutRequest: bool
    };
}

export function  userChangePassErrors(errors) {
    return {
        type: actionType.USERS_CHANGE_PASS_ERRORS,
        changePassErrors: errors
    };
}

export function  userRestoreSuccess(bool) {
    return {
        type: actionType.USERS_RESTORE_SUCCESS,
        restoreSuccess: bool
    };
}


export function updateUserPass(data){
    return (dispatch) => {
        dispatch(userChangePassErrors([]));
        dispatch(userChangePassRequest(true));
        axios.patch(api.url_user_password, data)
          .then((response) => {
            if(response.status === 500){
                throw Error(response.statusText)
            }
            dispatch(userChangePassRequest(false));
            return response;
        })
        .catch(err => {
          if (err.response) {
            var errors = [];
            var target = err.response.data.errors.children;
            checkErrorsDeeper(target,errors,"errors");
            dispatch(userChangePassErrors(errors));
            dispatch(userChangePassRequest(false));
          }
        });
    }
}

export function restorePass(email){
    return (dispatch) => {
        dispatch(userRestoreErrors([]));
        dispatch(userRestoreSuccess(false));
        dispatch(userRestoreRequest(true));
        axios.post(api.url_user_resetpass, email)
        .then((response)=>{
            dispatch(userRestoreRequest(false));
            if(response.data && response.data.success === true){
                dispatch(userRestoreSuccess(true));
            }
        })
        .catch(err => {
            if (err.response) {
                var errors = [];
                errors.push(err.response.data.reason);
                dispatch(userRestoreErrors(errors));
                dispatch(userRestoreRequest(false));
            }
        });
    }
}

export function updateUserData(data){
    return (dispatch) => {
        dispatch(userIsUpdating(true))
        axios.post(api.url_user, data)
        .then((response) => {
            if(response.status === 500){
                throw Error(response.statusText)
            }
            // dispatch(userIsUpdating(false))
            dispatch(fetchUserDataPassive())
            return response
        })
        .catch(() => {
            dispatch(userHasErrored(true))
            dispatch(userIsUpdating(false))
        })
    }
}

export function fetchUserDataPassive(){
    return (dispatch) => {
        dispatch(userIsUpdating(true))
        axios.get(api.url_user)
        .then((response) => {
            if(response.status === 500){
                throw Error(response.statusText)
            }
            return response.data
        })
        .then((user) => {
            dispatch(userGetSuccess(user))
            if(Object.keys(user).length === 0){
                dispatch(userIsAuth(false))
            } else {
                dispatch(userIsAuth(true))
            }
            dispatch(userIsUpdating(false))
        })
        .catch(() => {
            dispatch(userHasErrored(true))
            dispatch(userIsUpdating(false))
        })
    }
}

export function fetchUserData(){
    return (dispatch) => {
        dispatch(userIsLoading(true));
        axios.get(api.url_user)
        .then((response) => {
            if(response.status === 500){
                throw Error(response.statusText)
            }
            return response.data
        })
        .then((user) => {
            dispatch(userGetSuccess(user))
            if(Object.keys(user).length === 0){
                dispatch(userIsAuth(false))
            } else {
                dispatch(userIsAuth(true))
            }
            dispatch(userIsLoading(false))
        })
        .catch(() => {
            dispatch(userHasErrored(true))
            dispatch(userIsLoading(false))
        })
    }
}

export function logout(){
    return (dispatch) => {
        dispatch(userLogoutRequest(true));
        axios.post('/logout').then(function () {
            dispatch(userLogoutRequest(false))
            window.location.reload()
        })
        .catch(err => {
            if (err.response) {
                var errors = []
                errors.push(err.response.data.reason)
                dispatch(userLogoutRequest(false))
            }
        });
    }
}

export function login(data){
    return (dispatch) => {
        dispatch(userLoginRequest(true));
        axios.post(api.url_login, data)
        .then(res => {
            dispatch(fetchUserData())
            dispatch(fetchCartPassive())
            dispatch(userLoginRequest(true))
        })
        .catch(err => {
            if (err.response) {
                var errors = [];
                errors.push(err.response.data.reason);
                dispatch(userLoginErrors(errors));
                dispatch(userLoginRequest(false));
            }
        })
    }
}

export function register(form){
    return (dispatch) => {
        dispatch(userRegisterRequest(true));
        var form_data = new FormData();
        for ( var key in form ){
            var fieldvalue = form[key];
            if (key === "fos_user_registration_form[phone]"){
                fieldvalue = fieldvalue.replace(/[^0-9]/gim,'');
            }
            form_data.append(key, fieldvalue);
        };
        axios.post(api.url_register, form_data)
        .then(res => {
            dispatch(fetchUserData());
            dispatch(userRegisterRequest(false));
        })
        .catch(err => {
            if (err.response) {
                var errors = [];
                var target = err.response.data.errors.children;
                checkErrorsDeeper(target,errors,"errors");
                dispatch(userRegisterErrors(errors));
                dispatch(userRegisterRequest(false));
            }
        })
    }
}
