import React, {Component} from 'react';
import { Route, Switch } from 'react-router';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRouteCart from './PrivateRouteCart';
import Preloader from './Preloader';
import NoMatch from './NoMatch';
import OrderSuccess from './Cart/OrderSuccess';
import CartPurchase from './Cart/CartPurchase';
import Cart from './Cart/Cart';
import { fetchCart } from '../actions/cart_new';
import { fetchUserData } from '../actions/user';
import { getConfig } from '../actions/config';
import PublicRouteCart from './PublicRouteCart';
import Register from './AuthNew/Register';
import Login from './AuthNew/Login';
import Restore from './AuthNew/RestorePass';

class CartWrapper extends Component{
    componentDidMount(){
        this.props.fetchCart()
        this.props.fetchUserData()
        this.props.getConfig()
    }

    render(){
        if (this.props.hasErrored) {
            return (<p>Error!</p>);
        }

        if (this.props.cartIsLoading || this.props.configRequest || this.props.userIsLoading) {
            return <Preloader cls="main"/>;
        }

        return (
            <Switch>
                <Route exact path={this.props.config.cartRootPath } component={Cart}/>
                <PublicRouteCart exact path={this.props.config.cartRootPath + "/login"} component={Login}/>
                <PublicRouteCart exact path={this.props.config.cartRootPath + "/restore"} component={Restore}/>
                <PublicRouteCart exact path={this.props.config.cartRootPath + "/register"} component={Register}/>
                <PrivateRouteCart exact path={this.props.config.cartRootPath + "/purchase"} component={CartPurchase}/>
                <Route exact path={this.props.config.cartRootPath + "/success"} component={OrderSuccess}/>
                <Route component={NoMatch}/>
            </Switch>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        cartIsLoading: state.cartIsLoading,
        userIsLoading: state.userIsLoading,
        hasErrored: state.userHasErrored,
        isAuth: state.userIsAuth,
        configRequest: state.getConfigRequest,
        config: state.getConfigSuccess,
        cart: state.cart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCart: () => dispatch(fetchCart()),
        fetchUserData: () => dispatch(fetchUserData()),
        getConfig: () => dispatch(getConfig())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartWrapper));
