//action creators
import axios from 'axios';
import * as actionType from './constants';
import * as api from './_urls';
import { push } from 'react-router-redux';

export function orderIsPlacing(bool) {
    return {
        type: actionType.ORDER_IS_PLACING,
        isPlacing: bool
    };
}

export function orderId(order) {
    return {
        type: actionType.ORDER_ID,
        order
    };
}

export function orderHasErrored(bool) {
    return {
        type: actionType.ORDER_HAS_ERRORED,
        hasErrored: bool
    };
}

export function orderPaymentIsLoading(bool) {
    return {
        type: actionType.ORDER_PAYMENT_IS_LOADING,
        paymentIsLoaing: bool
    };
}

export function orderPaymentSrc(src) {
    return {
        type: actionType.ORDER_PAYMENT_SRC,
        paymentSrc: src
    };
}

// PLACE ORDER
export function submitOrder(payment_type){
    return (dispatch) => {
        dispatch(orderIsPlacing(true));
        axios.post(api.url_order)
        .then((response) => {
            if(response.status === 500){
                throw Error(response.statusText)
            }
            console.log(response.data.id)
            dispatch(orderId(response.data.id+""))
            return response;

        })
        .then((response) => {
            if (typeof response.data !== "undefined"){
                if (response.data.success && response.data.id){
                    dispatch(orderIsPlacing(false))
                    if(payment_type && payment_type === "pay_card"){
                        dispatch(getPaymentSrc(response.data.id))
                    }
                    dispatch(push('/cart/success'))
                } else {
                    dispatch(orderHasErrored(true))
                    dispatch(orderIsPlacing(false))
                }
            } else {
                dispatch(orderHasErrored(true))
                dispatch(orderIsPlacing(false))
            }
        })
        .catch((err) => {
            console.log(err)
            dispatch(orderHasErrored(true))
            dispatch(orderIsPlacing(false))
        });
    }
}

export function getPaymentSrc(orderid){
    return (dispatch) => {
        dispatch(orderPaymentIsLoading(true));
        axios.get(api.url_uniteller + orderid)
        .then((response) => {
            if(response.status === 500){
                throw Error(response.statusText)
            }
            return response.data;
        })
        .then(src => {
            dispatch(orderPaymentSrc(src));
            dispatch(orderPaymentIsLoading(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(orderPaymentIsLoading(false));
        });
    }
}
