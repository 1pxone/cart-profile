import React, {Component} from 'react';
import { connect } from 'react-redux';

class AuthWrap extends Component {
    render() {
        return (
            <div className={this.props.config.containerClass}>
                <div className="row auth_wrapper">
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

export default connect(mapStateToProps, null)(AuthWrap);
