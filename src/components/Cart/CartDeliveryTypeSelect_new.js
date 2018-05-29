import React, {Component} from 'react';
import { connect } from 'react-redux';
import { deliveryType } from '../../actions/cart_new';

class CartDeliveryTypeSelect extends Component{
    render(){
        return (this.props.deliveryMethods && this.props.deliveryMethods.filter(m => m.id === 'iml').length ?
            <div className="row r-subsection">
                <div className="col-12 delivery__heading">
                    <span className="r-section__subtitle">Каким образом Вам удобно получить заказ?</span>
                    <div className="deliveryType">
                        <div className={(this.props.deliveryType === "delivery"  ? " active" : " unactive")} onClick={()=>this.props.deliveryTypeSelect("delivery")}>
                            Доставка
                        </div>
                        <div className={(this.props.deliveryType === "selfdelivery"  ? " active" : " unactive")} onClick={()=>this.props.deliveryTypeSelect("selfdelivery")}>
                            Самовывоз
                        </div>
                    </div>
                </div>
            </div>
            :
            null
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.deliveryMethodsIsLoading,
        deliveryMethods: state.deliveryMethods,
        deliveryType: state.deliveryType
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deliveryTypeSelect: (type) => dispatch(deliveryType(type))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDeliveryTypeSelect);
