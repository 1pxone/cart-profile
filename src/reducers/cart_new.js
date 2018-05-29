import * as actionType from '../actions/constants';

//  CART REDUCERS
export function cartIsLoading(state = false, action){
    switch (action.type) {
        case actionType.CART_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function cartItems(state = [], action){
    switch (action.type) {
        case actionType.CART_ITEMS:
            return action.items;

        default:
            return state;
    }
}

export function cartSummary(state = {}, action){
    switch (action.type) {
        case actionType.CART_SUMMARY:
            return action.summary;

        default:
            return state;
    }
}

export function cartHasErrored(state = false, action){
    switch (action.type) {
        case actionType.CART_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function cartIsUpdating(state = false, action){
    switch (action.type) {
        case actionType.CART_IS_UPDATING:
            return action.isUpdating;

        default:
            return state;
    }
}

// DELIVERY REDUCERS
export function deliveryMethods(state = [], action){
    switch (action.type) {
        case actionType.DELIVERY_METHODS:
            return action.methods;

        default:
            return state;
    }
}

export function deliveryMethodsIsLoading(state = false, action){
    switch (action.type) {
        case actionType.DELIVERY_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function deliveryMethodsIsUpdating(state = false, action){
    switch (action.type) {
        case actionType.DELIVERY_IS_UPDATING:
            return action.isUpdating;

        default:
            return state;
    }
}

export function deliveryMethodsHasErrored(state = false, action){
    switch (action.type) {
        case actionType.DELIVERY_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function deliveryType(state = "delivery", action){
    switch (action.type) {
        case actionType.DELIVERY_TYPE:
            return action.delivery;

        default:
            return state;
    }
}

// PAYMENT REDUCERS
export function paymentMethods(state = [], action){
    switch (action.type) {
        case actionType.PAYMENT_METHODS:
            return action.methods;

        default:
            return state;
    }
}

export function paymentMethodsIsLoading(state = false, action){
    switch (action.type) {
        case actionType.PAYMENT_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function paymentMethodsIsUpdating(state = false, action){
    switch (action.type) {
        case actionType.PAYMENT_IS_UPDATING:
            return action.isUpdating;

        default:
            return state;
    }
}

export function paymentMethodsHasErrored(state = false, action){
    switch (action.type) {
        case actionType.PAYMENT_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

// PROMO REDUCERS
export function promoIsLoading(state = false, action){
    switch (action.type) {
        case actionType.PROMO_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function promo(state = null, action){
    switch (action.type) {
        case actionType.PROMO:
            return action.code;

        default:
            return state;
    }
}

export function promoHasErrored(state = false, action){
    switch (action.type) {
        case actionType.PROMO_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

// ADD TO CART REDUCERS
export function addingToCart(state = false, action){
    switch (action.type) {
        case actionType.ADDING_TO_CART:
            return action.isAdding;

        default:
            return state;
    }
}

export function addToCartSuccess(state = null, action){
    switch (action.type) {
        case actionType.ADD_TO_CART_SUSSESS:
            return action.addSuccess;

        default:
            return state;
    }
}

export function addToCartHasErrored(state = false, action){
    switch (action.type) {
        case actionType.ADD_TO_CART_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}
