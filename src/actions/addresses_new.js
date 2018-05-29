import axios from 'axios';
import {  fetchDeliveryMethodsPassive, deliveryType, fetchPaymentMethods } from './cart_new';
import * as actionType from './constants';
import * as api from './_urls';

export function addressParams(params) {
    return {
        type: actionType.ADDRESS_PARAMS,
        params
    };
}

export function addressesHasErrored(bool) {
    return {
        type: actionType.ADDRESSES_HAS_ERRORED,
        hasErrored: bool
    };
}

export function addressesIsLoading(bool) {
    return {
        type: actionType.ADDRESSES_IS_LOADING,
        isLoading: bool
    };
}

export function addressesIsUpdating(bool) {
    return {
        type: actionType.ADDRESSES_IS_UPDATING,
        isUpdating: bool
    };
}

export function addresses(addresses) {
    return {
        type: actionType.ADDRESSES,
        addresses
    };
}

export function addressesIsAdding(bool) {
    return {
        type: actionType.ADDRESSES_IS_ADDING,
        isAdding: bool
    };
}

export function addressesAddSuccess(bool) {
    return {
        type: actionType.ADDRESSES_ADD_SUCCESS,
        addSuccess: bool
    };
}

export function addressesAddHasErrored(bool) {
    return {
        type: actionType.ADDRESSES_ADD_HAS_ERRORED,
        addError: bool
    };
}


export function pickUpPoints(points) {
    return {
        type: actionType.PICK_UP_POINTS,
        points
    };
}

export function pickUpPointsIsLoading(bool) {
    return {
        type: actionType.PICK_UP_POINTS_IS_LOADING,
        isLoading: bool
    };
}

export function pickUpPointsHasErrored(bool) {
    return {
        type: actionType.PICK_UP_POINTS_HAS_ERRORED,
        hasErrored: bool
    };
}

// THUNKS

//GET POINTS
export function getPickUpPoints(){
    return (dispatch) => {
        dispatch(pickUpPointsIsLoading(true));
        axios.get('https://list.iml.ru/sd?type=json')
        .then((response) => {
            if(response.statusText !== "OK"){
                throw Error(response.statusText);
            }
            return response.data;
        })
        .then((data) => {
            dispatch(pickUpPoints(data))
            dispatch(pickUpPointsIsLoading(false))
        })
        .catch((err) => {
            console.log(err)
            dispatch(pickUpPointsHasErrored(true))
            dispatch(pickUpPointsIsLoading(false))
        });
    }
}

//GET ADDRESSES
export function addressesFetchData(){
    return (dispatch) => {
        dispatch(addressesIsLoading(true));
        axios.get(api.url_address)
        .then((response) => {
            if(response.statusText !== "OK"){
                throw Error(response.statusText);
            }
            return response.data;
        })
        .then((data) => {
            dispatch(addresses(data))
            var addressesPVZ = data.filter(a => ('externalId' in a)).filter(a => (a['isActive'] === true));
            var addressesActive = data.filter(a => (a['isActive'] === true));
            if(addressesPVZ.length > 0 ){
                dispatch(deliveryType("selfdelivery"))
            }
            if(!addressesActive.length && data.length === 1){
                dispatch(selectAddress(data[0].id))
            }
            dispatch(addressesIsLoading(false))
        })
        .catch((err) => {
            console.log(err)
            dispatch(addressesIsLoading(false))
            dispatch(addressesHasErrored(true))
        });
    }
}


//GET ADDRESSES ON DEMAND
export function addressesFetchDataPassive(){
    return (dispatch) => {
        dispatch(addressesIsUpdating(true));
        axios.get(api.url_address)
        .then((response) => {
            if(response.statusText !== "OK"){
                throw Error(response.statusText);
            }
            return response.data;
        })
        .then((data) => {
            dispatch(addresses(data))
            var addressesPVZ = data.filter(a => ('externalId' in a)).filter(a => (a['isActive'] === true));
            // var addressesActive = data.filter(a => (a['isActive'] === true));
            // var selfAddresses = data.filter(a => !('externalId' in a));

            if(addressesPVZ.length === 1){
                dispatch(deliveryType("selfdelivery"))
            }
            dispatch(fetchPaymentMethods())
            dispatch(fetchDeliveryMethodsPassive())
            dispatch(addressesIsUpdating(false))
        })
        .catch((err) => {
            console.log(err)
            dispatch(addressesIsUpdating(false))
            dispatch(addressesHasErrored(true))
        });
    }
}

//SELECT ADDRESS
export function selectAddress(id){
    return (dispatch) => {
        dispatch(addressesIsUpdating(true));
        var url = api.url_address + "/" + id;
        axios.patch(url, {"isActive":true})
        .then((response) => {
            if(response.statusText !== "OK"){
                throw Error(response.statusText);
            }
            return response.data;
        })
        .then(()=>{
            dispatch(addressesFetchDataPassive())
        })
        .catch((err) => {
            console.log(err)
            dispatch(addressesIsUpdating(false))
            dispatch(addressesHasErrored(true))
        });
    }
}

// EDIT ADDRESS
export function addressPatch(id, data){
    delete data.id;
    return (dispatch) => {
        dispatch(addressesIsUpdating(true));
        var url = api.url_address + "/" + id;
         axios.patch(url, data)
          .then((response) => {
            if(response.statusText !== "OK"){
                throw Error(response.statusText)
            }
            return response.data;
          })
          .then(()=>{
              dispatch(addressesFetchDataPassive())
          })
          .catch((err) => {
              console.log(err)
              dispatch(addressesIsUpdating(false))
              dispatch(addressesHasErrored(true))
          });
    }
}

// DELETE ADDRESS
export function addressDelete(id){
    return (dispatch) => {
        dispatch(addressesIsUpdating(true));
        var url = api.url_address + "/" + id;
        axios.delete(url)
        .then((response) => {
          if(response.statusText !== "OK"){
              throw Error(response.statusText)
          }
          return response.data;
        })
        .then(()=>{
            dispatch(addressesFetchDataPassive())
        })
        .catch((err) => {
            console.log(err)
            dispatch(addressesIsUpdating(false))
            dispatch(addressesHasErrored(true))
        });
    }
}

// ADD ADDRESS
export function addressAdd(data){
    return (dispatch) => {
        dispatch(addressesIsAdding(true));
        axios.post(api.url_address, data)
        .then((response) => {
            if(response.statusText !== "OK"){
                throw Error(response.statusText)
            }
            dispatch(addressesAddSuccess(true))
            dispatch(addressesIsAdding(false))
            dispatch(addressesAddHasErrored(false))
            return response.data;
        })
        .then(()=>{
            dispatch(addressesFetchDataPassive())
        })
        .catch((err) => {
            console.log(err)
            dispatch(addressesIsAdding(false))
            dispatch(addressesAddSuccess(false))
            dispatch(addressesAddHasErrored(true))
        });
    }
}
