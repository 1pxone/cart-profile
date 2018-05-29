import React, {Component} from 'react';
import {orderHeading} from '../../utils';
import { connect } from 'react-redux';
import { getPaymentSrc } from '../../actions/orders';
// import PaymentIframe from './PaymentIframe';
import CartProductMaxi from '../Cart/CartProductMaxi';
import Modal from '../Modal';
import Preloader from '../Preloader';
import { priceFormat, declension } from '../../utils';

class SingleOrderDash extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen:false
        };
        this.modalShow = this.modalShow.bind(this);
    }

    modalShow(){
        this.setState({isOpen: true});
    }

    modalHide(){
        this.setState({isOpen: false});
    }

    pay(id){
        this.props.iframe(id)
        this.modalShow();
    }

    render(){
        const productcount = this.props.order.items.reduce( function(cnt,o){ return cnt + o.count*1; }, 0);

        const discount = this.props.order.items.filter(product => ('newprice' in product))
        .reduce((memo, product) => {
            if ('newprice' in product && product.price !== product.newprice) {
                return memo += (product.price - product.newprice) * product.count
            } else {
                return null
            }
        }, 0);

        const total = this.props.order.items.reduce((memo, product) => {
            if ('newprice' in product && product.price !== product.newprice) {
                memo += product.newprice * product.count
            } else {
                memo += product.price * product.count
            }
            return memo
        }, 0);
        var payNowBtn = <button className="order__pay" onClick={()=>this.pay(this.props.order.id)}>Оплатить</button>;
        var nullBtn = null;
        function OrderBTN(code){
            switch (code * 1) {
                case 10: return nullBtn; // new
                case 20: return payNowBtn; // confirmed
                case 100: return nullBtn; // canceled
                case 200: return payNowBtn; // waiting for payment
                case 300: return nullBtn; // payment in progress
                case 400: return nullBtn; // payment authorized
                case 500: return nullBtn; // paid
                default: break;
            }
        };

        return (
            <div className="rcard-wrapper">
                <div className="rcard-inner">
                    <div className="order__head_">
                        <div className="order__head--info">
                            <span>{this.props.order.id}</span>
                            <span>{this.props.order.created}</span>
                            <span><span className={"order-status__indicator " + (orderHeading(this.props.order.status.code))}></span> {this.props.order.status.description}</span>
                        </div>
                        <div className="order__head--summary">
                            <span className="order__head--count">{productcount} {declension(productcount)}</span>
                            <span className="order__head--total">{priceFormat(total + this.props.order.summary.delivery.cost)} ₽</span>

                        </div>

                    </div>
                </div>
                <div className="order__products">
                    {this.props.order.items.map(item => (
                        <CartProductMaxi key={item.sku} item={item} link={true}/>
                    ))}
                </div>
                <div className="rcard-inner">
                    <div className="order__bottom">
                        {discount ?
                            <div>
                                <span>Скидка <span className="order__promoCode">{this.props.order.promo ? this.props.order.promo.code : null}</span></span> <span className="order__discount--amount">-{priceFormat(discount)} ₽</span>
                            </div>
                            :
                            null
                        }
                        <div>
                            <span>{this.props.order.summary.delivery.title}</span> <span className="order__delivery--cost">{this.props.order.summary.delivery.cost > 0 ? (this.props.order.summary.delivery.cost + " ₽") : "Бесплатно"}</span>
                        </div>
                        <div>
                            <span>{this.props.order.summary.payment.title}</span> {/*<span className="rcard__more">Изменить</span>*/}
                        </div>
                        {this.props.order.summary.payment.id === "pay_card" ?
                            OrderBTN(this.props.order.status.code) : null
                        }
                    </div>
                </div>
                <Modal isOpen={this.state.isOpen} onClose={()=>this.modalHide()} heading={"Оплата заказа №" + this.props.order.id} isBig={true}>
                    {this.props.isLoading ?
                        <Preloader cls="payment"/> :
                        <iframe width="100%" height="100%" src={this.props.src} frameBorder="0" allowFullScreen title={this.props.orderid + "pay"}></iframe>
                    }
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        config: state.getConfigSuccess,
        isLoading: state.orderPaymentIsLoading,
        src: state.orderPaymentSrc
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        iframe: (orderid) => dispatch(getPaymentSrc(orderid))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrderDash);
