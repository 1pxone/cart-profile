import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => rest.isAuth ?
            <Component {...props} />
            : 
            <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />
            }
        />
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.userIsAuth
    }
};

export default connect(mapStateToProps)(PrivateRoute);
