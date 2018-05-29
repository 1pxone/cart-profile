import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getConfig } from '../actions/config';
import {withRouter} from 'react-router-dom';
import { phoneFormat } from '../utils/';
import Logout from './AuthNew/Logout';

class Nav extends Component{
    render(){
        if (this.props.configRequest) {
            return null;
        }
        var u = this.props.user;
        return (
            <div className={this.props.config.navClass}>
                <div className="profile__info">
                    <span className="profile__info--name">{u.firstname} {u.surname}</span>
                    <span className="profile__info--phone">{phoneFormat(u.phone)}</span>
                    <span className="profile__info--email">{u.email}</span>
                </div>
                <div className="profile__nav">
                    {this.props.config.modules.map((module, index)=>(
                        <NavLink exact key={index} to={this.props.config.rootPath + module.path} className="profile__navLink" activeClassName="profile__navLink--active">{module.title}</NavLink>
                    ))}
                </div>
                <div className="profile__nav--bottom">
                    <Logout text="Выйти" btnClass="profile__nav--logout"/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        configRequest: state.getConfigRequest,
        user: state.user,
        config: state.getConfigSuccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getConfig: () => dispatch(getConfig())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
