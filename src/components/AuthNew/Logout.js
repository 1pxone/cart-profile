import React, {Component} from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/user';

class Logout extends Component {
    render(){
        return (
            <button onClick={()=>this.props.logout()} className={this.props.btnClass + (this.props.logoutRequest ? " isPatching": "")} >{this.props.text}</button>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        logoutRequest: state.userLogoutRequest,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
