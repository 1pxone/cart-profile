import React, {Component} from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { patchQty, deleteItem } from '../../actions/cart_new';
import { priceFormat } from '../../utils';

class CartProduct extends Component{
    extendedPatch(sku, cur){
        if(cur > 1){
            this.props.patchQty(sku, "decrease", cur)
        } else {
            this.props.deleteItem(sku)
        }
    }
    render(){
        var item = this.props.item;
        var costBlock = function(item){
            if(item.newprice){
                return (
                    <React.Fragment><span className="cart-price--discontinued">{priceFormat(item.newprice)}</span> ₽ <br/><span className="t-small ">{priceFormat(item.price)} ₽</span></React.Fragment>
                )
            } else {
                return (
                    <span className="cart-price--default">{priceFormat(item.price)} ₽ </span>
                )
            }

        };

        return (
            <div className={"cart-product__wrapper " + (this.props.isPatching ? "cart__patching" : "")}>
                <div className="cart-product__left">
                    <a className="cart-product__link" href={item.metadata.link} target="_blank"><div className="cart-product__image" style={{ backgroundImage: `url(${item.metadata.image})` }}></div></a>
                    <div className="cart-product__details-info">
                        <span className="cart-product__title">{item.metadata.title}</span>
                        <span className="cart-product__sku">Артикул: {item.sku}</span>
                    </div>
                </div>
                <div className="cart-product__rigth">
                    <div className="cart-product__qty-control">
                        <button className="cart-product__controls-qty_m" onClick={()=>this.extendedPatch(item.sku, item.count)}>-</button>
                        <span className="cart-product__qty">{item.count}</span>
                        <button className="cart-product__controls-qty_p" onClick={()=>this.props.patchQty(item.sku, "increase",item.count)}>+</button>
                    </div>
                    <div className="cart-product__details-price">{costBlock(item)}</div>
                    <button className="cart-product__controls-delete" onClick={()=>this.props.deleteItem(item.sku)}>&times;</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        configRequest: state.getConfigRequest,
        config: state.getConfigSuccess,
        isPatching: state.cartIsUpdating
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        patchQty: (sku, operation, current) => dispatch(patchQty(sku, operation, current)),
        deleteItem: (sku) => dispatch(deleteItem(sku))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
