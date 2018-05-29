import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submitOrder } from '../../actions/orders'


class CartSide extends Component{

    constructor(props) {
        super(props);
        this.state = {
            why: []
        }
    };

    why(){
        var summary = this.props.summary;
        var reason = [];

        if(!summary.recipient){
            reason.push("Укажите получателя!");
        }

        if(!summary.address){
            reason.push("Укажите адрес доставки");
        }

        if(!summary.delivery){
            reason.push("Выберите способ доставки!");
        }

        if(!summary.payment){
            reason.push("Выберите способ оплаты!");
        }

        this.setState({why: reason})
    }

    componentWillReceiveProps(){
        this.setState({why:[]})
    }

    render(){
        var summary = this.props.summary;
        var checkSummary = summary && Object.keys(summary).length && summary.delivery && summary.payment && summary.recipient && summary.address;
        if(this.props.isAuth){
            if(checkSummary){
                return (
                    <div className="process-order__wrapper">
                        <button className={"process-order " + (this.props.isPlacing ? "isPatching" : "")} onClick={()=>this.props.submitOrder(summary.payment.id)}>Оформить заказ</button>
                    </div>
                )
            } else{
                return (
                    <div className="process-order__wrapper">
                        {this.state.why.length ?
                            <div className="process-order--blockers">
                                {this.state.why.map((r,i)=>(
                                    <span key={i}>&times; {r}</span>
                                ))}
                            </div>
                            :
                            null
                        }
                        <button className="process-order process-order--disabled" onClick={()=>this.why()}>Оформить заказ</button>
                    </div>
                )
            }
        } else {
            return (
                <div className="process-order__wrapper">
                    {this.state.why.length ?
                        <div className="process-order--blockers">
                            {this.state.why.map((r,i)=>(
                                <span key={i}>&times; {r}</span>
                            ))}
                        </div>
                        :
                        null
                    }
                    <button className="process-order process-order--disabled" onClick={()=>this.why()}>Оформить заказ</button>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isPlacing: state.orderIsPlacing,
        hasErrored: state.ordersHasErrored,
        isAuth: state.userIsAuth,
        cart: state.cartItems,
        summary: state.cartSummary
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitOrder: (payment_type) => dispatch(submitOrder(payment_type))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartSide));
