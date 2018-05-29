import React, {Component} from 'react';
import { priceFormat } from '../../utils';

class CartProductMini extends Component{
    extendedPatch(sku, cur){
        if(cur > 1){
            this.props.patchQty(sku, "decrease", cur)
        } else {
            this.props.deleteItem(sku)
        }
    }
    render(){
        var item = this.props.item;
        // var costBlock = function(item){
        //     if(item.newprice){
        //         return (
        //             <React.Fragment><span className="cart-price--discontinued">{priceFormat(item.newprice)}</span> ₽ <br/><small>{priceFormat(item.price)} ₽</small></React.Fragment>
        //         )
        //     } else {
        //         return (
        //             <span className="cart-price--default">{priceFormat(item.price)} ₽ </span>
        //         )
        //     }
        //
        // };

        return (
            <div className="cart-product-mini__wrapper">
                {item.metadata.image ? <div className="cart-product-mini__image" style={{backgroundImage: `url(${item.metadata.image})`}}/> : null}
                <div className="cart-product-mini__title"><span>{item.metadata.title}</span> <span className="cart-product-mini__qtyprice">{item.count}&times; {priceFormat(item.newprice ? item.newprice : item.price)} ₽</span></div>

            </div>
        );
    }
}



export default CartProductMini;
