import React, {Component} from 'react';
import { connect } from 'react-redux';
import CartSide from './CartSide_new';
import PaymentMethodsWrapper from './PaymentMethodsWrapper';
import DeliveryWrapper from './DeliveryWrapper';
import FinalBlock from './FinalBlock';
import { Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';

class CartPurchase extends Component{
    componentDidMount(){
        document.title = "Оформление заказа";
    }
    render(){
        return (this.props.cart.length ?
            <div className={this.props.config.containerClass}>
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <DeliveryWrapper />
                        <PaymentMethodsWrapper />
                        <FinalBlock/>
                    </div>
                    <CartSide on="purchase"/>
                </div>
            </div>
            :
            <Redirect to="/cart" />
        )
    }
};

const mapStateToProps = (state) => {
    return {
        cart: state.cartItems,
        config: state.getConfigSuccess
    }
};

export default withRouter(connect(mapStateToProps, null)(CartPurchase));
