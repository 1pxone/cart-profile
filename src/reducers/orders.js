import * as actionType from '../actions/constants';


export function orderIsPlacing(state = false, action){
    switch (action.type) {
        case actionType.ORDER_IS_PLACING:
            return action.isPlacing;

        default:
            return state;
    }
}

export function orderId(state = '', action){
    switch (action.type) {
        case actionType.ORDER_ID:
            return action.order;

        default:
            return state;
    }
}

export function ordersHasErrored(state = false, action){
    switch (action.type) {
        case actionType.ORDER_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function orderPaymentIsLoading(state = false, action){
    switch (action.type) {
        case actionType.ORDER_PAYMENT_IS_LOADING:
            return action.paymentIsLoaing;

        default:
            return state;
    }
}

export function orderPaymentSrc(state = '', action){
    switch (action.type) {
        case actionType.ORDER_PAYMENT_SRC:
            return action.paymentSrc;

        default:
            return state;
    }
}

// export function ordersIsLoading(state = false, action){
//     switch (action.type) {
//         case 'ORDERS_IS_LOADING':
//             return action.isLoaing;
//
//         default:
//             return state;
//     }
// }
//
//
//
// export function orders(state = [], action){
//     switch (action.type) {
//         case 'ORDERS_GET_SUCCESS':
//             return action.orders;
//
//         default:
//             return state;
//     }
// }
