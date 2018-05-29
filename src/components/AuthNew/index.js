import React, {Component} from 'react';
import { connect } from 'react-redux';
import Register from './Register';
import Login from './Login';
import NoAuth from './NoAuth';
import {withRouter} from 'react-router-dom';
import { push } from 'react-router-redux';

class Auth extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         registration: false,
    //         isOrganization: false,
    //     };
    // }

    // authToggle = () => {
    //     this.setState((prevState)=>({
    //         registration: !prevState.registration
    //     }))
    //     if(this.state.registration){
    //         this.props.goTo("/account/login")
    //     } else {
    //         this.props.goTo("/account/register")
    //     }
    // }

    render() {
        return (
            <div className={this.props.config.containerClass}>
                <div className="row auth_wrapper">
                    {/*{this.state.registration || this.props.location.pathname === "/account/register" ?
                        <div className="col-12 col-lg-6">
                            <Register authToggle={this.authToggle}/>
                        </div>
                        :
                        <div className="col-12 col-md-6 col-lg-3">
                            <Login authToggle={this.authToggle}/>
                        </div>
                    }
                    {this.props.cart.length && this.props.location.pathname === "/cart/auth" ?
                        <div className="col-12 col-md-6 col-lg-4">
                            <span className="r-section__title">Продолжить без регистрации</span>
                            <NoAuth />
                        </div>
                        :
                        null
                    }*/}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartItems,
        config: state.getConfigSuccess
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         goTo: (path) => dispatch(push(path))
//     }
// };

export default withRouter(connect(mapStateToProps, null)(Auth));
