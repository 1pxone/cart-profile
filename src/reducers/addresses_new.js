import * as actionType from '../actions/constants';

export function addressParams(state = '', action){
    switch (action.type) {
        case actionType.ADDRESS_PARAMS:
            return action.params;

        default:
            return state;
    }
}

export function addressesHasErrored(state = false, action){
    switch (action.type) {
        case actionType.ADDRESSES_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function addressesIsLoading(state = false, action){
    switch (action.type) {
        case actionType.ADDRESSES_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function addresses(state = [], action){
    switch (action.type) {
        case actionType.ADDRESSES:
            return action.addresses;

        default:
            return state;
    }
}

export function addressesIsUpdating(state = false, action){
    switch (action.type) {
        case actionType.ADDRESSES_IS_UPDATING:
            return action.isUpdating;

        default:
            return state;
    }
}

export function addressesIsAdding(state = false, action) {
    switch (action.type) {
        case actionType.ADDRESSES_IS_ADDING:
            return action.isAdding;

        default:
            return state;
    }
}

export function addressesAddSuccess(state = false, action) {
    switch (action.type) {
        case actionType.ADDRESSES_ADD_SUCCESS:
            return action.addSuccess;

        default:
            return state;
    }
}

export function addressesAddHasErrored(state = false, action) {
    switch (action.type) {
        case actionType.ADDRESSES_ADD_HAS_ERRORED:
            return action.addError;

        default:
            return state;
    }
}

export function pickUpPointsHasErrored(state = false, action){
    switch (action.type) {
        case actionType.PICK_UP_POINTS_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function pickUpPointsIsLoading(state = false, action){
    switch (action.type) {
        case actionType.PICK_UP_POINTS_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function pickUpPoints(state = [], action){
    switch (action.type) {
        case actionType.PICK_UP_POINTS:
            return action.points;

        default:
            return state;
    }
}
