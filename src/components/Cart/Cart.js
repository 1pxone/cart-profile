import React, {Component} from 'react';
import { connect } from 'react-redux';
import  CartProduct  from './CartProduct';
import CartSide from './CartSide_new';
import CartEmpty from './CartEmpty';

class Cart extends Component{
    componentDidMount(){
        document.title = "Ваша корзина";
    }
    render(){
        return (
            <div className={this.props.config.containerClass}>
                {this.props.cart.length ?
                    <div className="row">
                        <div className="col-12">
                            <span className="r-section__title">Ваша корзина</span>
                        </div>
                        <div className={"col-12 col-lg-9 " + (this.props.isPatching ? "isPatching" : "")}>
                            {this.props.cart.map((item,i)=>(
                                <CartProduct item={item} key={i} />
                            ))}
                        </div>
                        <CartSide on="cart"/>
                    </div>
                    :
                    <CartEmpty />
                }
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        cart: state.cartItems,
        config: state.getConfigSuccess,
        isPatching: state.cartIsUpdating
    }
};



export default connect(mapStateToProps, null)(Cart);
