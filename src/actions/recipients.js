import axios from 'axios';
import * as actionType from './constants';
import * as api from './_urls';

export function recipientsIsLoading(bool) {
    return {
        type: actionType.RECIPIENTS_IS_LOADING,
        isLoading: bool
    };
}

export function recipients(recipients) {
    return {
        type: actionType.RECIPIENTS,
        recipients
    };
}

export function recipientsHasErrored(bool) {
    return {
        type: actionType.RECIPIENTS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function recipientsIsUpdating(bool) {
    return {
        type: actionType.RECIPIENTS_IS_UPDATING,
        isUpdating: bool
    };
}

export function recipientsIsAdding(bool) {
    return {
        type: actionType.RECIPIENTS_IS_ADDING,
        isAdding: bool
    };
}

export function recipientsAddSuccess(bool) {
    return {
        type: actionType.RECIPIENTS_ADD_SUCCESS,
        addSuccess: bool
    };
}

export function recipientsAddHasErrored(bool) {
    return {
        type: actionType.RECIPIENTS_ADD_HAS_ERRORED,
        addError: bool
    };
}

// THUNKS

//GET RECIPIENTS
export function recipientsFetchData(){
    return (dispatch, getState) => {
        dispatch(recipientsIsLoading(true));
        axios.get(api.url_recipients)
        .then((response) => {
            if(response.statusText !== "OK"){
                throw Error(response.statusText);
            }
            return response.data;
        })
        .then((data) => {
            if(data.length){
                var activeRecipients = data.filter(a => (a['isActive'] === true));
                if(!activeRecipients.length){
                    dispatch(selectRecipient(data[0].id))
                }
                dispatch(recipients(data))
            } else {
                const isAuth = getState().userIsAuth;
                if(isAuth){
                    const { surname, firstname, phone } = getState().user;
                    var form = {
                        isActive:  true,
                        firstName:  firstname,
                        lastName: surname,
                        phone:  phone
                    };
                    if(surname && firstname && phone){
                        dispatch(recipientsAdd(form));
                    }
                }
            }
            dispatch(recipientsIsLoading(false))
        })
        .catch((err) => {
            console.log(err)
            dispatch(recipientsIsLoading(false))
            dispatch(recipientsHasErrored(true))
        });
    }
}

//GET RECIPIENTS ON DEMAND
export function recipientsFetchDataPassive(){
    return (dispatch) => {
        dispatch(recipientsIsUpdating(true));
        axios.get(api.url_recipients)
        .then((response) => {
            if(response.statusText !== "OK"){
                throw Error(response.statusText);
            }
            return response.data;
        })
        .then((data) => {
            dispatch(recipients(data))
            dispatch(recipientsIsUpdating(false))
        })
        .catch((err) => {
            console.log(err)
            dispatch(recipientsIsUpdating(false))
            dispatch(recipientsHasErrored(true))
        });
    }
}

//SELECT ADDRESS
export function selectRecipient(id){
    return (dispatch) => {
        dispatch(recipientsIsUpdating(true));
        var url = api.url_recipients + "/" + id;
        axios.patch(url, {"isActive":true})
        .then((response) => {
            if(response.statusText !== "OK"){
                throw Error(response.statusText);
            }
            return response.data;
        })
        .then(()=>{
            dispatch(recipientsIsUpdating(false));
            dispatch(recipientsFetchDataPassive())
        })
        .catch((err) => {
            console.log(err)
            dispatch(recipientsIsUpdating(false))
            dispatch(recipientsHasErrored(true))
        });
    }
}

// EDIT ADDRESS
export function recipientsPatch(id, data){
    delete data.id;
    data.phone = data.phone.replace(/[^0-9]/gim,'');
    return (dispatch) => {
        dispatch(recipientsIsUpdating(true));
        var url = api.url_recipients + "/" + id;

         axios.patch(url, data)
          .then((response) => {
            if(response.statusText !== "OK"){
                throw Error(response.statusText)
            }
            return response.data;
          })
          .then(()=>{
              dispatch(recipientsIsUpdating(false));
              dispatch(recipientsFetchDataPassive())
          })
          .catch((err) => {
              console.log(err)
              dispatch(recipientsIsUpdating(false))
              dispatch(recipientsHasErrored(true))
          });
    }
}

// DELETE ADDRESS
export function recipientsDelete(id){
    return (dispatch) => {
        dispatch(recipientsIsUpdating(true));
        var url = api.url_recipients + "/" + id;
        axios.delete(url)
        .then((response) => {
          if(response.statusText !== "OK"){
              throw Error(response.statusText)
          }
          return response.data;
        })
        .then(()=>{
            dispatch(recipientsIsUpdating(false));
            dispatch(recipientsFetchDataPassive())
        })
        .catch((err) => {
            console.log(err)
            dispatch(recipientsIsUpdating(false))
            dispatch(recipientsHasErrored(true))
        });
    }
}

// ADD ADDRESS
export function recipientsAdd(data){
    data.phone = data.phone.replace(/[^0-9]/gim,'');
    return (dispatch) => {
        dispatch(recipientsIsAdding(true));

        axios.post(api.url_recipients, data)
        .then((response) => {
            if(response.statusText !== "OK"){
                throw Error(response.statusText)
            }
            dispatch(recipientsAddSuccess(true))
            dispatch(recipientsIsAdding(false))
            dispatch(recipientsAddHasErrored(false))
            return response.data;
        })
        .then(()=>{
            dispatch(recipientsIsAdding(false));
            dispatch(recipientsFetchDataPassive())
        })
        .catch((err) => {
            console.log(err)
            dispatch(recipientsIsAdding(false))
            dispatch(recipientsAddSuccess(false))
            dispatch(recipientsAddHasErrored(true))
        });
    }
}
