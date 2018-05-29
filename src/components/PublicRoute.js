import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest}  render={props => rest.isAuth ?
            <Redirect to="/account"/>
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

export default connect(mapStateToProps)(PublicRoute);
