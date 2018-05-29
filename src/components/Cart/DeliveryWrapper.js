import React, {Component} from 'react';
import { connect } from 'react-redux';
import Preloader from '../Preloader';
import { addressesFetchData } from '../../actions/addresses_new';
import { recipientsFetchData } from '../../actions/recipients';
import { fetchDeliveryMethods } from '../../actions/cart_new';
import MapPVZ from './MapPVZ';
import CartRecipients from './CartRecipients';
import CartDeliveryTypeSelect from './CartDeliveryTypeSelect_new';
import AddressesBlock from './AddressesWrapper';
import DeliveryMethodsWrapper from './DeliveryMethodsWrapper';
import { CSSTransition } from 'react-transition-group';

class DeliveryWrapper extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selfDelivery: false
        };
    };

    toggleSelfDelivery(){
        this.setState(prevState => ({
            selfDelivery: !prevState.selfDelivery
        }));
    };

    componentDidMount(){
        if(this.props.isAuth){
            this.props.recipientsFetchData()
            this.props.addressesFetchData()
        }
        this.props.fetchDeliveryMethods()
    };

    render(){
        var {userIsLoading, recipientsIsLoading, deliveryIsLoading, addressesesIsLoading } = this.props;
        if (userIsLoading || recipientsIsLoading || deliveryIsLoading || addressesesIsLoading) {
            return (
                <div className="r-section">
                    <div className="row">
                        <div className="col-12">
                            <span className="r-section__title r-section__title--disabled">1. Доставка</span>
                            <Preloader cls="main"/>
                        </div>
                    </div>
                </div>
            )
        };

        return (
            <div className="r-section">
                <div className="row">
                    <div className="col-12">
                        <span className="r-section__title">1. Доставка</span>
                    </div>
                </div>
                <CartRecipients />
                <CartDeliveryTypeSelect />
                <CSSTransition in={this.props.deliveryType === "selfdelivery"} timeout={300} classNames="slideLeft" unmountOnExit>
                    <MapPVZ />
                </CSSTransition>
                <CSSTransition in={this.props.deliveryType === "delivery"} timeout={300} classNames="slideRight" unmountOnExit>
                    <div className="row">
                        <AddressesBlock />
                        <DeliveryMethodsWrapper />
                    </div>
                </CSSTransition>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        userIsLoading: state.userIsLoading,
        recipientsIsLoading: state.recipientsIsLoading,
        deliveryIsLoading: state.deliveryMethodsIsLoading,
        addressesesIsLoading: state.addressesIsLoading,
        isAuth: state.userIsAuth,
        deliveryMethods: state.deliveryMethods,
        deliveryType: state.deliveryType,
        addresses: state.addresses,
        cart: state.cartItems
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDeliveryMethods: () => dispatch(fetchDeliveryMethods()),
        recipientsFetchData: () => dispatch(recipientsFetchData()),
        addressesFetchData: () => dispatch(addressesFetchData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryWrapper);
