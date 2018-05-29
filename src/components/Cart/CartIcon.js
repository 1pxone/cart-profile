import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getConfig } from '../../actions/config';
import { fetchCart } from '../../actions/cart_new';
import Preloader from '../Preloader';
import Dropdown from './Dropdown';
import { priceFormat, declension } from '../../utils';
import CartProductMini from './CartProductMini';

class CartIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    };

    componentDidMount(){
        this.props.getConfig();
        this.props.fetchCart();
    }

    toggleDropdown(){
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    render(){

        const subtotal = this.props.cart.reduce( function(cnt,o){ return cnt + o.price * o.count; }, 0);
        const productcount = this.props.cart.reduce( function(cnt,o){ return cnt + o.count*1; }, 0);


        if (this.props.configRequest && Object.keys(this.props.config).length === 0) {
            return null;
        }

        if (this.props.isLoading) {
            return <div className="dropdown  profile-icon"><Preloader cls="usericon" /></div>;
        }

        return (
            <Dropdown isOpen={this.state.isOpen} onClose={()=>this.toggleDropdown()} align="right">
                <React.Fragment>
                    <div className={this.props.config.carticon ? this.props.config.carticon.classname : ''}></div>
                    {this.props.cart.length ? (<span className="rbadge">{productcount}</span>) : null }
                </React.Fragment>
                <React.Fragment>
                    {this.props.cart.length ? (
                        <React.Fragment>
                            <div className="rdropdown__heading">
                                <span>{productcount}</span> <small>{declension(productcount)} на сумму</small> <span>{priceFormat(subtotal)} ₽</span>
                            </div>
                            <div className="cart-side__products">
                                {this.props.cart.map(item => (
                                    <CartProductMini key={item.sku} item={item}/>
                                ))}
                            </div>
                        </React.Fragment>
                    ) : (
                        <div className="rdropdown__heading">
                            <span>В корзине нет товаров</span>
                        </div>
                    )}
                    {this.props.cart.length ? (
                        <div className="rdropdown__bottom">
                            <a className="process-order" href="/cart">Перейти в корзину</a>
                        </div>) : null
                    }
                </React.Fragment>
            </Dropdown>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartItems,
        isLoading: state.cartIsLoading,
        configRequest: state.getConfigRequest,
        config: state.getConfigSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCart: () => dispatch(fetchCart()),
        getConfig: () => dispatch(getConfig())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
