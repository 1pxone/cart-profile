import React, {Component} from 'react';
import Addresses from './Addresses/';
import Dashboard from './Dashboard/';
// import Auth from './AuthNew/';
import Profile from './Profile/';
// import ProfileEdit from './Profile/ProfileEdit';
// import ProfileChangePass from './Profile/ProfileChangePass';
import Subscribe from './Subscribe/';
import Wishlist from './Wishlist/';
import SavedCarts from './SavedCarts/';
import Orders from './Orders/';
import NoMatch from './NoMatch';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions/user';
import { getConfig } from '../actions/config';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Preloader from './Preloader';

import Register from './AuthNew/Register';
import Login from './AuthNew/Login';
import Restore from './AuthNew/RestorePass';


const componentRegistry = {
    "Dashboard" : Dashboard,
    "Orders": Orders,
    "Addresses": Addresses,
    "Profile" : Profile,
    // "ProfileEdit": ProfileEdit,
    // "ProfileChangePass": ProfileChangePass,
    // "Auth": Auth,
    "Subscribe": Subscribe,
    "Wishlist": Wishlist,
    "SavedCarts": SavedCarts
};

class ProfileWrapper extends Component{
    componentDidMount(){
        this.props.fetchUserData()
        this.props.getConfig()
    }

    render(){
        if (this.props.hasErrored) {
            return (<p>Error!</p>);
        }
        if (this.props.isLoading || this.props.configRequest) {
            return <Preloader cls="main"/>;
        }
        return (
            <Switch>
                {this.props.config.modules.map((module, index)=>(
                    <PrivateRoute exact key={index} path={this.props.config.rootPath + module.path} component={componentRegistry[module.component]}/>
                ))}
                <PublicRoute exact path={this.props.config.rootPath +"/login"} component={Login}/>
                <PublicRoute exact path={this.props.config.rootPath +"/restore"} component={Restore}/>
                <PublicRoute exact path={this.props.config.rootPath +"/register"} component={Register}/>
                <Route component={NoMatch}/>
            </Switch>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        isLoading: state.userIsLoading,
        hasErrored: state.userHasErrored,
        isAuth: state.userIsAuth,
        configRequest: state.getConfigRequest,
        config: state.getConfigSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserData: () => dispatch(fetchUserData()),
        getConfig: () => dispatch(getConfig())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper));
