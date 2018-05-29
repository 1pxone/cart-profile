export function getConfigRequest(state = false, action){
    switch (action.type) {
        case 'CONFIG_REQUEST':
            return action.configRequest;

        default:
            return state;
    }
}

export function getConfigSuccess(state = {}, action){
    switch (action.type) {
        case 'CONFIG_SUCCESS':
            return action.config;

        default:
            return state;
    }
}
