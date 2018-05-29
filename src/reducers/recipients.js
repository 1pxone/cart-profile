import * as actionType from '../actions/constants';

export function recipientsHasErrored(state = false, action){
    switch (action.type) {
        case actionType.RECIPIENTS_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function recipientsIsLoading(state = false, action){
    switch (action.type) {
        case actionType.RECIPIENTS_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function recipients(state = [], action){
    switch (action.type) {
        case actionType.RECIPIENTS:
            return action.recipients;

        default:
            return state;
    }
}

export function recipientsIsUpdating(state = false, action){
    switch (action.type) {
        case actionType.RECIPIENTS_IS_UPDATING:
            return action.isUpdating;

        default:
            return state;
    }
}

export function recipientsIsAdding(state = false, action) {
    switch (action.type) {
        case actionType.RECIPIENTS_IS_ADDING:
            return action.isAdding;

        default:
            return state;
    }
}

export function recipientsAddSuccess(state = false, action) {
    switch (action.type) {
        case actionType.RECIPIENTS_ADD_SUCCESS:
            return action.addSuccess;

        default:
            return state;
    }
}

export function recipientsAddHasErrored(state = false, action) {
    switch (action.type) {
        case actionType.RECIPIENTS_ADD_HAS_ERRORED:
            return action.addError;

        default:
            return state;
    }
}
