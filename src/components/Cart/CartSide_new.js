import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PromoCode from './PromoCode';
import CartProductMini from './CartProductMini';
import { priceFormat, declension } from '../../utils';
import OrderButton from './OrderButton';

class CartSide extends Component{
    render(){
        const productcount = this.props.cart.reduce( function(cnt,o){ return cnt + o.count*1; }, 0);
        const subtotal = this.props.cart.reduce((memo, product) => {
            return memo + product.price * product.count;
        }, 0);

        const discount = this.props.cart.filter(product => ('newprice' in product)).reduce((memo, product) => {
            if ('newprice' in product && product.price !== product.newprice) {
                return memo += (product.price - product.newprice) * product.count
            } else {
                return null
            }
        }, 0);

        if (this.props.configRequest) {
            return null;
        };

        switch (this.props.on) {
            case "cart":
                return (
                    <div className="col-12 col-lg-3 cart-side cart-side--cart">
                        <div className="cart-side__wrapper">
                            <div className="cart-side__total-wrapper">
                                <span className="cart-side__product-count">В заказе {productcount} {declension(productcount)}</span>
                                <span className="cart-side__subtotal"><span>Товары:</span> <span className="cart-side__subtotal--amount">{priceFormat(subtotal)} ₽ </span></span>
                                {discount ? <span className="cart-side__discount"><span>Скидка:</span> <span className="cart-side__discount--amount">{"-" + priceFormat(discount)} ₽</span></span> : null}
                                {this.props.summary.delivery ? <span className="cart-side__delivery"><span>Доставка:</span> <span className="cart-side__delivery--amount">{this.props.summary.delivery.cost > 0 ? (this.props.summary.delivery.cost + " ₽") : "Бесплатно"}</span></span> : null}
                                <span className="cart-side__total"><span>Итого к оплате:</span> <span className="cart-side__total--amount">{priceFormat(this.props.summary.order.total)} ₽ </span></span>
                                <div className="process-order__wrapper">
                                    <Link to={this.props.isAuth ? "/cart/purchase" : "/cart/login"} className="process-order">Продоложить оформление</Link>
                                </div>
                            </div>
                        </div>
                        <PromoCode />
                    </div>
                )
            case "purchase":
                return (
                    <div className="col-12 col-lg-3 cart-side cart-side--purchase">
                        <div className="cart-side__wrapper">
                            <div className="cart-side__total-wrapper">
                                <span className="cart-side__product-count">В заказе {productcount} {declension(productcount)}</span>
                            </div>
                            <div className="cart-side__products">
                                {this.props.cart.map(item => (
                                    <CartProductMini key={item.sku} item={item}/>
                                ))}
                            </div>
                            <div className="cart-side__total-wrapper">
                                <span className="cart-side__subtotal"><span>Товары:</span> <span className="cart-side__subtotal--amount">{priceFormat(subtotal)} ₽ </span></span>
                                {discount ? <span className="cart-side__discount"><span>Скидка:</span> <span className="cart-side__discount--amount">{"-" + priceFormat(discount)} ₽</span></span> : null}
                                {this.props.summary.delivery ? <span className="cart-side__delivery"><span>Доставка:</span> <span className="cart-side__delivery--amount">{this.props.summary.delivery.cost > 0 ? (this.props.summary.delivery.cost + " ₽") : "Бесплатно"}</span></span> : null}
                                <span className="cart-side__total"><span>Итого к оплате:</span> <span className="cart-side__total--amount">{priceFormat(this.props.summary.order.total)} ₽ </span></span>
                                <OrderButton />
                            </div>
                        </div>
                        <PromoCode />
                    </div>
                )
            default:
                return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.userIsAuth,
        cart: state.cartItems,
        summary: state.cartSummary
    };
};

export default withRouter(connect(mapStateToProps, null)(CartSide));
