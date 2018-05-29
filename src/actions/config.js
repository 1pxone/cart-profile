import axios from 'axios';

export function  getConfigRequest(bool) {
    return {
        type: 'CONFIG_REQUEST',
        configRequest: bool
    };
}

export function  getConfigSuccess(config) {
    return {
        type: 'CONFIG_SUCCESS',
        config
    };
}

export function getConfig(){
    return (dispatch) => {
        dispatch(getConfigRequest(true));
        axios.get("/cfg.json")
          .then((response) => {
                dispatch(getConfigSuccess(response.data));
                dispatch(getConfigRequest(false));
        })
        .catch(() => dispatch(getConfigRequest(true)));
    }
}
