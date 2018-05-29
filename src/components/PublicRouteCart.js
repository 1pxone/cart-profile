import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRouteCart = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => rest.isAuth ?
            <Redirect to="/cart/purchase" />
            :
            <Component {...props} />
            }
        />
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.userIsAuth
    }
};

export default connect(mapStateToProps)(PublicRouteCart);
